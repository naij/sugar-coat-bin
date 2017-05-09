'use strict'

const path = require('path')
const Program = require('egg-bin').Program

class SugarcoatProgram extends Program {
  constructor() {
    super()
    this.version = require('../package.json').version

    this.addCommand('cov', path.join(__dirname, 'cov_command.js'))
    this.addCommand('debug', path.join(__dirname, 'debug_command.js'))
    this.addCommand('dev', path.join(__dirname, 'dev_command.js'))
    this.addCommand('test', path.join(__dirname, 'test_command.js'))
  }
}

module.exports = SugarcoatProgram