//@ts-nocheck
document.addEventListener('DOMContentLoaded', () => {
  let flash = document.querySelector('.flash');
  if (flash.innerHTML !== '') {
    console.log(flash);
    setTimeout(() => {
      flash.innerHTML = '';
    }, 3000);
  }
});
