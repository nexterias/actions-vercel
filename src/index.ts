import * as core from "@actions/core";
import * as github from "@actions/github";
import * as input from "./input";
import * as vercel from "./vercel";

async function run() {
	try {
		const octokit = input.githubToken
			? github.getOctokit(input.githubToken)
			: void 0;

		await vercel.install();
		await vercel.pull();
		if (input.isPrebuilt) {
			await vercel.build();
		}
		const deploymentUrl = await vercel.deploy(octokit);
		const { readyState } = await vercel.getDeployment(deploymentUrl);
		if (input.domainAlias.length) {
			await vercel.setAlias(deploymentUrl);
		}

		core.setOutput("deployment-url", deploymentUrl);
		core.setOutput("deployment-status", readyState);

		if (!octokit) {
			return;
		}

		const ref =
			github.context.payload.pull_request?.head.sha ?? github.context.sha;
		const environment =
			input.githubDeploymentEnvironment ?? input.isProduction
				? "Production"
				: "Preview";

		// create Deployment
		try {
			const deployment = await octokit.rest.repos.createDeployment({
				...github.context.repo,
				ref,
				auto_merge: false,
				environment,
				required_contexts: [],
			});

			await octokit.rest.repos.createDeploymentStatus({
				...github.context.repo,
				deployment_id: (deployment.data as { id: number }).id,
				state: readyState === "READY" ? "success" : "error",
				environment_url: deploymentUrl,
				auto_inactive: input.isProduction,
			});
			// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		} catch (error: any) {
			core.warning(
				'May need "GITHUB_TOKEN" with "write" permission to "deployments"',
			);
			core.error(error);
		}

		// create Commit Status
		try {
			await octokit.rest.repos.createCommitStatus({
				...github.context.repo,
				sha: ref,
				target_url: deploymentUrl,
				state: readyState === "READY" ? "success" : "error",
				context: "Vercel",
				description: environment,
			});
			// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		} catch (error: any) {
			core.warning(
				'May need "GITHUB_TOKEN" with "write" permission to "statuses"',
			);
			core.error(error);
		}
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	} catch (error: any) {
		core.setFailed(error);
	}
}

run().catch((error) => core.setFailed(error));
