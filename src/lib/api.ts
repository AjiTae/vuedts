import * as ts from 'typescript'
import { generate as _generate } from './generate'
import { watch as _watch } from './watch'
import { readConfig } from './config'
import { getPathReplacer } from './out-root';

function getOptions(configPath: string) {
  const config = readConfig(configPath);
  return config ? config.options : {};
}

export function generate (filenames: string[], configPath: string, outRoot: string = ''): Promise<void> {
  const options = getOptions(configPath);
  getPathReplacer(options, outRoot);
  return _generate(filenames, options)
}

export function watch(dirs: [string, ...string[]], configPath: string, outRoot: string = ''): void {
  const options = getOptions(configPath);
  getPathReplacer(options, outRoot);
  _watch(dirs, options)
}
