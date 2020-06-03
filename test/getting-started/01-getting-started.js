
'use strict'

const Lab = require('@hapi/lab')

// Test files must require the lab module, and export a test script
const lab = (exports.lab = Lab.script())

// shortcuts to functions from lab
const experiment = lab.experiment  
const test = lab.test

experiment('getting started with hapi testing,', () => {  
  test('TODO')

  test('always succeeding :)', {timeout: 5000}, () => {})
})