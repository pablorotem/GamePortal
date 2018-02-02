export default function netSwitch (params) {
  const shadow_switch  = document.querySelector('.switch-but')
  // const mainnet        = document.querySelector('.switch-mainnet')
  // const testnet        = document.querySelector('.switch-testnet')
  // const switcher       = document.querySelector('.switch-shadow')

  // function switchNet () {
  //   console.log('object')
  //   if (testnet.checked) {
  //     mainnet.checked = true
  //     switcher.classList.add('mainnet')
  //   } else {
  //     testnet.checked = true
  //     switcher.classList.remove('mainnet')
  //   }
  // }

  return {
    init () {
      shadow_switch.addEventListener('click', e => {
        e.preventDefault()
        // switchNet()
      })
    }
  }
}
