const firstPlayer = localStorage.getItem('first-player');
const markerChosen = localStorage.getItem('marker-chosen');
const board = [
                [1, 2, 3],
                [4, 5, 6],
                [7, 8, 9],
            ];
$(document).ready(function(){
});

function getMarkerOf(player){
    let userMark = markerChosen;
    // default value assigned to userMark if none selected in options menu.
    userMark = (userMark)? userMark: 'X';
    let compMark = (userMark==='X')? 'O':'X';
    if (player==='user')return userMark;
    else return compMark;
}
//Assume user goes first
//objects: user + computer OR 2 instances of player. Stats object
// user true, computer false. (boolean)
function modalControl(currentElement){
    if ($(currentElement).hasClass('close')){
        console.log('close click registered.')
     $("#gameover-msg").css("display","none");
    
    }
    else if(currentElement.id==='play-again') {
        resetBoard();
        $("#gameover-msg").css("display","none");
        startGame();
    } 
    
}

function startGame() {
    let userMark = getMarkerOf('user');
    displayBoard(board);
    $('.board .potential-mark').html(userMark);
    if ($('#start-btn').html()==='start'){
        for(id=1;id<=9;id++){  
            $('#'+id).addClass('active');   // allows spaces to be marked.
            $("#mark"+id).hover( function() { // allow every boardspace to be hovered upon to reveal potential chosen marker.
                $(this).css("transform", "rotateY(180deg)");
            }, function(){
                $(this).css("transform", "rotateY(0deg)");
            });
        }
        //let firstPlayer = $('.first-player-selected').html();
        if (firstPlayer==='computer') computerChose(firstPlayer, board);
        $('#user-instruction').html('The game has started, you can now place your marker.');
        // change to reset button
        $('#start-btn').html('reset');
    } else {
        resetBoard();
    } 
}
function resetBoard(){
    console.log('resetBoard entered .')
    // Make spaces empty & inactive. Remove Hover bindings.
    $(".board div div div").empty();
    for(id=1;id<=9;id++){
        $("#mark"+id).unbind('mouseenter mouseleave');
        $("#"+id).removeClass("active");
    }
    displayBoard(board);
    let s= 0;
    for (i=0; i<board.length; i++){
        for(j=0; j<board[i].length;j++){
            s++;
            board[i][j]=s;
        }
    }
    displayBoard(board);
    
    $('#start-btn').html('start');
    $('#user-instruction').html('After starting the game, you will be able to make your first move.');
}

function makeUserMark(currentElement) { // takes id from element which refers to board space.
    let userMark = getMarkerOf('user');
    let elementId=currentElement.id;    //string 
    if ( $(currentElement).hasClass('active') && $('#user-instruction').html() != "Computer's turn.") {     // second condition may need adjusting -> no "Computer's turn." message anymore. If any element is hoverable
        if ( !$(currentElement).hasClass('active')) {
            $("#user-instruction").html("Cannot move here, this space is already occupied!");
        } else {  
        $(currentElement).find(".space").html(userMark);
        $(currentElement).removeClass('active');
        $(".board").find(".mark").unbind('mouseenter mouseleave');  // turns off hover function for all spaces whilst comp moves.
        $(currentElement).find('.mark').css("transform", "rotateY(720deg)","transition","all 0.2s ease");
        $('#user-instruction').html("");
        updateBoard(elementId,'user',board);    
        }
    }

}

function makeCompMark(move, board) { 
    let compMark = getMarkerOf('computer');
    // Make mark first
    $("#space"+move).html(compMark);
    $("#"+move).removeClass('active');
    for(id=1;id<=9;id++){ 
        if ( $("#space"+id).html()=== '') {
        // After mark is made, hover turns back on for empty spaces.
        $("#mark"+id).hover( function() {     
                    $(this).css("transform", "rotateY(180deg)");
                }, function(){
                    $(this).css("transform", "rotateY(0deg)");
                });
            }
        }
    // except for where the mark is made.
    $("#mark"+move).unbind('mouseenter mouseleave');  
    //update board array for computer's next move.
    updateBoard(move, 'computer', board);    
}

function flowControl(boardState, player) {
    let userMark = getMarkerOf('user');
    // determines winner message if winning state has been reached. 
    if ( winner(boardState) != "No winner"){
        console.log( ' winner result is '+winner(boardState)+' segment of winner is '+winner(boardState).substring(0,1)+'.' );
        // if ( winner(boardState)==="X is winner!" )
        if ( userMark===winner(boardState).substring(0,1) ){
            $("#gameover-msg").find(".modal-body").html("Congratulations, you win.");
            $("#gameover-msg").css("display","block");
        } else {
            $("#gameover-msg").find(".modal-body").html("Sorry, you lose.");
            $("#gameover-msg").css("display","block");
        }
    }
    else if (hasSpacesRemainingTwoD(boardState)) {
        //continue game --> change players.
        var nextPlayer = player === "computer" ? "user" : "computer";
        if (nextPlayer === "user") {
        // notifies user to click on another board space. 
        //This will invoke makeUserMark function and continue the gameFlow cycle.
        } else {
            computerChose(nextPlayer, boardState);
        }
  } // draw
    else {
        console.log("It's a draw!");
        $("#gameover-msg").find(".modal-body").html("It's a draw.");
        $("#gameover-msg").css("display","block");
    }
}

