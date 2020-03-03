import { CompilerOptions } from 'typescript';
import {resolve} from 'path';

export function escape(string: string) {
  return string.replace(/[|\\{}()[\]^$+*?.-]/g, '\\$&');
}

export let pathReplacer: false | ((path:string) => string) = false;

export function getPathReplacer(options: CompilerOptions, outRoot: string) {
  if(!outRoot) return pathReplacer = false;

  const rootDirs = options.rootDirs && options.rootDirs.length
      ? options.rootDirs
      : [options.baseUrl || resolve('.')];
  const replacer = new RegExp('^' + rootDirs.map(path => escape(resolve(path))).join('|^'));
  outRoot = resolve(outRoot);

  return pathReplacer = (path: string) => resolve(path).replace(replacer, outRoot);
}

