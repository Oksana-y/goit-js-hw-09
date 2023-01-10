function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }

const refs = {
    btnStart: document.querySelector('[data-start]'),
    btnStop: document.querySelector('[data-stop]'),
    getBody: document.querySelector("body"),
}
let timerId = null;
refs.btnStop.setAttribute('disabled', true);
       
const onBtnClick = () => {
    
    timerId = setInterval(() => {
    const currentColor = getRandomHexColor();
    refs.getBody.style.backgroundColor = currentColor;
    
},1000)
    refs.btnStop.removeAttribute('disabled'); 
    refs.btnStart.setAttribute('disabled', true);
    
    
}


refs.btnStart.addEventListener('click', onBtnClick)
    
refs.btnStop.addEventListener('click', () => {
    clearInterval(timerId);
   
    refs.btnStart.removeAttribute('disabled');
    refs.btnStop.setAttribute('disabled', true); 
})





