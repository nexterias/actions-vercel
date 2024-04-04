import * as core from "@actions/core";
import * as github from "@actions/github";
import {
	type VercelDeploymentIssueComment,
	upsertIssueComment,
} from "./github/comment";
import { GitHubCommitStatus } from "./github/commit-status";
import { deploymentEnvironmentName } from "./github/constants";
import { GitHubDeployment } from "./github/deployment";
import * as input from "./input";
import * as vercel from "./vercel";

async function run() {
	const octokit = input.githubToken
		? github.getOctokit(input.githubToken)
		: void 0;
	const projectName = await vercel.fetchProjectName();

	let resultComment: VercelDeploymentIssueComment | undefined;
	let commitStatus: GitHubCommitStatus | undefined;
	let deployment: GitHubDeployment | undefined;

	if (octokit) {
		const [settledResultComment, settledCommitStatus, settledDeployment] =
			await Promise.allSettled([
				upsertIssueComment(octokit, {
					status: "Pending",
					projectName,
				}),
				GitHubCommitStatus.create(octokit, `Vercel - ${projectName}`),
				GitHubDeployment.create(octokit),
			]);

		if (settledResultComment.status === "fulfilled")
			resultComment = settledResultComment.value;
		else {
			core.error(
				'May need "GITHUB_TOKEN" with "write" permission to "pull_requests"',
			);
			core.error(settledResultComment.reason);
		}

		if (settledCommitStatus.status === "fulfilled") {
			commitStatus = settledCommitStatus.value;
			await commitStatus.update({ state: "pending", description: "Pending" });
		} else {
			core.warning(
				'May need "GITHUB_TOKEN" with "write" permission to "statuses"',
			);
			core.error(settledCommitStatus.reason);
		}

		if (settledDeployment.status === "fulfilled") {
			deployment = settledDeployment.value;
			await deployment.update({ state: "pending" });
		} else {
			core.warning(
				'May need "GITHUB_TOKEN" with "write" permission to "deployments"',
			);
			core.error(settledDeployment.reason);
		}
	}

	try {
		await commitStatus?.update({
			state: "pending",
			description: "Installing Vercel CLI...",
		});
		await vercel.install();

		await commitStatus?.update({
			state: "pending",
			description: "Pulling Vercel project settings...",
		});
		await vercel.pull();

		if (input.isPrebuilt) {
			await commitStatus?.update({
				state: "pending",
				description: "Building...",
			});
			await vercel.build();
		}

		await commitStatus?.update({
			state: "pending",
			description: "Deploying...",
		});
		const deploymentUrl = await vercel.deploy(octokit);
		const { readyState } = await vercel.fetchDeployment(deploymentUrl);

		if (input.domainAlias.length) {
			await commitStatus?.update({
				state: "pending",
				description: "Setting domain alias...",
			});
			await vercel.setAlias(deploymentUrl);
		}

		core.setOutput("deployment-url", deploymentUrl);
		core.setOutput("deployment-status", readyState);

		await resultComment?.update({ deploymentUrl, status: "Ready" });
		await commitStatus?.update({
			deploymentUrl,
			state: readyState === "READY" ? "success" : "failure",
			description:
				readyState === "READY"
					? `Ready for ${deploymentEnvironmentName}`
					: "Failed",
		});
		await deployment?.update({
			deploymentUrl,
			state: readyState === "READY" ? "success" : "error",
		});
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	} catch (error: any) {
		core.setFailed(error);
		await resultComment?.update({ status: "Failed" });
		await commitStatus?.update({ state: "error", description: "Failed" });
		await deployment?.update({ state: "error" });
	}
}

run().catch((error) => core.setFailed(error));
