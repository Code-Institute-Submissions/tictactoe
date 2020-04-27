//import {winner, containsNumberOf} from 'modules/winner.js';

const defaultBoard = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9]
    ];

//Assume user goes first
//objects: user + computer OR 2 instances of player. Stats object
// user true, computer false. (boolean)


function startGame() { 
    var newBoard=resetBoard();
    var player = 'user';
    setTimeout(displayBoard(newBoard),2000);
    userChose(player, newBoard);
}

function flowControl(boardState,player){
    if (winner(boardState)!='No winner') console.log ( winner(boardState) );
    else if (hasSpacesRemainingTwoD(boardState)) {
        console.log('flowControl entered!')
        //continue game --> change players.
        var nextPlayer= (player==='computer')? 'user':'computer';
        console.log("Player has now changed from "+player+" to "+nextPlayer+".")
        if (nextPlayer === 'user') {
            console.log("User's turn.")
            $("#user-instruction").html("It's your turn.");
            userChose(nextPlayer,boardState);
        } else {
            console.log("Computer's turn.")
            $("#user-instruction").html("Computer's turn.");
            computerChose(nextPlayer,boardState);
        }      
    } else // draw 
    console.log ( "It's a draw!" );  
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


function userChose(player, boardState) {
    // return error if !1-9 or if space already taken.
    $("#user-instruction").html("Please pick a space 1 - 9 that hasn 't already been taken.")
    let um = $("#user-move");
    let umClone = um.clone();  // insert copy of button and remove original to get rid of old Listener events attached to the element.
    um.remove();
    umClone.appendTo("#move-area");
    umClone.click(function(){
        var move= document.getElementById("space-number").value;
        updateBoard(move,player,boardState);
    });
}

function updateBoard(move,player,board){    //shared with gameFlow.js
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
    
     console.log(player + " now moves to square number "+move+".")
    if (player ==='user') board[coordinates[0]][coordinates[1]]='X';
    else board[coordinates[0]][coordinates[1]]='O';
    // number of moves updated
    displayBoard(board);
    
    return flowControl(board,player);
}

function computerChose(player, boardState) {
    console.log('computerChose entered.')
    var bestMove = completeLine(boardState);
    bestMove = bestMove? bestMove:maxMove(boardState); // determines if there's a line to complete or not. Then if not it picks space w/ maximal line oppurtunities.     
    updateBoard(bestMove,player,boardState);
    //Each player uses same strategy.        
}

function containsNumberOf(element,array,number){        // shared with winner.js 
     // determines whether line contains 3 'X's or 'O's, NOT for diagonals!
    var sameLine=[];
    var i;
    if(array){
        i=array.indexOf(element);
        while (i!=-1) {
            sameLine.push(i);
            i=array.indexOf(element,i+1);
        }
        if(sameLine.length === number) return true;
    }
    else return false;
}

function completeLine(board) {
    var coordLineGap = [];  // missing coordinates of marker required to complete line (defensively or offensively)
    //Scan each row/column for two of same character on a line. MUST include space as well!
    for (i=0; i<board.length; i++){
        if( ( containsNumberOf('X',board[i],2) && hasSpacesRemainingOneD(board[i]) ) || ( containsNumberOf('O',board[i],2) && hasSpacesRemainingOneD(board[i]) ) ){
            coordLineGap[0]= i;
            coordLineGap[1]=hasSpacesRemainingOneD(board[i]);
            //console.log('\t\tCOORDINATES on ROW are ' + coordLineGap[0] + ' , ' + coordLineGap[1] + '.')
        }    
    }
    
    board=board[0].map( (col, i) => board.map(row => row[i]) );    //        Transpose board to scan columns more easily.
    
    for (j=0; j<board.length; j++){
        if( ( containsNumberOf('X',board[j],2) && hasSpacesRemainingOneD(board[j]) ) || ( containsNumberOf('O',board[j],2) && hasSpacesRemainingOneD(board[j]) ) ) {    /***************This Line causing problem!!!! overwriting other marker */
            coordLineGap[0] = hasSpacesRemainingOneD(board[j]);
            coordLineGap[1] = j;
            //console.log('COORDINATES on COLUMN are ' + coordLineGap[0] + ' , ' + coordLineGap[1] + '.')
        }   
    }
    
    board=board[0].map( (row, j) => board.map(col => col[j]) );  //        Undo earlier board transposition.   
    
    if (coordLineGap.length<2) return false;
    else return coordToMove(coordLineGap);   
    //scan diagonals
}


function maxMove(board){
    // Iterate through boardState array check available spaces and then check which available space has max output on strategyArray.
    let strategyArray = [
        [3, 2, 3],
        [2, 4, 2],
        [3, 2, 3]
    ];
    var max=0;
    var move=0;
    var maxMove=0;
    for(i=0 ; i<board.length ; i++){
        for(j=0 ; j<board[i].length ; j++){
            move++;
            if (board[i][j]!='X' && board[i][j]!= 'O'){
                if (strategyArray[i][j]>max){       // determine max strategy space
                    max = strategyArray[i][j];
                    maxMove = move; 
                }
            }
        }
    }
    return maxMove.toString()
}

function hasSpacesRemainingTwoD(board) {
    for(let i=0 ; i<board.length ; i++){
        for(j=0 ; j<board[i].length ; j++){
            if (board[i][j]!='X' && board[i][j]!='O'){
                return true;
            }
        }
    }
    return false;
}
function hasSpacesRemainingOneD(array){
    for (let i=0; i<array.length; i++){
        if (typeof(array[i])=== 'number') return i;
    }
    return false;
}

function coordToMove(coords){  
    // takes coordinates in [i,j] form and converts them to string [1-9] move on 3X3 board. 
    var move = 0;   
    for (i=0; i<3; i++){
        for (j=0;j<3;j++){
            move++;
            if (coords[0]===i && coords[1]===j) return move.toString();
        }
    }
    return move.toString();
}

function winner(boardState) {
    i = 0;
    xCount = 0;
    oCount = 0;
    result = '';
    xRowCoordinates= [];
    xColCoordinates= [];
    oRowCoordinates= [];
    oColCoordinates= [];
    for (i=0; i<boardState.length;i++){     // row
        for (j=0; j<boardState[i].length;j++){      // col
            if (boardState[i][j]==='X'){
                xCount+=1;
                xRowCoordinates.push(i);
                xColCoordinates.push(j);
            }  
            else if (boardState[i][j]==='O'){
                 oCount+=1;
                 oRowCoordinates.push(i);
                 oColCoordinates.push(j);
            }
        }
    }
   
    if( containsNumberOf(0,xRowCoordinates,3) || containsNumberOf(1,xRowCoordinates,3) || containsNumberOf(2,xRowCoordinates,3) ||
    containsNumberOf(0,xColCoordinates,3) || containsNumberOf(1,xColCoordinates,3) || containsNumberOf(2,xColCoordinates,3) || containsDiagonalThree(xRowCoordinates,xColCoordinates) ) {
        result = 'X is winner!';
    } else if ( containsNumberOf(0,oRowCoordinates,3) || containsNumberOf(1,oRowCoordinates,3) || containsNumberOf(2,oRowCoordinates,3) ||
    containsNumberOf(0,oColCoordinates,3) || containsNumberOf(1,oColCoordinates,3) || containsNumberOf(2,oColCoordinates,3) || containsDiagonalThree(oRowCoordinates,oColCoordinates) ) {
        result = 'O is winner!';
    } else result = 'No winner';

    return result;
    console.log("X row coordinates are "+xRowCoordinates+"\nX col coordinates are "+xColCoordinates+
            "\nO row coordinates are "+oRowCoordinates+"\nO col coordinates are "+oColCoordinates+" .");
}


function containsDiagonalThree(array1,array2){
    // top left to bottom right.
    counter=0;
    for(i=0;i<array1.length;i++){
        if(array1[i]===array2[i]) counter++;
    }
    if (counter>2) return true;     
    // top right to bottom left.
    counter=0;
    for(i=0;i<array1.length;i++){
        if(array1[i]+array2[i]===2) counter++;
    }
    if (counter>2) return true; 
    return false;
}
