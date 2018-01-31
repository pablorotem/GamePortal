/*
 * Init client/window
 * mount tags
 */

import riot  from 'riot'
import route from 'riot-route'
import './styles/app.less'

// Enable HMR in dev mode
if (process.env.NODE_ENV === 'development') {
  require('riot-hot-reload')
}

// import $ from 'jquery'

export default class View {
  start () {
    // create observable App.view.state
    this.state = {}
    riot.observable(this.state)

    // import and mount all tags
    this.importTags()
    riot.mount('*')

    // enable router
    this.routing()
  }

  importTags () {
    let tc = require.context('./components/', true, /\.tag$/)
    tc.keys().forEach(function (path) { tc(path) })
  }

  routing () {
    // route.base('#')
    route.base('/')
    if (['http:', 'https:'].indexOf(window.location.protocol) === -1) {
      // alert('Riot route base is "/"  - you need run app on server url for correct routing. or change riot base(and links) to # ')
    }

    route.start(true)
  }
}
