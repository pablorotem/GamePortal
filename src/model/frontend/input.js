export default function inputNum () {
  const inp_am = document.querySelector('.send-amount')

  function dont_string (e) {
    const rep = /[-\;":'a-zA-Zа-яА-Я]/

    if (e.charCode && (e.charCode < 48 || e.charCode > 57)) {
      const value = inp_am.value.replace(rep, '')
      value.substr(-1)
      inp_am.value = value
    }
  }

  return {
    init () {
      inp_am.addEventListener('keypress', dont_string)
      // inp_am.addEventListener('change', inp_am.length)
    }
  }
}
