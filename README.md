Tic Tac Toe

Description
A simple 1 player game of tic tac toe, commonly referred to as "Naughts and crosses".

Target demographic 
children under 10 years old.

User Interface Design

Emphasis on simple and easy to use. Bright colours used to draw children into the game.

Features

Control Flow



STRATEGY

It's an imperfect strategy played by the computer. Whereby initially picking
its next move based upon available spaces that occur on the greatest number of 
winning lines. Depicted by the array below:

3 2 3<br>
2 4 2<br>
3 2 3<br>

However this strategy alone isn't sufficient for a challenging game of tic tac 
toe. Due to the fact that none of the decision making is related to what the 
other player is doing. So the strategy that takes priority is to complete a line.
This has been defined by scanning across all rows and columns and searching for 
lines that occupy 2 of the _same_ marker with a space to be filled.Then by 
filling this space irrespective of the markers on the line it will serve as an
offensive or a defensive move to win OR to stop the other player winning.

This strategy can be beaten because it starts in the middle space whilst 
although having most winning line opportunities it also takes more attempts to 
complete those lines when compared with starting in the corners. When spaces of
equal line opportunity havent been marked the computer simply picks the first 
one available in the iteration from top left corner through each row to the bottom
right corner. This decision process isn't optimised.

The optimal game strategy would consist of fewest attempts to create maximal line
opportunities.

Allowing the user to win some of the time, encourages them to play the game. The user
also has the upper hand by choosing first.

Testing

Deploy

References

