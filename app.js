// Selecting elements
let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#res-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let aiBtn = document.querySelector("#ai-btn");
let friendsBtn = document.querySelector("#friends-btn"); // New button

// Global variable to track the turn
let isPlayerTurn = true; // Player X starts first
let isPlayingAgainstAI = false; // Track if the game is against AI

// Winning patterns
const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];

// Function to reset the game
const resetGame = () => {
    isPlayerTurn = true;
    enableBoxes();
    msgContainer.classList.add("hide");
};

// Event listener for each box
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (box.innerText === "") {
            if (isPlayingAgainstAI && !isPlayerTurn) {
                box.innerText = "X"; // Player X
            } else {
                box.innerText = isPlayerTurn ? "X" : "O"; // Alternate between X and O for two players
            }
            isPlayerTurn = !isPlayerTurn;

            // Check if there's a winner after the move
            checkWinner();

            // If the game is against AI and it's not over, let AI make a move
            if (isPlayingAgainstAI && !isPlayerTurn) {
                aiMove();
                checkWinner();
            }
        }
    });
});


// Function to disable all boxes
const disableBoxes = () => {
    boxes.forEach((box) => {
        box.disabled = true;
    });
};

// Function to enable all boxes
const enableBoxes = () => {
    boxes.forEach((box) => {
        box.disabled = false;
        box.innerText = "";
    });
};

// Function to show the winner
const showWinner = (winner) => {
    msg.innerText = `Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
};

// Function to check for a winner
const checkWinner = () => {
    for (pattern of winPatterns) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if (pos1Val !== "" && pos2Val !== "" && pos3Val !== "") {
            if (pos1Val === pos2Val && pos2Val === pos3Val) {
                showWinner(pos1Val);
            }
        }
    }
};

// Event listener for the New Game button
newGameBtn.addEventListener("click", resetGame);

// Event listener for the Reset button
resetBtn.addEventListener("click", resetGame);

// Event listener for the AI button
aiBtn.addEventListener("click", () => {
    isPlayingAgainstAI = true;
    resetGame();
    enableBoxes();
    msgContainer.classList.add("hide");
    if (!isPlayerTurn) {
        aiMove();
        checkWinner();
    }
});

// Event listener for the Friends button
friendsBtn.addEventListener("click", () => {
    isPlayingAgainstAI = false;
    resetGame();
    enableBoxes();
    msgContainer.classList.add("hide");
});

// Function for AI to make a move
const aiMove = () => {
    // Implement your AI logic here
    // For simplicity, let's just make a random move
    let emptyBoxes = [...boxes].filter((box) => box.innerText === "");
    let randomBox = emptyBoxes[Math.floor(Math.random() * emptyBoxes.length)];
    if (randomBox) {
        randomBox.innerText = "O"; // AI is 'O'
        randomBox.disabled = true;
        isPlayerTurn = true;
    }
};
