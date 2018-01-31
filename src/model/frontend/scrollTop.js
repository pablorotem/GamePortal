import wingame from './wingame'
import popup   from './popup'

export default class GameWindow {
  constructor () {
    this.game_link  = document.querySelectorAll('.games-item')
    this.newgame    = document.querySelector('.newgame-play')
    this.game       = false

    this.newgame.addEventListener('click', (e) => {
      e.preventDefault()
      wingame().init()
      const href_link   = this.newgame.getAttribute('href')
      const target_link = this.newgame.getAttribute('target')
      const link        = document.createElement('a')

      link.setAttribute('href', href_link)
      link.setAttribute('target', target_link)

      const event = document.createEvent('MouseEvents')
      event.initMouseEvent('click')
      this.timerScroll(false)
      setTimeout(() => {
        link.dispatchEvent(event)
      }, 1000)
    })

    for (let i = 0; i < this.game_link.length; i++) {
      this.game_link[i].addEventListener('click', (e) => {
        e.preventDefault()

        const check_href = this.game_link[i].children[0].getAttribute('href')

        if (check_href === '#') {
          popup().getActive({
            flag:true,
            text: 'Under Development',
            account:false
          })
          return
        }

        wingame().init()

        this.game = this.game_link[i].children[0]
        this.timerScroll(true)
      })
    }
  }

  timerScroll (flag) {
    return new Promise((resolve, reject) => {
      const timeout = setInterval(function () {
        let y
        const window_game = document.querySelector('.game-window')
        if (window_game.getBoundingClientRect().top > 0 && flag === true) {
          clearInterval(timeout)
        }
        console.log(window_game.getBoundingClientRect().bottom)
        if (window_game.getBoundingClientRect().top - 50 <= 0 && flag === false) {
          clearInterval(timeout)
        }

        if (flag) {
          y = -30
        } else {
          y = 30
        }

        window.scrollBy(0, y)
      }, 10)

      if (clearInterval) {
        resolve()
      }
    }).then(() => {
      const event = document.createEvent('MouseEvents')
      event.initMouseEvent('click')

      setTimeout(() => {
        this.game.dispatchEvent(event)
      }, 1000)
    })
  }
}
