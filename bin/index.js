#!/usr/bin/env node

import { Command } from 'commander'
import { lstatSync, readdirSync } from 'fs'
import { createRequire } from 'module'
import { isDir, pasteToClipboard } from '../utils/utils.js'
import path from 'path'
import colors from 'colors'

const require = createRequire(import.meta.url)
const { version } = require('../package.json')

const program = new Command()

program
  .option('-d, --dir <directory>', 'please input a directory path')
  .option('-v, --version', 'output the version')

program.parse(process.argv)

const options = program.opts()

console.log('options', options)

const main = () => {
  if (options.version) {
    console.log(`v${version}`)
    return
  }

  if (options.dir) {
    // 指定了目录
    handleExeDir()
    return
  }
}

let root = {
  sidebar: {},
}

main()

function handleExeDir() {
  const rootFilePath = path.join(process.cwd(), options.dir)

  try {
    // const isDir = lstatSync(filePath).isDirectory()

    if (!isDir(rootFilePath))
      return console.log('Please input a correct directory path!'.red)

    const files = readdirSync(rootFilePath)
    console.log('files :>> ', files)

    const baseName = path.basename(rootFilePath)

    // 初始化
    root['sidebar'][`/${baseName}/`] = []

    generator(
      files,
      rootFilePath,
      root['sidebar'][`/${baseName}/`],
      `/${baseName}`
    )

    // !解决空的items引起报错, 循环递归检测, 移除空的items
    removeEmptyItems(root['sidebar'][`/${baseName}/`])

    console.log('It has copy to clipboard :>> '.red, JSON.stringify(root))
    pasteToClipboard(JSON.stringify(root.sidebar))
  } catch (e) {
    console.log(e)
    console.log('Please input a correct directory path!'.red)
  }
}

function removeEmptyItems(root) {
  let index = 0
  for (let e of root) {
    const row = e.items
    const filteredRow = row.filter((col) => !col.items)
    if (filteredRow.length > 0) {
      // 存在数据
      e.items = filteredRow
    } else {
      root.splice(index, 1)
    }
    index++
  }
}

function generator(files, rootFilePath, base, beforePath, level = 1) {
  for (let item of files) {
    const {
      name,
      ext,
      base: fileName,
    } = path.parse(path.join(rootFilePath, item))

    const itemFilePath = path.join(rootFilePath, item)

    // !递归深度只能是2层
    // 不允许嵌套超过两层
    if (level > 2) return

    // 普通文件
    if (!isDir(itemFilePath)) {
      // 文件, 加入到路径中
      // {
      //   text:'',
      //   link:'xxx'
      // }

      // 单个文件为一个组
      if (level === 1) {
        continue
      }

      base.push({
        text: name,
        link: beforePath + '/' + name,
      })
    } else {
      // 文件夹

      base.push({
        text: name,
        collapsible: true, // 允许折叠
        items: [],
      })

      const index = base.length - 1

      const tmpPath = path.join(rootFilePath, fileName)

      files = readdirSync(tmpPath)

      console.log('base[items] :>> ', base[index])

      generator(
        files,
        tmpPath,
        base[index]['items'],
        beforePath + '/' + name,
        level + 1
      )
    }
  }
}
