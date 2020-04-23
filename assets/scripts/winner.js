//winning states 8.
//[][], [][], [][]  columns all same value || rows all same value || (row===col && row+col===2
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
    if (xCount<3 && oCount<3) {
        result = 'No winner';
        return result;
    }
    console.log("X row coordinates are "+xRowCoordinates+"X col coordinates are "+xColCoordinates+
            "O row coordinates are "+oRowCoordinates+"O col coordinates are "+oColCoordinates+" .");
}