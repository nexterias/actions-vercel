import * as core from "@actions/core";
import { exec, getExecOutput } from "@actions/exec";
import * as github from "@actions/github";
import { fetch } from "undici";
import * as input from "./input";
import type { GetDeploymentByIdOrUrlResponse, Octokit } from "./types";

/**
 * Install Vercel CLI
 */
export const install = () =>
	core.group("Install Vercel CLI", async () => {
		const code = await exec("which", ["vercel"], { ignoreReturnCode: true });

		if (code === 0) {
			core.info("Skip this step since the Vercel CLI is already installed.");
		} else {
			await exec("npm", ["install", "-g", "vercel"]);
		}
	});

const globalOptions = [
	`--token=${input.token}`,
	`--cwd=${input.cwd}`,
	"--yes",
	"--no-color",
];

/**
 * Execute `vercel ...args ...globalOptions` command
 */
const execute = async (args: string[], ignoreError = false) => {
	const { exitCode, stderr, stdout } = await getExecOutput(
		"vercel",
		[...args, ...globalOptions],
		{
			env: {
				VERCEL_ORG_ID: input.orgId,
				VERCEL_PROJECT_ID: input.projectId,
				...process.env,
			},
			ignoreReturnCode: ignoreError,
		},
	);

	if (exitCode !== 0 && !ignoreError) {
		if (stderr) {
			throw stderr;
		}
		throw `Failed to execute \`vercel\` command. Exit code: ${exitCode}`;
	}

	return stdout;
};

export const pull = () =>
	core.group("Run `vercel link`", async () => {
		await execute([
			"pull",
			`--environment=${input.isProduction ? "production" : "preview"}`,
		]);
	});

export const build = async () =>
	core.group("Run `vercel build`", async () => {
		const command: string[] = ["build"];
		if (input.isProduction) {
			command.push("--prod");
		}

		await execute(command);
	});

export const deploy = (octokit?: Octokit) =>
	core.group("Run `vercel deploy`", async () => {
		const command: string[] = ["deploy"];

		if (input.isProduction) {
			command.push("--prod");
		}
		if (input.isPrebuilt) {
			command.push("--prebuilt");
		}
		if (input.isPublic) {
			command.push("--public");
		}

		for (const value of input.buildEnvironments) {
			command.push("--build-env", value);
		}

		for (const value of input.environments) {
			command.push("--env", value);
		}

		const commitMessage = await octokit?.rest.repos
			.getCommit({
				...github.context.repo,
				ref:
					github.context.payload.pull_request?.head.sha ?? github.context.sha,
			})
			.then((it) => it.data.commit.message);

		const metadata = [
			["gitDirty", "0"],
			["githubDeployment", "1"],
			["githubCommitSha", github.context.sha],
			["githubCommitAuthorName", github.context.actor],
			["githubCommitAuthorLogin", github.context.actor],
			[
				"githubCommitOrg",
				github.context.payload.pull_request?.head.repo.owner.login ??
					github.context.repo.owner,
			],
			[
				"githubCommitRepo",
				github.context.payload.pull_request?.head.repo.name ??
					github.context.repo.repo,
			],
			// メッセージの1行目をgithubCommitMessageに設定
			["githubCommitMessage", commitMessage?.trim().split("\n")[0]],
			[
				"githubCommitRef",
				github.context.payload.pull_request?.head?.ref ??
					github.context.ref.replace("refs/heads/", ""),
			],
			["githubOrg", github.context.repo.owner],
			["githubRepo", github.context.repo.repo],
			["githubPrId", github.context.payload.pull_request?.number.toString()],
		];

		for (const [key, value] of metadata) {
			if (!value) {
				continue;
			}

			command.push("--meta", `${key}=${value}`);
		}

		const deploymentUrl = await execute(command, true);

		return deploymentUrl;
	});

export const setAlias = (deploymentUrl: string) =>
	core.group("Assigning Domains", async () => {
		for (const domain of input.domainAlias) {
			const command: string[] = ["alias", "set", deploymentUrl, domain];

			await execute(command);
		}
	});

export const getDeployment = async (
	url: string,
): Promise<GetDeploymentByIdOrUrlResponse> => {
	const response = await fetch(
		`https://api.vercel.com/v13/deployments/${encodeURIComponent(
			url.replace(/^https:\/\//, ""),
		)}?withGitRepoInfo=true`,
		{
			headers: {
				Authorization: `Bearer ${input.token}`,
			},
			method: "get",
		},
	);

	return response.json() as Promise<GetDeploymentByIdOrUrlResponse>;
};
