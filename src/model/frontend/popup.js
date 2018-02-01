import Lib from './lib'

export default function popup () {
  const popup_container = document.querySelector('.popup')
  const popup_text      = document.querySelector('.popup-text')
  const accountPopup    = document.querySelector('.account-window')
  const acc_overlay     = document.querySelector('.account-overlay')
  const closepopup_but  = document.querySelector('.popup-but')
  const popupAccount    = document.querySelector('.popup-account')
  const signBut         = document.querySelector('.account-signin')
  const closeAccount    = document.querySelector('.account-close')
  const accountPageBut  = document.querySelector('.account-page')
  const account_address = document.querySelector('.account-address')
  const accountPage     = signBut.nextElementSibling
  const logout_but      = signBut.nextElementSibling.nextElementSibling

  function popupActive (params = false) {
    // if params text it's true then add text in html
    if (params.text) popup_text.innerHTML = params.text
    // if params account it's true then active account page
    // else active default popup
    if (params.account) {
      if (params.flag) {
        accountPopup.style.display = 'block'
        setTimeout(() => {
          accountPopup.classList.add('popup-active')
        }, 100)
      } else {
        accountPopup.classList.remove('popup-active')
        setTimeout(() => {
          accountPopup.removeAttribute('style')
        }, 1000)
      }
    } else {
      if (params.flag) {
        console.log(1)
        popup_container.style.display = 'block'
        setTimeout(() => {
          popup_container.classList.add('popup-active')
        }, 100)
      } else {
        popup_container.classList.remove('popup-active')
        setTimeout(() => {
          popup_container.removeAttribute('style')
        }, 1000)
      }
    }
  }

  return {
    init () {
      closepopup_but.addEventListener('click', e => {
        e.preventDefault()
        popupActive({
          flag    : false,
          text    : false,
          account : false
        })
      })

      signBut.addEventListener('click', e => {
        e.preventDefault()
        popupAccount.style.display = 'block'
        // popupActive({
        //   flag    : true,
        //   text    : false,
        //   account : false
        // })

        setTimeout(() => {
          Lib.DCLib.Account.initAccount()

          popupAccount.parentNode.parentNode.classList.remove('popup-active')
          popupAccount.parentNode.parentNode.removeAttribute('style')
          popupAccount.children[0].style.display = 'none'

          signBut.style.display     = 'none'
          accountPage.style.display = 'block'
          logout_but.style.display  = 'block'

          setTimeout(() => {
            account_address.value = Lib.getOpenkey().openkey
            Lib.balance(accountPage)
          }, 2000)
        }, 1000)
      })

      accountPageBut.addEventListener('click', e => {
        e.preventDefault()
        popupActive({
          flag:true,
          text:false,
          account:true
        })
      })

      popup_container.addEventListener('click', e => {
        e.preventDefault()
        const target = e.target || e.currentTarget

        if (target.classList.contains('popup-table') || target.classList.contains('popup-text')) return
        
        popupActive({
          flag:false,
          text:false,
          account:false
        })
      })

      acc_overlay.addEventListener('click', e => {
        const target = e.target || e.currentTarget
        if (target.classList.contains('account-overlay')) {
          popupActive({
            flag:false,
            text:false,
            account:true
          })
        }


      })

      closeAccount.addEventListener('click', e => {
        e.preventDefault()
        popupActive({
          flag:false,
          text:false,
          account:true
        })
      })
    },
    getActive (params = false) {
      popupActive(params)
    }
  }
}
