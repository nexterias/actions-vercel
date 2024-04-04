import * as core from "@actions/core";
import * as github from "@actions/github";
import {
	type VercelDeploymentIssueComment,
	upsertIssueComment,
} from "./comment";
import { GitHubCommitStatus } from "./github/commit-status";
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

		if (settledCommitStatus.status === "fulfilled")
			commitStatus = settledCommitStatus.value;
		else {
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
		await vercel.install();
		await vercel.pull();
		if (input.isPrebuilt) {
			await vercel.build();
		}
		const deploymentUrl = await vercel.deploy(octokit);
		const { readyState } = await vercel.fetchDeployment(deploymentUrl);
		if (input.domainAlias.length) {
			await vercel.setAlias(deploymentUrl);
		}

		core.setOutput("deployment-url", deploymentUrl);
		core.setOutput("deployment-status", readyState);

		await resultComment?.update({ deploymentUrl, status: "Ready" });
		await commitStatus?.update({
			deploymentUrl,
			isReady: readyState === "READY",
		});
		await deployment?.update({
			deploymentUrl,
			state: readyState === "READY" ? "success" : "error",
		});
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	} catch (error: any) {
		core.setFailed(error);
		await resultComment?.update({ status: "Failed" });
		await commitStatus?.update({ isReady: false });
		await deployment?.update({ state: "error" });
	}
}

run().catch((error) => core.setFailed(error));
