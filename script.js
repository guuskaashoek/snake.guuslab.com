window.addEventListener('deviceorientation', handleOrientation);

function handleOrientation(event) {
    var horizonTilt = event.beta || 0;
    var waterpas = document.querySelector('.waterpas');
    waterpas.style.transform = `rotate(${horizonTilt}deg)`;
}
