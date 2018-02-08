/*
  globals localStorage 
*/

import DCLib from 'dclib'

export default new class Lib {
  constructor () {
    this.DCLib = DCLib
    this.DCLib.on('ready', () => {
      document.querySelector('.account-signin').style.visibility = 'visible'
      document.querySelector('.account-signin').textContent = 'sign in'
    })
    if (localStorage.web3wallet) {
      this.DCLib.Account.initAccount()
    }
  }

  getOpenkey () {
    return this.DCLib.Account.get()
  }

  exportPrivate () {
    return this.DCLib.Account.exportPrivateKey()
  }

  send (to, amount, flag) {
    if (flag === 'bets') {
      this.DCLib.Account.sendBets(to, amount)
    }
  }

  balance (elem) {
    this.DCLib.Eth.getBalances(this.getOpenkey().openkey).then(res => {
      if (res.bets === 0 || res.eth === 0) this.DCLib.faucet()
      if (res) elem.textContent = `${res.bets} BET`
      if (typeof res.bets === 'undefined') elem.textContent = '.:.:. BET'
    })
  }
}()
