import { context as githubContext } from "@actions/github";
import type { Octokit } from "../types";
import { commitRef, deploymentEnvironmentName } from "./constants";

interface CreateCommitStatusPayload {
	deploymentUrl?: string | null;
	state: "pending" | "error" | "success" | "failure";
	description: string;
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
			state: payload.state,
			context: this.context,
			description: payload.description,
		});
	}

	public static async create(octokit: Octokit, context: string) {
		return new GitHubCommitStatus(octokit, context);
	}
}
