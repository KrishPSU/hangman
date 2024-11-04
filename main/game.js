

const game_elem = document.querySelector('.game');
const letters_wrapper_elem = document.querySelector('.letters');
const letters_elems = document.querySelectorAll('.letter');
const dashes_elem = document.getElementById("dashes");
const guesses_left_elem = document.getElementById("guesses_left");
const winner_elem = document.querySelector('.winner');
const loser_elem = document.querySelector('.loser');
const end_game_elem = document.querySelector('.end_game');
const returnToMenu_button = document.getElementById("back-to-menu");
const correct_item = document.getElementById('correct-item');
const letters_guessed_elem = document.getElementById('letters_guessed');


let word = [];
let letters_guessed = "";


start_game_btn.addEventListener('click', () => {
    socket.emit('game-started');
    game_elem.style.display = "block";
    create_game_elem.style.display = "none";
});



function startGame(dashes) {
    game_elem.style.display = "block";
    waiting_for_host.style.display = "none";
    letters_wrapper_elem.style.display = "block";
    let dashes_str = "";
    word = dashes;
    for (let i=0 ;i<dashes.length; i++) {
        dashes_str += (dashes[i] + " ");
    } 
    console.log(dashes_str);
    dashes_elem.innerHTML = dashes_str;    
}


socket.on('game-started', (dashes) => {
    startGame(dashes);
    console.log(dashes);
});



socket.on('host-game-started', word => {
    correct_item.innerText = word.toUpperCase();
});

socket.on('host-letter-not-found', (letter, guesses_left) => {
    editHangman();
    if (letters_guessed == "") {
        letters_guessed += `Letters guessed wrong: ${letter}`;
    } else {
        letters_guessed += `, ${letter}`;
    }
    guesses_left_elem.innerText = `Guesses left: ${guesses_left}`;
    letters_guessed_elem.innerText = letters_guessed;
});
socket.on('host-letter-found', (letter) => {
    var word_elem = "";
    word = correct_item.innerHTML;
    for (let i=0; i<word.length; i++) {
        if (word.charAt(i) == letter) {
            word_elem += `<span class="correctly_guessed">${letter.toUpperCase()}</span>`;
        }
         else {
            word_elem += word[i];
        }
    } 
    correct_item.innerHTML = word_elem;
});




letters_elems.forEach((letter) => {
    letter.addEventListener('click', () => {
        console.log(letter.innerText);
        socket.emit('check-letter', letter.innerText.toUpperCase());
        letter.disabled = true;
    });
});




function gameOver(condition) {
    game_elem.style.display = "none";
    if (condition == "WIN") {
        winner_elem.style.display = "block";
    } else if (condition == "LOSS") {
        loser_elem.style.display = "block"
    }
    end_game_elem.style.display = "block";
}


function update_word() {
    let wordStr = "";
    for (let j=0; j<word.length; j++) {
        wordStr += word[j] + " ";
    }
    dashes_elem.innerHTML = wordStr
    if (!wordStr.includes("_")) {
        gameOver("WIN");
        socket.emit('game-over-host-lost');
    }
}


socket.on('letter-found', (letter, indexes) => {
    for (let i=0; i<indexes.length; i++) {
        word[indexes[i]] = letter;
        console.log(word);
    }
    update_word();
});


socket.on('letter-not-found', (guesses_left) => {
    editHangman();
    guesses_left_elem.innerText = `Guesses left: ${guesses_left}`;
});



socket.on('game-over', (condition) => {
    gameOver(condition);
})



returnToMenu_button.addEventListener('click', () => {
    winner_elem.style.display = "none";
    loser_elem.style.display = "none";
    end_game_elem.style.display = "none";
    main_elem.style.display = "block";
    item_to_guess.value = "";
    code_input.value = "";
    letters_guessed_elem.innerText = "Letters guessed wrong: ";
    guesses_left_elem.innerText = `Guesses left: ${guesses}`;
});