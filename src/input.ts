import * as core from "@actions/core";

const environmentPattern = /^[A-Za-z][A-Za-z0-9_]*=(["']).+\1$/;

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

export const buildEnvironments = core
	.getMultilineInput("build-env")
	.filter((it) => environmentPattern.test(it));

export const environments = core
	.getMultilineInput("env")
	.filter((it) => environmentPattern.test(it));
