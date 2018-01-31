export default function burger () {
  const menu       = document.querySelector('.burger-body')
  const burger_but = document.querySelector('.burger-but')
  const close_but  = document.querySelector('.burger-close')

  function clickBurger (flag) {
    flag
      ? menu.classList.add('active')
      : menu.classList.remove('active')
  }

  function resize () {
    if (window.innerWidth > 900) { menu.classList.remove('active') }
  }

  return {
    init () {
      window.addEventListener('resize', resize)
      burger_but.addEventListener('click', e => {
        e.preventDefault()
        clickBurger(true)
      })
      close_but.addEventListener('click', e => {
        e.preventDefault()
        clickBurger(false)
      })
    }
  }
}
