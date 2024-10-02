const cronometro = document.getElementById('cronometro');
const cartas = ['abacaxi', 'banana', 'limao', 'maca', 'mamao', 'melancia', 'pera', 'uva'];
const container = document.getElementById('container');
const frutas = document.querySelectorAll('.fruta'); 
const frente = document.querySelectorAll('.frentecarta'); 
const botaoReset = document.querySelector('#restart');
const vitoria = document.querySelector('#vitoria');

let cliques = 0; 
let paresFeitos = 0;
let timerInterval;
let seconds = 0;
let cartaVirada;
let imagemVirada = [];
let foiEscolhida;
let cartasEscolhidas = [];
let cartasCorretas = [];
let primeiraCarta = null;
let segundaCarta = null;


// Gerar as cartas aleatoriamente (FUNCIONANDO) -----------------------------------------------------------------------------

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

// CLIQUE E GIRAR DE CARTA --------------------------------------------------------------------------------------
frutas.forEach(fruta => {    
    fruta.addEventListener('click', () => { // If/Else pra que apenas cliques em cards não virados contem.
        if (fruta.classList.contains('girar') || fruta.classList.contains('corretas')) {
            return;
        } else {
            cliques++;
        }               
         
        console.log(cliques); //Contador de cliques:
        fruta.classList.add('girar'); // Adiciona a classe 'girar' apenas ao elemento clicado

        cartaVirada = document.getElementsByClassName('girar');
        cartasEscolhidas = Array.from(cartaVirada);
        imagemVirada = document.querySelectorAll('.girar .frente .frentecarta');
        
        //Verificação das cartas
        if (cliques === 2) {
            console.log(imagemVirada[1].getAttribute('src'));

            frutas.forEach(clique => clique.style.pointerEvents = 'none');
            botaoReset.style.pointerEvents = 'none';
            cliques = 0;

            if (imagemVirada[0].getAttribute('src') === imagemVirada[1].getAttribute('src')) {
                console.log('As cartas são iguais, faça com que fiquem viradas pelo resto do jogo');
                cartasEscolhidas.forEach(carta => carta.classList.add('corretas'));
                paresFeitos++;
                frutas.forEach(clique => clique.style.pointerEvents = 'auto');
                botaoReset.style.pointerEvents = 'auto';
    
            } else {
                console.log('As cartas são diferentes, vire de volta!');
                setTimeout(() => {
                    cartasEscolhidas.forEach(carta => carta.classList.remove('girar'));
                    frutas.forEach(clique => clique.style.pointerEvents = 'auto');  
                    botaoReset.style.pointerEvents = 'auto';
                }, 1500);
            }
            console.log(cliques); // Apagar quando estiver concluído. 
            imagemVirada = [];
            console.log(imagemVirada);

            console.log(`Pares feitos: ${paresFeitos}`);
            if (paresFeitos === 8) {
                vitoria.style.display = 'block';
                cronometro.style.color = 'red';
                clearInterval(timerInterval);
            }
        }

        // Iniciar o cronômetro
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
    vitoria.style.display = 'none'; // Remove a exibição do texto "Vitória"
    // Remove a classe 'girar' de todos os cards
    frutas.forEach(fruta => {
        fruta.classList.remove('girar');
        //fruta.classList.remove('foiescolhida');
        fruta.classList.remove('corretas');
    });

    cliques = 0;
    paresFeitos = 0;
    // Pares gerados aleatoriamente
    const cartasParesAleatorios = gerarParesAleatorios(cartas);
    console.log(cartasParesAleatorios);  
    // Distribuir os pares de acordo com cada img
    frente.forEach((img, indice) => {
    img.setAttribute('src', `img/${cartasParesAleatorios[indice]}.png`);
    }) 
    
})

// Pra amanhã: Criar uma função que verifica as duas primeiras imagens clicadas:
// Se forem iguais, elas ficarão permanentemente viradas: 
// Senão, elas vão reverter e voltar a ficar escondidas de novo. 


