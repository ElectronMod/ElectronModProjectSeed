const styleContent = `
#app-loading-wrap {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #ffffff;
  z-index: 2000;
}
.sk-circle {
  width: 40px;
  height: 40px;
  position: relative; 
}
.sk-circle-dot {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
}
.sk-circle-dot:before {
    content: '';
    display: block;
    width: 15%;
    height: 15%;
    background-color: #409eff;
    border-radius: 100%;
    animation: sk-circle 1.2s infinite ease-in-out both; 
}
.sk-circle-dot:nth-child(1) { transform: rotate(30deg); }
.sk-circle-dot:nth-child(2) { transform: rotate(60deg); }
.sk-circle-dot:nth-child(3) { transform: rotate(90deg); }
.sk-circle-dot:nth-child(4) { transform: rotate(120deg); }
.sk-circle-dot:nth-child(5) { transform: rotate(150deg); }
.sk-circle-dot:nth-child(6) { transform: rotate(180deg); }
.sk-circle-dot:nth-child(7) { transform: rotate(210deg); }
.sk-circle-dot:nth-child(8) { transform: rotate(240deg); }
.sk-circle-dot:nth-child(9) { transform: rotate(270deg); }
.sk-circle-dot:nth-child(10) { transform: rotate(300deg); }
.sk-circle-dot:nth-child(11) { transform: rotate(330deg); }
.sk-circle-dot:nth-child(1):before { animation-delay: -1.1s; }
.sk-circle-dot:nth-child(2):before { animation-delay: -1s; }
.sk-circle-dot:nth-child(3):before { animation-delay: -0.9s; }
.sk-circle-dot:nth-child(4):before { animation-delay: -0.8s; }
.sk-circle-dot:nth-child(5):before { animation-delay: -0.7s; }
.sk-circle-dot:nth-child(6):before { animation-delay: -0.6s; }
.sk-circle-dot:nth-child(7):before { animation-delay: -0.5s; }
.sk-circle-dot:nth-child(8):before { animation-delay: -0.4s; }
.sk-circle-dot:nth-child(9):before { animation-delay: -0.3s; }
.sk-circle-dot:nth-child(10):before { animation-delay: -0.2s; }
.sk-circle-dot:nth-child(11):before { animation-delay: -0.1s; }
@keyframes sk-circle {
  0%, 80%, 100% {
    transform: scale(0); }
  40% {
    transform: scale(1); 
  } 
}
`
const divContent = `
<div class="sk-circle">
  <div class="sk-circle-dot"></div>
  <div class="sk-circle-dot"></div>
  <div class="sk-circle-dot"></div>
  <div class="sk-circle-dot"></div>
  <div class="sk-circle-dot"></div>
  <div class="sk-circle-dot"></div>
  <div class="sk-circle-dot"></div>
  <div class="sk-circle-dot"></div>
  <div class="sk-circle-dot"></div>
  <div class="sk-circle-dot"></div>
  <div class="sk-circle-dot"></div>
  <div class="sk-circle-dot"></div>
</div>
`
const oStyle = document.createElement('style')
const oDiv = document.createElement('div')

oStyle.id = 'app-loading-style'
oStyle.innerHTML = styleContent
oDiv.id = 'app-loading-wrap'
oDiv.innerHTML = divContent

const appendLoading = () => {
  document.head.appendChild(oStyle)
  document.body.appendChild(oDiv)
}

const removeLoading = () => {
  document.head.removeChild(oStyle)
  document.body.removeChild(oDiv)
}

export { appendLoading, removeLoading }
