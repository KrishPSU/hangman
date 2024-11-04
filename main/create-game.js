socket = io()

const main_elem = document.querySelector('.main');
const create_game_elem = document.querySelector('.create-game');

const create_game_button = document.getElementById("create-game");
const join_code_elem = document.getElementById("join-code");
const waiting_elem = document.getElementById("waiting");
const start_game_btn = document.getElementById("start-game");
const get_item_elem = document.querySelector('.get-item');
const item_to_guess = document.getElementById('item_to_guess');
const submit_item_btn = document.getElementById('submit-item');


let randCode = "";

create_game_button.addEventListener('click', () => {
    randCode = Math.floor(Math. random() * (999999 - 100000 + 1)) + 100000;
    get_item_elem.style.display = "block";
    join_game_elem.style.display = "none";
});



submit_item_btn.addEventListener('click', () => {
    let word = item_to_guess.value.trim();
    get_item_elem.style.display = "none";
    socket.emit('create-game', randCode, word);
    main_elem.style.display = "none";
    create_game_elem.style.display = "block";
    join_code_elem.innerText = `Join code: ${randCode}`;
});



socket.on('player-joined', () => {
    waiting_elem.style.display = "none";
    start_game_btn.style.display = "block";
});