import 'jest-styled-components'

require('jest-localstorage-mock')
require('raf').polyfill()

/**
 * Global configuration file for jest.
 */
const enzyme = require('enzyme')
const Adapter = require('enzyme-adapter-react-16')
const React = require('react')

enzyme.configure({adapter: new Adapter()})

global.React = React
global.mount = enzyme.mount
global.shallow = enzyme.shallow

const requestAnimationFrameCallback = (cb) => {
  setTimeout(cb, 0)
}

// Override date to always return same date for tests
Date.now = jest.fn(() => 1543299867087)

window.requestAnimationFrame = window.requestAnimationFrame
  || requestAnimationFrameCallback

window.scrollTo = () => {}

global.swal = (object) => {
  return object
}
