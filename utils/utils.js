import { lstatSync } from 'fs'

import { exec } from 'child_process'
import iconv from 'iconv-lite'

/**
 * 目录地址是否是目录
 * @param {*} path
 */
export const isDir = (path) => {
  return lstatSync(path).isDirectory()
}

/**
 * 粘贴字符串到剪切板
 * @param {*} str
 */
export const pasteToClipboard = (str) => {
  exec('clip').stdin.end(iconv.encode(str, 'gbk'))
}