function displayBoard(boardArr) {
  console.log(
    boardArr[0][0] +
      " " +
      boardArr[0][1] +
      " " +
      boardArr[0][2] +
      "\n" +
      boardArr[1][0] +
      " " +
      boardArr[1][1] +
      " " +
      boardArr[1][2] +
      "\n" +
      boardArr[2][0] +
      " " +
      boardArr[2][1] +
      " " +
      boardArr[2][2]
  );
  return boardArr;
}

function updateBoard(move, player, board) {     // move is string
    // coordinates of where the marker goes to be decided if 'O' or 'X'.
    var coordinates = [];
    switch (move) {
        case "1":
        coordinates = [0, 0]; 
        break;
        case "2":
        coordinates = [0, 1];
        break;
        case "3":
        coordinates = [0, 2];
        break;
        case "4":
        coordinates = [1, 0];
        break;
        case "5":
        coordinates = [1, 1];
        break;
        case "6":
        coordinates = [1, 2];
        break;
        case "7":
        coordinates = [2, 0];
        break;
        case "8":
        coordinates = [2, 1];
        break;
        case "9":
        coordinates = [2, 2];
        break;
    }
    if (player === "user") board[coordinates[0]][coordinates[1]] = getMarkerOf('user');
    else board[coordinates[0]][coordinates[1]] = getMarkerOf('computer');
    displayBoard(board);
    return flowControl(board, player);
}

function computerChose(player, boardState) {
  var bestMove = completeLine(boardState);
  // determines if there's a line to complete or not. Then if not it picks space w/ maximal line opportunities.
  bestMove = bestMove ? bestMove : maxMove(boardState); 
  // this move is then marked on board.
  makeCompMark(bestMove, boardState);
}

function containsNumberOf(element, array, number) {
  // determines whether line contains 3 'X's or 'O's, NOT for diagonals.
  let sameLine = [];
  let i;
  if (array) {
    i = array.indexOf(element);
    while (i != -1) {
      sameLine.push(i);
      i = array.indexOf(element, i + 1);
    }
    if (sameLine.length === number) return true;
  } else return false;
}

function copyBoard(boardState) {
  let copyBoardState = [[]];
  for (i = 0; i < boardState.length; i++) {
    for (j = 0; j < boardState[i].length; j++) {
      copyBoardState[i] = boardState[i].slice();
    }
  }
  return copyBoardState;
}

function completeLine(board) {
    // missing coordinates of marker required to complete line (defensively or offensively)
    var coordLineGap = []; 
    //Scan each row and column for two of same character on a line. MUST include space as well!
    for (i = 0; i < board.length; i++) {
        if (
        containsNumberOf("O", board[i], 2) &&
        hasSpacesRemainingOneD(board[i]) > -1
        ) {
        coordLineGap[0] = i;
        coordLineGap[1] = hasSpacesRemainingOneD(board[i]);
        return coordToMove(coordLineGap); //winning line --> assuming 'O' is computer marker.
        } else if (
        containsNumberOf("X", board[i], 2) &&
        hasSpacesRemainingOneD(board[i]) > -1
        ) {
        coordLineGap[0] = i;
        coordLineGap[1] = hasSpacesRemainingOneD(board[i]);
        }
    }

    board = board[0].map((row, i) => board.map((row) => row[i])); //        Transpose board to scan columns more easily.

    for (j = 0; j < board.length; j++) {
        if (
            containsNumberOf("O", board[j], 2) &&
            hasSpacesRemainingOneD(board[j]) > -1
        ) {
            coordLineGap[0] = hasSpacesRemainingOneD(board[j]);
            coordLineGap[1] = j;
            return coordToMove(coordLineGap); // winning line
        } else if (
            containsNumberOf("X", board[j], 2) &&
            hasSpacesRemainingOneD(board[j]) > -1
        ) {
            coordLineGap[0] = hasSpacesRemainingOneD(board[j]);
            coordLineGap[1] = j;
        }
    }
    //  Undo earlier board transposition.
    board = board[0].map((row, j) => board.map((col) => col[j])); 

    //scan diagonals
    let xCounter = 0;
    let oCounter = 0;
    let spaceCounter = 0;
    let m = 0;
    let n = 0;
    for (k = 0; k < board.length; k++) {
        if (board[k][k] === "O") oCounter++;
        if (board[k][k] === "X") xCounter++;
        if (typeof board[k][k] === "number") {
        spaceCounter++;
        m = k;
        n = k;
        }
    }
    // Again searching for line containing 2 of same mark AND a space.
    if (spaceCounter === 1 && (oCounter === 2 || xCounter === 2)) {
        coordLineGap[0] = m;
        coordLineGap[1] = n;
    }
    xCounter = 0;
    oCounter = 0;
    spaceCounter = 0;

    for (i = 0; i < board.length; i++) {
        let j = 2 - i;
        if (board[i][j] === "O") oCounter++;
        if (board[i][j] === "X") xCounter++;
        if (typeof board[i][j] === "number") {
        spaceCounter++;
        m = i;
        n = j;
        }
    }

    if (spaceCounter === 1 && (oCounter === 2 || xCounter === 2)) {
        coordLineGap[0] = m;
        coordLineGap[1] = n;
    }
    // If no conditions above are met then the empty coordinates array wouldn't have been filled. 
    // Therefore there is no line to be completed, yielding a false result.
    if (coordLineGap.length < 2) return false;
    // Line has been found with a space.
    else return coordToMove(coordLineGap);
}

