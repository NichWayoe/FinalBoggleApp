export default class LeaderBoardEntry {
    constructor(playerName, boardSize, theBoard, numFound, solveTime) {
      this.playerName = playerName;
      this.boardSize = boardSize;
      this.theBoard = theBoard;
      this.numFound = numFound;
      this.solveTime = solveTime;
    }

    getBoard(){
        return this.theBoard
    }
    static map2array(boardSize, dictionary) {
        let arr = []
        for (let i = 0; i<boardSize; i++){
            arr.push(dictionary[i])
        }
        return arr
    }
    static array2map(boardSize, array) {
        let dict = new Object()
        for (let i = 0; i<boardSize; i++){
            dict[i] = array[i]
        }
        return dict
    }
    
    
    static convertor = {
        toFirestore: (leaderBoardEntry) => {
            let theBoard = LeaderBoardEntry.array2map(leaderBoardEntry.boardSize, leaderBoardEntry.theBoard)
            return {
                playerName: leaderBoardEntry.playerName ,
                boardSize: leaderBoardEntry.boardSize,
                theBoard: theBoard,
                numFound: leaderBoardEntry.numFound,

                };
        },
        fromFirestore: function(snapshot, options) {
            const data = snapshot.data(options);
            let theBoard = LeaderBoardEntry.map2array(data.boardSize, data.theBoard);
            return new LeaderBoardEntry(data.playerName,  data.boardSize, theBoard, data.numFound, data.solveTime);
        }
    }
  }
