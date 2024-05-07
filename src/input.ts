import * as core from "@actions/core";
import { parse as parseDotenv } from "dotenv";

export const orgId = core.getInput("org-id", { required: true });
export const projectId = core.getInput("project-id", { required: true });
export const token = core.getInput("token", { required: true });
export const isProduction = core.getBooleanInput("production");
export const isPrebuilt = core.getBooleanInput("prebuilt");
export const isPublic = core.getBooleanInput("public");
export const cwd = core.getInput("cwd") || process.cwd();
export const domainAlias = core.getMultilineInput("domain-alias");
export const githubToken = core.getInput("github-token") || void 0;
export const githubDeploymentEnvironment =
	core.getInput("github-deployment-environment") || void 0;
export const buildEnvironments = parseDotenv(core.getInput("build-env"));
export const environments = parseDotenv(core.getInput("env"));

if (domainAlias.length)
	core.warning(
		'"domain-alias" is deprecated. See https://actions-vercel.nexterias.dev/references/inputs/optional/domain-alias',
	);
if (githubDeploymentEnvironment)
	core.warning(
		'"github-deployment-environment" is deprecated. See https://actions-vercel.nexterias.dev/references/inputs/optional/github-deployment-environment',
	);
