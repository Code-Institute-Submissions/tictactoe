//console.log(minimax())
/*  123 
    456
    789     
*/

//Assume user goes first

function startGame() {
    var board = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9]
    ];
    displayBoard(board);
    choseWhere(board);
}

function displayBoard(boardArr) {

    console.log(
        boardArr[0][0] + " " + boardArr[0][1] + " " + boardArr[0][2] + "\n" +
        boardArr[1][0] + " " + boardArr[1][1] + " " + boardArr[1][2] + "\n" +
        boardArr[2][0] + " " + boardArr[2][1] + " " + boardArr[2][2])
    return boardArr;
}

function resetBoard() {
    var boardArr = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9]
    ];
    return boardArr;
}

function getMove() {
    var move = document.getElementById("space-number").value;
    return move;
  }

function updateBoard(move,player,board){
    console.log("You have chosen to place your marker on square number "+move+".");
  }
function choseWhere(boardState) {
    // Ask user where they want to place their next move (1-9).
    // return error if !1-9 or if space already taken.
    // call edit board state.
    var user = 1;
    $("#user-instruction").html("Please pick a space 1 - 9 that hasn 't already been taken.")

    document.getElementById("user-move").addEventListener("click",function(){
        var move=getMove();
        updateBoard(move,user,boardState);
    });
    //console.log(getMove());
    
}
    