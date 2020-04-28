//import {winner, containsNumberOf} from 'modules/winner.js';

const board = //{
   // state:
        [
            [1, 2, 3],
            [4, 5, 6],
            [7, 8, 9],
                        ];
   // moves: 0
//}

//Assume user goes first
//objects: user + computer OR 2 instances of player. Stats object
// user true, computer false. (boolean)

function startGame() {
    var newBoard = board;
    //var newBoard = resetBoard();
    var player = "user";
    // allow every boardspace to be hovered upon to reveal potential chosen marker.
    for(id=0;id<=9;id++){
        $("#"+id).children(".mark").hover( function() {
            $(this).css("transform", "rotateY(180deg)");
        }, function(){
            $(this).css("transform", "rotateY(360deg)");
        });
        id=parseInt(id);
      }
  displayBoard(newBoard);
  //userChose(player, newBoard);
}

function makeUserMark(currentElement) { // takes id from element which refers to board space.
    let elementId=currentElement.id;    //string 
    $(currentElement).find(".space").html('X');
    $(currentElement).find(".mark").unbind('mouseenter mouseleave');
    $("#user-instruction").html('Move is '+elementId+'.');
    updateBoard(elementId,'user',board);    
}

function flowControl(boardState, player) {
  if (winner(boardState) != "No winner") console.log(winner(boardState));
  else if (hasSpacesRemainingTwoD(boardState)) {
    console.log("flowControl entered!");
    //continue game --> change players.
    var nextPlayer = player === "computer" ? "user" : "computer";
    console.log(
      "Player has now changed from " + player + " to " + nextPlayer + "."
    );
    if (nextPlayer === "user") {
      console.log("User's turn.");
      $("#user-instruction").html("It's now your turn.");
      //userChose(nextPlayer, boardState);
    } else {
      console.log("Computer's turn.");
      $("#user-instruction").html("Computer's turn.");
      computerChose(nextPlayer, boardState);
    }
  } // draw
  else console.log("It's a draw!");
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

function resetBoard() {
  let boardArr = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ];
  return boardArr;
}

function userChose(player, boardState) {
  // return error if !1-9 or if space already taken.
  $("#user-instruction").html(
    "Please pick a space 1 - 9 that hasn 't already been taken."
  );
  let um = $("#user-move");
  let umClone = um.clone(); // insert copy of button and remove original to get rid of old Listener events attached to the element.
  um.remove();
  umClone.appendTo("#move-area");
  umClone.click(function () {
    var move = document.getElementById("space-number").value;
    let coords = function() {
            return moveToCoord(move);
        } 
    
        updateBoard(move, player, boardState);
  });
}

function updateBoard(move, player, board) {     // move is string
  var coordinates = [];
  switch (move) {
    case "1":
      coordinates = [0, 0]; // coordinates of where the marker goes to be decided if 'O' or 'X'.
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
    default:
      console.log("No move detected.");
  }
  
  //console.log(player + " now moves to square number " + move + ".");
  if (player === "user") board[coordinates[0]][coordinates[1]] = "X";
  else board[coordinates[0]][coordinates[1]] = "O";

  // number of moves updated
  displayBoard(board);

  return flowControl(board, player);
}

function computerChose(player, boardState) {
  console.log("computerChose entered.");
  var bestMove = completeLine(boardState);
  bestMove = bestMove ? bestMove : maxMove(boardState); // determines if there's a line to complete or not. Then if not it picks space w/ maximal line oppurtunities.
  updateBoard(bestMove, player, boardState);
  //Each player uses same strategy.
}

function containsNumberOf(element, array, number) {
  // shared with winner.js
  // determines whether line contains 3 'X's or 'O's, NOT for diagonals!
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
  console.log("completeLine entered.");
  var coordLineGap = []; // missing coordinates of marker required to complete line (defensively or offensively)
  //Scan each row/column for two of same character on a line. MUST include space as well!
  for (i = 0; i < board.length; i++) {
    if (
      containsNumberOf("O", board[i], 2) &&
      hasSpacesRemainingOneD(board[i]) > -1
    ) {
      coordLineGap[0] = i;
      coordLineGap[1] = hasSpacesRemainingOneD(board[i]);
      console.log(
        "scanning row " + i + " space found on col " + coordLineGap[1]
      );
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

  board = board[0].map((row, j) => board.map((col) => col[j])); //        Undo earlier board transposition.

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

  if (coordLineGap.length < 2) return false;
  else return coordToMove(coordLineGap);
}

function maxMove(board) {
  console.log("maxMove entered.");
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
      console.log("element is " + array[i]);
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
