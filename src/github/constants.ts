import { context } from "@actions/github";
import * as input from "../input";

export const deploymentEnvironmentName =
	input.githubDeploymentEnvironment ??
	(input.isProduction ? "Production" : "Preview");
export const commitRef = context.payload.pull_request?.head.sha ?? context.sha;
