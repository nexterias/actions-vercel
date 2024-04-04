import { createHash } from "node:crypto";
import { context as githubContext } from "@actions/github";
import { projectId } from "../input";
import type { Octokit } from "../types";

const commentIdentifier = createHash("sha256").update(projectId).digest("hex");
const commentHeader = `<!-- actions-vercel by The NEXTERIAS - ${commentIdentifier} -->`;

export type VercelDeploymentResult =
	| {
			deploymentUrl: string;
			status: "Ready";
	  }
	| { status: "Failed" | "Pending" };

const createCommentBody = (
	payload: VercelDeploymentResult & { projectName: string },
) => `
| Name | Status | Preview | Updated (UTC) |
|---|---|---|---|
| ${payload.projectName} | ${payload.status} | ${
	payload.status === "Ready"
		? `[Visit Preview](${payload.deploymentUrl})`
		: "Not available"
} | ${new Date().toUTCString()} |
`;

export class VercelDeploymentIssueComment {
	public constructor(
		public readonly octokit: Octokit,
		public readonly id: number,
		public readonly projectName: string,
	) {}

	public async update(payload: VercelDeploymentResult): Promise<void> {
		await this.octokit.rest.issues.updateComment({
			...githubContext.repo,
			comment_id: this.id,
			body: [
				commentHeader,
				createCommentBody({ ...payload, projectName: this.projectName }),
			].join("\n"),
		});
	}
}

export const upsertIssueComment = async (
	octokit: Octokit,
	payload: VercelDeploymentResult & { projectName: string },
) => {
	const requests = octokit.paginate.iterator(octokit.rest.issues.listComments, {
		issue_number: githubContext.issue.number,
		...githubContext.repo,
	});

	for await (const response of requests) {
		for (const comment of response.data) {
			if (comment.body?.includes(commentHeader))
				return new VercelDeploymentIssueComment(
					octokit,
					comment.id,
					payload.projectName,
				);
		}
	}

	const comment = await octokit.rest.issues.createComment({
		...githubContext.repo,
		issue_number: githubContext.issue.number,
		body: [commentHeader, createCommentBody(payload)].join("\n"),
	});

	return new VercelDeploymentIssueComment(
		octokit,
		comment.data.id,
		payload.projectName,
	);
};
