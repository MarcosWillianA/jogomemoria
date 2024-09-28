const cronometro = document.getElementById('cronometro');
const cartas = ['abacaxi', 'banana', 'limao', 'maca', 'mamao', 'melancia', 'pera', 'uva'];
const container = document.getElementById('container');
const frutas = document.querySelectorAll('.fruta'); 

const abacaxi = document.getElementById('abacaxi');

abacaxi.addEventListener('click', girarCarta);

function girarCarta() {
    abacaxi.classList.toggle('girar')
    console.log(abacaxi.classList);
}