export default function wingame () {
  const game_win  = document.querySelector('.game-window')
  const preload   = document.querySelector('.preload')
  const gameFrame = document.querySelector('.game-frame')
  
  function resize () {
    const max_w = 1920
    const max_h = 1080
    const width = game_win.offsetWidth

    const percent_w = (width * 100) / max_w
    const height = (percent_w * max_h) / 100

    game_win.style.height = height + 'px'
  }

  function active () {    
    game_win.classList.add('winload')
  
    if (preload.classList.contains('preloadout')) {
      preload.classList.remove('preloadout')
    }
  
    setTimeout(() => {
      preload.style.display = 'flex'
    }, 500)
  }

  return {
    init () {
      resize()
      active()
      gameFrame.addEventListener('load', () => {
        preload.classList.add('preloadout')
    
        setTimeout(function () {
          preload.style.display = 'none'
        }, 1200)
      })
      window.addEventListener('resize', resize)
    }
  }
}
