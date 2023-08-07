// Functie om de oriëntatie van het apparaat bij te werken en de balk te draaien
function updateRotation(event) {
    var x = event.beta; // Kanteling rond de X-as (voorwaartse / achterwaartse beweging)
    var y = event.gamma; // Kanteling rond de Y-as (zijwaartse beweging)

    var rotation = -y; // Inverseer de waarde voor draairichting

    var rotatingBar = document.querySelector('.rotating-bar');
    rotatingBar.style.transform = 'rotate(' + rotation + 'deg)';
}

// Luister naar het "deviceorientation" -evenement en roep de updateRotation-functie aan
window.addEventListener('deviceorientation', updateRotation);
