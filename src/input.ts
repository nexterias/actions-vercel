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

core.startGroup("inputs");
core.startGroup("buildEnvironments");
for (const [key, value] of Object.entries(buildEnvironments)) {
	core.debug(`${key}=${value}`);
}
core.endGroup(); // End buildEnvironments

core.startGroup("environments");
for (const [key, value] of Object.entries(environments)) {
	core.debug(`${key}=${value}`);
}
core.endGroup(); // End environments
core.endGroup(); // End inputs
