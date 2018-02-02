/*
  globals localStorage 
*/
export default function logout () {
  const logout_but   = document.querySelector('.account-logout')
  const account_page = document.querySelector('.account-page')
  const sign_but     = document.querySelector('.account-signin')

  function exit () {
    localStorage.clear()
    logout_but.style.display   = 'none'
    account_page.style.display = 'none'
    sign_but.style.display     = 'block'
    window.location.reload()
  }

  return {
    init () {
      logout_but.addEventListener('click', e => {
        e.preventDefault()
        exit()
      })
    }
  }
}
