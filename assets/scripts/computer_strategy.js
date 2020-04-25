//board state is passed to computer
//logic is used to determine best next move 
//use updateBoard function is called.

function displayBoard(boardArr) {

    console.log(
        boardArr[0][0] + " " + boardArr[0][1] + " " + boardArr[0][2] + "\n" +
        boardArr[1][0] + " " + boardArr[1][1] + " " + boardArr[1][2] + "\n" +
        boardArr[2][0] + " " + boardArr[2][1] + " " + boardArr[2][2])
    return boardArr;
}

function updateBoard(move,player,board){ 
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
    //check status of board, if (no winner && no spaces left) || winner -> game over else
    return board;
}

function alternatePlayer(currentPlayer){
    var nextPlayer= (currentPlayer==='computer')? 'user':'computer';
    console.log("Player has now changed from "+currentPlayer+" to "+nextPlayer+".")
    return nextPlayer;
}

var board1 = [
    [1, 2, 3],
    ['X', 5, 6],
    [7, 8, 9]
] ;

computerChoseWhere(board1);

function computerChoseWhere(boardState) {
    var player= 'computer';
       
    // Starting decision branch
    // copy boardState to avoid altering actual state. Purely for decision making abilities.
    var copyBoardState = [[]];
    for(i=0 ; i<boardState.length ; i++){
        for(j=0 ; j<boardState[i].length ; j++){
            copyBoardState[i]=boardState[i].slice();
        }
    }

    while (hasSpacesRemainingTwoD(copyBoardState)){ 
        var bestMove = completeLine(copyBoardState);
            bestMove = bestMove? bestMove:maxMove(copyBoardState); // determines if there's a line to complete or not. Then if not it picks space w/ maximal line oppurtunities.
        
        updateBoard(bestMove,player,copyBoardState);
    
        player=alternatePlayer(player);
        console.log(player)
        //Each player uses same strategy.
    }
    // loop through previous 2 steps - after 5 total moves -> check if (check winner)-> else if(check spaces left) else -> draw. 
    // 3 outcomes game over - count total moves and note outcome win/lose/draw (assign Markov state), or continue playing.
    // iterate through each branch result - branch with highest Markov state and shortest number of moves is selected. 
}

function containsNumberOf(element,array,number){  // determines whether line contains 3 'X's or 'O's, NOT for diagonals!
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
    
    console.log('completeLine entered\n\tNew iteration: ')
    //Scan each row/column for two of same character on a line. MUST include space as well!
    for (i=0; i<board.length; i++){
        if( ( containsNumberOf('X',board[i],2) && hasSpacesRemainingOneD(board[i]) ) || ( containsNumberOf('O',board[i],2) && hasSpacesRemainingOneD(board[i]) ) ){
            coordLineGap[0]= i;
            coordLineGap[1]=hasSpacesRemainingOneD(board[i]);
            console.log('\t\tCOORDINATES on ROW are ' + coordLineGap[0] + ' , ' + coordLineGap[1] + '.')
        }    
    }
    
    board=board[0].map( (col, i) => board.map(row => row[i]) );    //        Transpose board to scan columns more easily.
    
    for (j=0; j<board.length; j++){
        if( ( containsNumberOf('X',board[j],2) && hasSpacesRemainingOneD(board[j]) ) || ( containsNumberOf('O',board[j],2) && hasSpacesRemainingOneD(board[j]) ) ) {    /***************This Line causing problem!!!! overwriting other marker */
            coordLineGap[0] = hasSpacesRemainingOneD(board[j]);
            coordLineGap[1] = j;
            console.log('COORDINATES on COLUMN are ' + coordLineGap[0] + ' , ' + coordLineGap[1] + '.')
        }   
    }
    
    board=board[0].map( (row, j) => board.map(col => col[j]) );  //        Undo earlier board transposition.   
    
    if (coordLineGap.length<2) return false;
    else return coordToMove(coordLineGap);   
    //scan diagonals
}


function maxMove(board){
    // Iterate through boardState array check available spaces and then check which available space has max output on strategyArray.
    console.log('maxMove entered: ')
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