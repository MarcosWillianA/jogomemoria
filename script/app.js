const cronometro = document.getElementById('cronometro');
const cartas = ['abacaxi', 'banana', 'limao', 'maca', 'mamao', 'melancia', 'pera', 'uva'];
const container = document.getElementById('container');
const frutas = document.querySelectorAll('.fruta'); 

const abacaxi = document.getElementById('abacaxi');

abacaxi.addEventListener('click', girarAbacaxi);

function girarAbacaxi() {
    abacaxi.classList.toggle('girar')
    console.log(abacaxi.classList);
}

// PRA SEGUNDA: Com id funcionou, mas eu preciso saber como aplicar isso em todas as classes:

// Ideia: talvez dentro da função girarCarta(), fazer ele iterar sobre cada classe e acrescer a classe .girar.