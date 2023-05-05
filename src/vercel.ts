import * as core from '@actions/core'
import * as input from './input'
import { exec, getExecOutput } from '@actions/exec'
import { fetch } from 'undici'
import { GetDeploymentByIdOrUrlResponse } from './types'

/**
 * Install Vercel CLI
 */
export const install = () =>
  core.group('Install Vercel CLI', async () => {
    const code = await exec('which', ['vercel'], { ignoreReturnCode: true })

    if (code === 0)
      core.info('Skip this step since the Vercel CLI is already installed.')
    else await exec('npm', ['install', '-g', 'vercel'])
  })

const globalOptions = [
  `--token=${input.token}`,
  `--cwd=${input.cwd}`,
  '--yes',
  '--no-color',
]

/**
 * Execute `vercel ...args ...globalOptions` command
 */
const execute = async (args: string[], ignoreError = false) => {
  const { exitCode, stderr, stdout } = await getExecOutput(
    'vercel',
    [...args, ...globalOptions],
    {
      env: {
        VERCEL_ORG_ID: input.orgId,
        VERCEL_PROJECT_ID: input.projectId,
        ...process.env,
      },
      ignoreReturnCode: ignoreError,
    }
  )

  if (exitCode !== 0 && !ignoreError) {
    if (stderr) throw stderr
    else throw `Failed to execute \`vercel\` command. Exit code: ${exitCode}`
  }

  return stdout
}

export const pull = () =>
  core.group('Run `vercel link`', async () => {
    await execute([
      'pull',
      `--environment=${input.isProduction ? 'production' : 'preview'}`,
    ])
  })

export const build = async () =>
  core.group('Run `vercel build`', async () => {
    const command: string[] = ['build']
    if (input.isProduction) command.push('--prod')

    await execute(command)
  })

export const deploy = () =>
  core.group('Run `vercel deploy`', async () => {
    const command: string[] = ['deploy']

    if (input.isProduction) command.push('--prod')
    if (input.isPrebuilt) command.push('--prebuilt')
    if (input.isPublic) command.push('--public')

    input.buildEnvironments.forEach(it => command.push('--build-env', it))
    input.environments.forEach(it => command.push('--env', it))

    const deploymentUrl = await execute(command, true)

    return deploymentUrl
  })

export const setAlias = (deploymentUrl: string) =>
  core.group('Assigning Domains', async () => {
    for (const domain of input.domainAlias) {
      const command: string[] = ['alias', 'set', deploymentUrl, domain]

      await execute(command)
    }
  })

export const getDeployment = async (
  url: string
): Promise<GetDeploymentByIdOrUrlResponse> => {
  const response = await fetch(
    `https://api.vercel.com/v13/deployments/${encodeURIComponent(
      url.replace(/^https:\/\//, '')
    )}?withGitRepoInfo=true`,
    {
      headers: {
        Authorization: `Bearer ${input.token}`,
      },
      method: 'get',
    }
  )

  return response.json() as Promise<GetDeploymentByIdOrUrlResponse>
}
