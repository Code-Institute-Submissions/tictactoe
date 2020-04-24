// user becomes false
//board state is passed to computer
//logic is used to determine best next move 
//use updateBoard function is called.

function computerChoseWhere(boardState) {
    // pick first available space
    // then calculate user's next best move-based on winning line opportunities
    // array of Winning line spaces
    strategyArray = [
        [3, 2, 3],
        [2, 4, 2],
        [3, 2, 3]
    ];
    // Starting decision branch
    // copy boardState to avoid altering actual state. Purely for decision making abilities.
    // Iterate through boardState array check available spaces and then check which available space has max output on strategyArray.
    // Calculate users next move based upon same principle. 
    // loop through previous 2 steps - after 5 total moves -> check if (check winner)-> else if(check spaces left) else -> draw. 
    // 3 outcomes game over - count total moves and note outcome win/lose/draw (assign Markov state), or continue playing.
    // End of branch.
    // iterate through each branch result - branch with highest Markov state and shortest number of moves is selected. 
}