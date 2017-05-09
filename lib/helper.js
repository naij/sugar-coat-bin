'use strict'

const fs = require('fs')
const path = require('path')

module.exports = {

  names: [
    'sugar-coat'
  ],

  /**
   * 获取真实的模块路径
   */
  get path() {
    let eggPath

    // 先找到项目的根目录（有 package.json 文件）
    // ava 测试的时候 cwd 是测试文件所在目录
    let cwd = process.cwd()
    let lastCwd
    while (lastCwd !== cwd && !fs.existsSync(path.join(cwd, 'package.json'))) {
      lastCwd = cwd
      cwd = path.dirname(cwd)
    }

    for (const name of this.names) {
      const dirpath = path.join(cwd, 'node_modules', name)
      if (fs.existsSync(dirpath)) {
        eggPath = dirpath
        break
      }
    }

    if (!eggPath) {
      // try require global
      for (const name of this.names) {
        try {
          eggPath = require.resolve(name)
          // 必须 break，因为在 npminstall 模式下能框架依赖了 egg 就一定找到 @ali/egg
          break
        } catch (_) {
          continue
        }
      }
    }

    if (!eggPath) {
      throw new Error('Can\'t find these egg web modules: ' + this.names.join(', '))
    }

    if (/\.js$/.test(eggPath)) {
      eggPath = path.dirname(eggPath)
    }

    return eggPath
  },

}
