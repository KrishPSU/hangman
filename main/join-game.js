

const join_game_btn = document.getElementById("join-game");
const join_game_elem = document.querySelector('.join-game');
const waiting_for_host = document.querySelector('.waiting-for-host');
const code_input = document.getElementById('code');
const submit_code_btn = document.getElementById("submit-code");


join_game_btn.addEventListener('click', () => {
    // main_elem.style.display = "none";
    get_item_elem.style.display = "none";
    join_game_elem.style.display = "block";
});

submit_code_btn.addEventListener('click', () => {
    socket.emit('join-game', code_input.value);
});

socket.on('valid-code', () => {
    waiting_for_host.style.display = "block";
    join_game_elem.style.display = "none";
    main_elem.style.display = "none";
})