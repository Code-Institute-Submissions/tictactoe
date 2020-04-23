describe("winner", function() {
    it(`should return "No winner"`, function(){
        var boardState = board = [
                                    [1, 2, 3],
                                    [4, 5, 6],
                                    [7, 8, 9]
                                ];        
            expect(winner(boardState)).toBe("No winner");
        });
});
