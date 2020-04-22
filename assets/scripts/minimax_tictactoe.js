//console.log(minimax())
/*  123 
    456
    789     
*/

//Assume user goes first


var board = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];

function startGame() {
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
}
/*const prompt = require('prompt-sync')({
    sigint: true
});*/

function choseWhere() {
    // Ask user where they want to place their next move (1-9).
    // return error if !1-9 or if space already taken.
    // edit board state.

    var userChoice;
    $("#user-instruction").html("Please pick a space 1 - 9 that hasn 't already been taken.")
    $("#user-move").click(function() {
        userChoice = $("#space-number").val();
        return userChoice;
    })
    console.log(userChoice);
    return userChoice;
} //winning states 8.
//[][], [][], [][]  columns all same value || rows all same value || (row===col && row+col===2