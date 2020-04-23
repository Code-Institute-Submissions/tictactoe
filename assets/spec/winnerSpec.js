describe("winner", function() {
    it(`should return "No winner"`, function(){
        var boardState =  [
                            [1, 2, 3],
                            [4, 5, 6],
                            [7, 8, 9]
                           ];        
            expect(winner(boardState)).toBe("No winner");
        });

    it(`should return "No winner"`, function(){
        var boardState = [
                            ['O', 'X', 'X'],
                            ['X', 'O', 'O'],
                            ['X', 'O', 'X']
                          ];        
            expect(winner(boardState)).toBe("No winner");
        });
    it(`should return "X is winner!"`, function(){
        var boardState = [
                           ['O', 'X', 'X'],
                           ['X', 'X', 'O'],
                           ['X', 'O', 'O']
                         ];        
            expect(winner(boardState)).toBe("X is winner!");
        });
    it(`should return "O is winner!"`, function(){
        var boardState = [
                          ['O', 'X', 'X'],
                          ['X', 'X', 'O'],
                          ['O', 'O', 'O']
                         ];        
            expect(winner(boardState)).toBe("O is winner!");
        });
});
