export default function preload () {
  const preloader = document.querySelector('.preloader')
  setTimeout(() => {
    preloader.classList.add('out')
  }, 100)
}
