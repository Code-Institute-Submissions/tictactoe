const defaultBoard = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9]
    ];

//Assume user goes first
//objects: user + computer OR 2 instances of player. Stats object
// user true, computer false. (boolean)


function startGame() { 
    var user = true;
    displayBoard(defaultBoard);
    choseWhere(user, defaultBoard); // calls updateBoard which returns board.
}

function displayBoard(boardArr) {
    console.log(
        boardArr[0][0] + " " + boardArr[0][1] + " " + boardArr[0][2] + "\n" +
        boardArr[1][0] + " " + boardArr[1][1] + " " + boardArr[1][2] + "\n" +
        boardArr[2][0] + " " + boardArr[2][1] + " " + boardArr[2][2])
    return boardArr;
}

function resetBoard() {
    let boardArr = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9]
    ];
    return boardArr;
}

function choseWhere(player, boardState) {
    // Ask user where they want to place their next move (1-9).
    // return error if !1-9 or if space already taken.
    // call edit board state.
    $("#user-instruction").html("Please pick a space 1 - 9 that hasn 't already been taken.")

    document.getElementById("user-move").addEventListener("click",function(){
        var move= document.getElementById("space-number").value;;
        updateBoard(move,player,boardState);
    });
}

function updateBoard(move,player,board){
    console.log("You have chosen to place your marker on square number "+move+"."); 
    var coordinates = [];
    switch(move){
        case('1'): 
            coordinates = [0,0];    // coordinates of where the marker goes to be decided if 'O' or 'X'.
            break;
        case('2'): 
            coordinates = [0,1];
            break;
        case('3'): 
            coordinates = [0,2];
            break;
        case('4'): 
            coordinates = [1,0];
            break;
        case('5'): 
            coordinates = [1,1];
            break;
        case('6'): 
            coordinates = [1,2];
            break;
        case('7'): 
            coordinates = [2,0];
            break;
        case('8'): 
            coordinates = [2,1];
            break;
        case('9'): 
            coordinates = [2,2];
            break;
        default:
            console.log("No move detected.");
    }
    console.log(player)
    if (player ===true) board[coordinates[0]][coordinates[1]]='X';
    else board[coordinates[0]][coordinates[1]]='O';
    // number of moves updated
    displayBoard(board);
    //check status of board, if (no winner && no spaces left) || winner -> game over else
    alternatePlayer(player);
    return board;
}
function isGameOver(board){
    for (i=0; i<boardState.length;i++){     // row
        for (j=0; j<boardState[i].length;j++){      // col
        }
    }
}
function alternatePlayer(currentPlayer){
    var nextPlayer= !currentPlayer;
    console.log("Player has now changed from "+currentPlayer+" to "+nextPlayer+".")
    return nextPlayer;
}