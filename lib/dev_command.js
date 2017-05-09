'use strict'

const DevCommand = require('egg-bin').DevCommand
const helper = require('./helper')

class SugarcoatDevCommand extends DevCommand {
  help() {
    return '以 local 模式启动应用'
  }

  * run(cwd, args) {
    return yield super.run(cwd, args)
  }

  getFrameworkOrEggPath(cwd) {
    let eggPath = helper.path
    if (!eggPath) {
      eggPath = super.getFrameworkOrEggPath(cwd)
    }
    return eggPath
  }
}

module.exports = SugarcoatDevCommand
