// riot route base url set in ./src/view/app.view.js line 47
import View       from './view/app.view.js'
import burger     from './model/frontend/burger'
import wingame    from './model/frontend/wingame'
import GameWindow from './model/frontend/scrollTop'
import popup      from './model/frontend/popup'
import preload    from './model/frontend/preloader'
import Lib        from './model/frontend/lib'
import logout     from './model/frontend/logout'
import netSwitch  from './model/frontend/networkSwitch'
import Account    from './model/frontend/account'
import inputNum   from './model/frontend/input'

const App = {}
window.App = App

document.addEventListener('DOMContentLoaded', () => {
  App.view = new View()
  App.view.start()
 // App.loader = preload()
  const account_address = document.querySelector('.account-address')

  const sign_but     = document.querySelector('.account-signin')
  const account_page = sign_but.nextElementSibling
  const logout_but   = sign_but.nextElementSibling.nextElementSibling

  if (localStorage.web3wallet) {
    sign_but.style.display     = 'none'
    account_page.style.display = 'block'
    logout_but.style.display   = 'block'
    Lib.balance(account_page)
    account_address.value = Lib.getOpenkey().openkey
  }

  const burgerinit  = burger()
  const logout_init = logout()
  const netSW       = netSwitch()
  const ppup        = popup()
  const account     = Account()
  const inp         = inputNum()

  burgerinit.init()
  logout_init.init()
  netSW.init()
  ppup.init()
  account.init()
  inp.init()

  const wingame = new GameWindow()
})

// Enable SW in production
// https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md#making-a-progressive-web-app
// serviceWorkerRegistration.register()
