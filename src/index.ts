import * as core from '@actions/core'
import * as github from '@actions/github'
import * as vercel from './vercel'
import * as input from './input'

async function run() {
  try {
    await vercel.pull()
    if (input.isPrebuilt) await vercel.build()
    const deploymentUrl = await vercel.deploy()
    const { readyState } = await vercel.getDeployment(deploymentUrl)
    if (input.domainAlias.length) await vercel.setAlias(deploymentUrl)

    core.setOutput('deployment-url', deploymentUrl)
    core.setOutput('deployment-status', readyState)

    if (!input.githubToken) return

    const octokit = github.getOctokit(input.githubToken)
    const ref =
      github.context.payload.pull_request?.head.sha ?? github.context.sha
    const environment =
      input.githubDeploymentEnvironment ?? input.isProduction
        ? 'Production'
        : 'Preview'

    // create Deployment
    try {
      const deployment = await octokit.rest.repos.createDeployment({
        ...github.context.repo,
        ref,
        auto_merge: false,
        environment,
        required_contexts: [],
      })

      await octokit.rest.repos.createDeploymentStatus({
        ...github.context.repo,
        deployment_id: (deployment.data as { id: number }).id,
        state: readyState === 'READY' ? 'success' : 'error',
        environment_url: deploymentUrl,
      })
    } catch (error: any) {
      core.warning(
        'May need "GITHUB_TOKEN" with "write" permission to "deployments"'
      )
      core.error(error)
    }

    // create Commit Status
    try {
      await octokit.rest.repos.createCommitStatus({
        ...github.context.repo,
        sha: ref,
        target_url: deploymentUrl,
        state: readyState === 'READY' ? 'success' : 'error',
        context: 'Vercel',
        description: environment,
      })
    } catch (error: any) {
      core.warning(
        'May need "GITHUB_TOKEN" with "write" permission to "statuses"'
      )
      core.error(error)
    }
  } catch (error: any) {
    core.setFailed(error)
  }
}

run().catch(error => core.setFailed(error))
