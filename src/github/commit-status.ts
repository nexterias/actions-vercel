import { context as githubContext } from "@actions/github";
import type { Octokit } from "../types";
import { commitRef, deploymentEnvironmentName } from "./constants";

interface CreateCommitStatusPayload {
	deploymentUrl?: string | null;
	isReady: boolean;
}

export class GitHubCommitStatus {
	public constructor(
		public readonly octokit: Octokit,
		public readonly context: string,
	) {}

	public async update(payload: CreateCommitStatusPayload) {
		await this.octokit.rest.repos.createCommitStatus({
			...githubContext.repo,
			sha: commitRef,
			target_url: payload.deploymentUrl,
			state: payload.isReady ? "success" : "error",
			context: this.context,
			description: deploymentEnvironmentName,
		});
	}

	public static async create(octokit: Octokit, context: string) {
		return new GitHubCommitStatus(octokit, context);
	}
}
