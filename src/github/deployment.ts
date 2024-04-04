import { context as githubContext } from "@actions/github";
import * as input from "../input";
import type { Octokit } from "../types";
import { commitRef, deploymentEnvironmentName } from "./constants";

interface CreateDeploymentPayload {
	deploymentUrl?: string;
	state:
		| "success"
		| "error"
		| "failure"
		| "inactive"
		| "in_progress"
		| "queued"
		| "pending";
}

export class GitHubDeployment {
	public constructor(
		public readonly octokit: Octokit,
		public readonly id: number,
	) {}

	public async update(payload: CreateDeploymentPayload) {
		await this.octokit.rest.repos.createDeploymentStatus({
			...githubContext.repo,
			deployment_id: this.id,
			state: payload.state,
			environment_url: payload.deploymentUrl,
			auto_inactive: input.isProduction,
		});
	}

	public static async create(octokit: Octokit) {
		const deployment = await octokit.rest.repos.createDeployment({
			...githubContext.repo,
			ref: commitRef,
			auto_merge: false,
			environment: deploymentEnvironmentName,
			required_contexts: [],
		});

		return new GitHubDeployment(
			octokit,
			(deployment.data as { id: number }).id,
		);
	}
}
