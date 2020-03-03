import * as chalk from 'chalk'

export function logEmitted (filePath: string): void {
  console.log(chalk.green('Emitted: ') + filePath)
}

export function logRemoved (filePath: string): void {
  console.log(chalk.green('Removed: ') + filePath)
}

export function logWarning (msg: string): void {
  console.log(chalk.yellow('Warning: ') + msg)
}

export function logError (filePath: string, messages: string[]): void {
  const errors = [
    chalk.red('Emit Failed: ') + filePath,
    ...messages.map(m => '  ' + chalk.red('Error: ') + m)
  ]
  console.error(errors.join('\n'))
}
