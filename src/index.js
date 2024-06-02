const readlineSync = require('readline-sync');

prompt = readlineSync.question;
// Characters

const mario = {
    NAME : "Mario",
    VELOCIDADE: 4,
    MANOBRABILIDADE: 3,
    PODER: 3,
    
}

const luigi = {
    NAME : "Luigi",
    VELOCIDADE: 3,
    MANOBRABILIDADE: 4,
    PODER: 4,
    
}

const peach = {
    NAME : "Peach",
    VELOCIDADE: 3,
    MANOBRABILIDADE: 4,
    PODER: 2,
}

const bowser = {
    NAME : "Bowser",
    VELOCIDADE: 5,
    MANOBRABILIDADE: 2,
    PODER: 5,
}

const yoshi = {
    NAME : "Yoshi",
    VELOCIDADE: 2,
    MANOBRABILIDADE: 4,
    PODER: 3,
}
const donkeyKong = {
    NAME : "Donkey Kong",
    VELOCIDADE: 2,
    MANOBRABILIDADE: 2,
    PODER: 5,
}

// Dice

const dice = {
    roll: function() {
        return Math.floor(Math.random() * 6) + 1;
    }
}

// Players
let player1 = {};
let player2 = {};

// Select Character

function chooseCharacter(playerNumber) {
    console.log(`🕹️ Bem-Vindo Jogador🕹️`)
    let chosenCharacter = prompt(`Jogador ${playerNumber}, escolha seu personagem: Mario, Luigi, Peach, Bowser, Yoshi, Donkey Kong:`);
    let character;

    switch(chosenCharacter.toLowerCase()) {
        case "mario":
            character = mario;
            break;
        case "luigi":
            character = luigi;
            break;
        case "peach":
            character = peach;
            break;
        case "bowser":
            character = bowser;
            break;
        case "yoshi":
            character = yoshi;
            break;
        case "donkey kong":
            character = donkeyKong;
            break;
        default:
            console.log("Personagem não encontrado. Por favor, escolha um personagem válido.");
            return chooseCharacter(playerNumber);
    }
    character.pontos = 0; // Add points property to the character
    return character;
}

player1 = chooseCharacter(1);
player2 = chooseCharacter(2);

// Blocks
function block(blockName) {
    if (blockName.toLowerCase() === "reta") {
        let diceRoll1 = dice.roll();
        let diceRoll2 = dice.roll();
        let player1Score = player1.VELOCIDADE + diceRoll1;
        let player2Score = player2.VELOCIDADE + diceRoll2;

        console.log(`A velocidade de ${player1.NAME} é ${player1.VELOCIDADE} + 🎲: ${diceRoll1} Resultado: ${player1Score}`);
        console.log(`A velocidade de ${player2.NAME} é ${player2.VELOCIDADE} + 🎲: ${diceRoll2} Resultado: ${player2Score}`);

        if (player1Score > player2Score) {
            player1.pontos += 1;
            console.log(`Jogador 1 ganha 1 ponto. Pontuação atual: ${player1.pontos}`);
        } else if (player2Score > player1Score) {
            player2.pontos += 1;
            console.log(`Jogador 2 ganha 1 ponto. Pontuação atual: ${player2.pontos}`);
        } else {
            console.log("Empate! Nenhum jogador ganha pontos.");
        }
    }
    else if (blockName.toLowerCase() === "curva") {
        let diceRoll1 = dice.roll();
        let diceRoll2 = dice.roll();
        let player1Score = player1.MANOBRABILIDADE + diceRoll1;
        let player2Score = player2.MANOBRABILIDADE + diceRoll2;

        console.log(`A manobrabilidade de ${player1.NAME} é ${player1.MANOBRABILIDADE} + 🎲: ${diceRoll1} Resultado: ${player1Score}`);
        console.log(`A manobrabilidade de ${player2.NAME} é ${player2.MANOBRABILIDADE} + 🎲: ${diceRoll2} Resultado: ${player2Score}`);

        if (player1Score > player2Score) {
            player1.pontos += 1;
            console.log(`Jogador 1 ganha 1 ponto. Pontuação atual: ${player1.pontos}`);
        } else if (player2Score > player1Score) {
            player2.pontos += 1;
            console.log(`Jogador 2 ganha 1 ponto. Pontuação atual: ${player2.pontos}`);
        } else {
            console.log("Empate! Nenhum jogador ganha pontos.");
        }
    }
    else if (blockName.toLowerCase() === "confronto") {
        let diceRoll1 = dice.roll();
        let diceRoll2 = dice.roll();
        let player1Score = player1.PODER + diceRoll1;
        let player2Score = player2.PODER + diceRoll2;

        console.log(`O poder de ${player1.NAME} é ${player1.PODER} + 🎲: ${diceRoll1} Resultado: ${player1Score}`);
        console.log(`O poder de ${player2.NAME} é ${player2.PODER} + 🎲: ${diceRoll2} Resultado: ${player2Score}`);

        if (player1Score > player2Score) {
            if (player2.pontos > 0) {
                player2.pontos -= 1;
            }
            console.log(`Jogador 2 perde 1 ponto. Pontuação atual: ${player2.pontos}`);
        } else if (player2Score > player1Score) {
            if (player1.pontos > 0) {
                player1.pontos -= 1;
            }
            console.log(`Jogador 1 perde 1 ponto. Pontuação atual: ${player1.pontos}`);
        } else {
            console.log("Empate! Nenhum jogador perde pontos.");
        }
    }
    else {
        console.log("Bloco não encontrado. Por favor, escolha um bloco válido.");
    }
}

let blocks = ["reta", "curva", "confronto"];

// rounds
function round() {
    let i = 0;
    function nextRound() {
        if (i < 5) {
            console.log(`\n🏁 ROUND ${i+1} 🏁\n`);
            let blockName = blocks[Math.floor(Math.random() * blocks.length)];
            console.log(`Bloco atual: ${blockName.toUpperCase()}`);
            block(blockName);
            i++;
            setTimeout(nextRound, 2000); // Wait for 2 seconds before the next round
        }
    }
    nextRound();
}

// Game
function game() {
    console.log("\n🎮 INICIANDO O JOGO 🎮\n");
    round();
    setTimeout(() => {
        console.log("\n🏆 RESULTADO FINAL 🏆\n");
        if (player1.pontos > player2.pontos) {
            console.log(`Jogador 1 venceu com ${player1.pontos} pontos!`);
        } else if (player2.pontos > player1.pontos) {
            console.log(`Jogador 2 venceu com ${player2.pontos} pontos!`);
        } else {
            console.log("Empate!");
        }
    }, 2000 * 5); // Wait for the rounds to finish
}

game();


