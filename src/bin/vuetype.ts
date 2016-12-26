#!/usr/bin/env node

import path = require('path')
import program = require('commander')
import async = require('async')
import glob = require('glob')
import { generate } from '../lib/generate'

// tslint:disable-next-line
const meta = require('../../package.json')

program
  .version(meta.version)
  .usage('<directory ...>')
  .parse(process.argv)

const patterns = program.args.map(arg => {
  return path.join(arg, '**/*.vue')
})

async.waterfall([
  async.apply(async.concat, patterns, glob),
  generate
], err => {
  if (err) throw err
})