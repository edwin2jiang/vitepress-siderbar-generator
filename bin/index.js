#!/usr/bin/env node

import { Command } from "commander"
import { createRequire } from "module"
const require = createRequire(import.meta.url)
const { version } = require("../package.json")

const program = new Command()

program
  .option("-d, --dir <directory>", "please input a directory path")
  .option("-v, --version", "output the version")

program.parse(process.argv)

const options = program.opts()

console.log("options", options)

const main = () => {
  if (options.version) {
    console.log(`v${version}`)
    return
  }
}

main()