function maxMove(board) {
  // Iterate through boardState array check available spaces and then check which available space has max output on strategyArray.
  let strategyArray = [
    [3, 2, 3],
    [2, 4, 2],
    [3, 2, 3],
  ];
  var max = 0;
  var move = 0;
  var maxMove = 0;
  for (i = 0; i < board.length; i++) {
    for (j = 0; j < board[i].length; j++) {
      move++;
      if (board[i][j] != "X" && board[i][j] != "O") {
        if (strategyArray[i][j] > max) {
          // determine max strategy space
          max = strategyArray[i][j];
          maxMove = move;
        }
      }
    }
  }
  return maxMove.toString();
}

function hasSpacesRemainingTwoD(board) {
  for (let i = 0; i < board.length; i++) {
    for (j = 0; j < board[i].length; j++) {
      if (board[i][j] != "X" && board[i][j] != "O") {
        return true;
      }
    }
  }
  return false;
}
function hasSpacesRemainingOneD(array) {
  for (let i = 0; i < array.length; i++) {
    if (typeof array[i] === "number") {
      return i;
    }
  }
  return -1;
}
function moveToCoord(move) {
    let coords = [];
    let mv=0;
    for (i = 0; i < 3; i++) {
        for (j = 0; j < 3; j++) {
        mv++;
        if (mv === move) coords[0] === i && coords[1] === j;
    }
  }
  return coords;
}


function coordToMove(coords) {
  // takes coordinates in [i,j] form and converts them to string [1-9] move on 3X3 board.
  let move = 0;
  for (i = 0; i < 3; i++) {
    for (j = 0; j < 3; j++) {
      move++;
      if (coords[0] === i && coords[1] === j) return move.toString();
    }
  }
  return move.toString();
}

function winner(boardState) {
  i = 0;
  xCount = 0;
  oCount = 0;
  result = "";
  xRowCoordinates = [];
  xColCoordinates = [];
  oRowCoordinates = [];
  oColCoordinates = [];
  for (i = 0; i < boardState.length; i++) {
    // row
    for (j = 0; j < boardState[i].length; j++) {
      // col
      if (boardState[i][j] === "X") {
        xCount += 1;
        xRowCoordinates.push(i);
        xColCoordinates.push(j);
      } else if (boardState[i][j] === "O") {
        oCount += 1;
        oRowCoordinates.push(i);
        oColCoordinates.push(j);
      }
    }
  }

  if (
    containsNumberOf(0, xRowCoordinates, 3) ||
    containsNumberOf(1, xRowCoordinates, 3) ||
    containsNumberOf(2, xRowCoordinates, 3) ||
    containsNumberOf(0, xColCoordinates, 3) ||
    containsNumberOf(1, xColCoordinates, 3) ||
    containsNumberOf(2, xColCoordinates, 3) ||
    containsDiagonalThree(xRowCoordinates, xColCoordinates)
  ) {
    result = "X is winner!";
  } else if (
    containsNumberOf(0, oRowCoordinates, 3) ||
    containsNumberOf(1, oRowCoordinates, 3) ||
    containsNumberOf(2, oRowCoordinates, 3) ||
    containsNumberOf(0, oColCoordinates, 3) ||
    containsNumberOf(1, oColCoordinates, 3) ||
    containsNumberOf(2, oColCoordinates, 3) ||
    containsDiagonalThree(oRowCoordinates, oColCoordinates)
  ) {
    result = "O is winner!";
  } else result = "No winner";

  return result;
}

function containsDiagonalThree(array1, array2) {
  // top left to bottom right.
  counter = 0;
  for (i = 0; i < array1.length; i++) {
    if (array1[i] === array2[i]) counter++;
  }
  if (counter > 2) return true;
  // top right to bottom left.
  counter = 0;
  for (i = 0; i < array1.length; i++) {
    if (array1[i] + array2[i] === 2) counter++;
  }
  if (counter > 2) return true;
  return false;
}
