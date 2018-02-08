import Lib from './lib'

export default function Account () {
  const export_but  = document.querySelector('.account-export')
  const export_inp  = document.querySelector('.account-privatekey')
  const send_amount = document.querySelector('.send-submit')
  const msg_div     = document.querySelector('.export-msg')
  // const address     = document.querySelector('.send-address')
  // const amount      = document.querySelector('.send-amount')
  // const acc_popup   = document.querySelector('.account-popuppag')

  // function reset (elem, flag) {
  //   const val = elem.value
  //   if (flag) {
  //     elem.value = ''
  //   } else {
  //     elem.value = val
  //   }
  // }

  return {
    init () {
      export_but.addEventListener('click', (e) => {
        e.preventDefault()
        const privateKey = Lib.exportPrivate()
        export_inp.value = privateKey
        try {
          export_inp.select()
          document.execCommand('copy')
          window.getSelection().removeAllRanges()
          msg_div.classList.add('copy')
          setTimeout(() => {
            msg_div.classList.remove('copy')
          }, 3000)
        } catch (e) {
          console.log(e)
        }
      })

      // address.addEventListener('click', () => {
      //   reset(address, true)
      // })
      // amount.addEventListener('click', () => {
      //   reset(amount, true)
      // })

      // acc_popup.addEventListener('click', e => {
      //   const target = e.target
      //   if (target.classList.contains('send-address') || target.classList.contains('send-amount')) return

      //   reset(address, false)
      //   reset(amount, false)
      // })

      send_amount.addEventListener('click', (e) => {
        e.preventDefault()
        const to     = document.querySelector('.send-address').value
        const amount = document.querySelector('.send-amount').value
        const cur    = document.querySelectorAll('.send-checkcur')

        let cur_value

        for (let i = 0; i < cur.length; i++) {
          if (cur[i].checked) {
            cur_value = cur[i].value
          }
        }

        if (cur_value === 'bets') {
          Lib.send(to, amount, cur_value)
        }
      })
    }
  }
}
