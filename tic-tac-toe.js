let boxes = document.querySelectorAll(".box");
let reset = document.querySelector(".reset");
let turno = true; // player x, player o
let newBtn = document.querySelector(".new");
let msg = document.querySelector(".msg");
let winMsg = document.querySelector(".win");
let count = 0; // to track draw
   
const winPatterns = [
    [0, 1, 2], [0, 3, 6], [0, 4, 8], [1, 4, 7], [2, 5, 8], [2, 4, 6], [3, 4, 5], [6, 7, 8]
];

const resetGame = () => {
    turno = true;
    ennBoxes();
    msg.classList.add("hide");
};

const disBoxes = () => {
    for(let box of boxes) {
        box.disabled = true;
    }
};

const ennBoxes = () => {
    for(let box of boxes) {
        box.disabled = false;
        box.innerHTML = "";
    }
};

const gameDraw = () => {
    winMsg.innerHTML = `Game is a Draw`;
    msg.classList.remove("hide");
    disBoxes ();
};

const showWinner = (winner) => {
    winMsg.innerHTML = `Congratulations, Winner is ${winner}`;
    msg.classList.remove("hide");
    disBoxes ();
};

const checkWinner = () => {
    for(pattern of winPatterns) {
        let pos1Val = boxes[pattern[0]].innerHTML;
        let pos2Val = boxes[pattern[1]].innerHTML;
        let pos3Val = boxes[pattern[2]].innerHTML;

        if(pos1Val != "" && pos2Val != "" && pos3Val != "") {
            if(pos1Val === pos2Val && pos2Val === pos3Val) {
                showWinner(pos1Val);
            }
        }
    }
};

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        console.log("box is clicked");
        if(turno) {
            box.innerHTML = "o";
            turno = false;
        } else {
            box.innerHTML = "x";
            turno = true;
        }
        box.disabled = true;
        count++;

        let isWinner = checkWinner();

        if(count === 9 && !isWinner) {
            gameDraw();
        };
    });
});

newBtn.addEventListener("click", resetGame);
reset.addEventListener("click", resetGame);
