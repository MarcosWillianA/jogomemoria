const cronometro = document.getElementById('cronometro');
const cartas = ['abacaxi', 'banana', 'limao', 'maca', 'mamao', 'melancia', 'pera', 'uva'];
const container = document.getElementById('container');
const frutas = document.querySelectorAll('.fruta'); 
const frente = document.querySelectorAll('.frentecarta'); 
const botaoReset = document.querySelector('#restart');

let timerInterval;
let seconds = 0;

function embaralhar(array) { // Algorítmo Fisher-Yates Shuffle - 
    for (let indice = array.length; indice; indice--) {
        const indiceAleatorio = Math.floor(Math.random() * indice);
        const elemento = array[indice - 1];
        array[indice - 1] = array[indiceAleatorio];
        array[indiceAleatorio] = elemento;
    }
    
    return array;
}

function gerarParesAleatorios(array) {
    // Cria um novo array com cada elemento duplicado
    const duplicados = [];
    for (const item of array) {
        duplicados.push(item, item); // Adiciona o item duas vezes
    }
    
    // Embaralha o array duplicado
    return embaralhar(duplicados);
}

// Pares gerados aleatoriamente
const cartasParesAleatorios = gerarParesAleatorios(cartas);
console.log(cartasParesAleatorios);  

// Distribuir os pares de acordo com cada img

frente.forEach((img, indice) => {
    img.setAttribute('src', `img/${cartasParesAleatorios[indice]}.png`);
}) 

// CLIQUE E GIRAR DE CARTA

frutas.forEach(fruta => {    
    fruta.addEventListener('click', () => {        
        // Adiciona a classe 'girar' apenas ao elemento clicado
        fruta.classList.add('girar');

        if (!timerInterval) {
            timerInterval = setInterval(() => {
                seconds++;
                const minutes = Math.floor(seconds / 60);
                const secs = seconds % 60;
                cronometro.textContent = `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
            }, 1000);
        }
    });
});

botaoReset.addEventListener('click', function reiniciar() {
    
    clearInterval(timerInterval); // para o cronômetro
    timerInterval = null; // redefine o intervalo para null
    seconds = 0; // zera os segundos
    cronometro.textContent = '00:00'; // reseta a exibição do cronômetro

    // Remove a classe 'girar' de todos os cards
    frutas.forEach(fruta => {
        fruta.classList.remove('girar');
    });
    
})

// Pra amanhã: Criar uma função que verifica as duas primeiras imagens clicadas:
// Se forem iguais, elas ficarão permanentemente viradas: 
// Senão, elas vão reverter e voltar a ficar escondidas de novo. 


