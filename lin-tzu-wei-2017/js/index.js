import { currentYPosition, elmYPosition } from 'kc-scroll'
import _ from 'lodash'
import {
  initGame
} from './demoRender.js'
import './index.styl'

class Project {
  constructor () {}
  initialize() {
    initGame()
  }
}

window.addEventListener('load', () => {
  const project = new Project()
  project.initialize()
})