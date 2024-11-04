const express = require("express");
const socket = require("socket.io");

const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", express.static(__dirname + "/main/"));


const server = app.listen(process.env.PORT || 3000, () => {
	console.log(`Server running on port: ${process.env.PORT || 3000}`);
});

var io = socket(server);

let newGame = {
    hostId: "",
    guestId: "",
    word: "",
    guesses_left: 10, // Head, body, arm(2x), leg(2x), eye(2x), nose, mouth
    join_code: ""
}

io.on("connection", function (socket) {

    console.log(`Socket id: ${socket.id}`);
    
    socket.on('create-game', (joinCode, word) => {
        newGame = {
            hostId: socket.id,
            guestId: "",
            word: word.toUpperCase(),
            guesses_left: 10, // Head, body, arm(2x), leg(2x), eye(2x), nose, mouth
            join_code: joinCode
        }
    });


    socket.on('join-game', code => {
        if (newGame.join_code == code.trim()) {
            newGame.guestId = socket.id;
            socket.emit('valid-code');
            io.to(newGame.hostId).emit('player-joined');
        }
    });




    function getDashes() {
        word_array = []
        for (let i=0; i<newGame.word.length; i++) {
            if (newGame.word.charAt(i) == " ") {
                word_array[i] = " | ";
            } else {
                word_array[i] = "_";
            }
        }
        return word_array;
    }


    socket.on('game-started', () => {
        io.to(newGame.guestId).emit('game-started', getDashes());
        io.to(newGame.hostId).emit('host-game-started', newGame.word);
    });

    


    socket.on('check-letter', (letter) => {
        if (newGame.word.includes(letter)) {
            let indexes = [];
            for (let i = 0; i < newGame.word.length; i++) {
                if (newGame.word[i] === letter) {
                    indexes.push(i);
                }
            }
            socket.emit('letter-found', letter, indexes);
            io.to(newGame.hostId).emit('host-letter-found', letter);
        } else {
            newGame.guesses_left -= 1;
            if (newGame.guesses_left == 0) {
                io.to(newGame.hostId).emit('game-over', "WIN");
                io.to(newGame.guestId).emit('game-over', "LOSS");
            }
            socket.emit('letter-not-found', newGame.guesses_left);
            io.to(newGame.hostId).emit('host-letter-not-found', letter, newGame.guesses_left);
        }
    });



    socket.on('game-over-host-lost', () => {
        io.to(newGame.hostId).emit('game-over', "LOSS");
        io.to(newGame.guestId).emit('game-over', "WIN");
    });

});