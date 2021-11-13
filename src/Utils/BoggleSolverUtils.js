// Returns a random 5x5 board, using the official letter distribution.
import data from "./full-wordlist.json";

class Node {
  constructor() {
    this.children = Array(26).fill(null);
    this.endWord = false;
    this.word = "";
  }
}

export class Trie {
  constructor() {
    this.head = new Node();
  }

  static getIndex(letter) {
    return letter.toLowerCase().charCodeAt(0) - "a".charCodeAt(0);
  }

  addWord(word) {
    let currentNode = this.head;
    for (let i = 0; i < word.length; i++) {
      const index = Trie.getIndex(word[i]);
      if (currentNode.children[index] === null) {
        const newNode = new Node();
        currentNode.children[index] = newNode;
      }
      currentNode = currentNode.children[index];
    }
    currentNode.endWord = true;
    currentNode.word = word;
  }
}

export function findValidWordsFromGrid(grid, trie) {
  if (!validateGrid(grid)) {
    return [];
  }
  const numOfRows = grid.length;
  const numOfCols = grid[0].length;
  let solutions = new Set();
  let visited = Array(numOfRows)
    .fill(null)
    .map(() => Array(numOfRows).fill(0));
  for (let i = 0; i < numOfRows; i++) {
    for (let j = 0; j < numOfCols; j++) {
      boggleSolver(i, j, grid, visited, trie.head, solutions);
    }
  }
  return [...solutions];
}

const boggleSolver = (row, column, grid, visited, trieHead, solutions) => {
  if (trieHead.endWord) {
    solutions.add(trieHead.word);
  }
  if (
    (row > grid.length - 1) |
    (row < 0) |
    (column > grid[0].length - 1) |
    (column < 0)
  ) {
    return;
  }
  if (visited[row][column] === 1) {
    return;
  }
  let head = trieHead;
  visited[row][column] = 1;
  const entry = grid[row][column];

  for (let i = 0; i < entry.length; i++) {
    const index = Trie.getIndex(entry[i]);
    if (head.children[index] != null) {
      head = head.children[index];
    } else {
      visited[row][column] = 0;
      return;
    }
  }
  const directions = [
    [-1, 0],
    [-1, -1],
    [-1, 1],
    [0, -1],
    [1, 1],
    [0, 1],
    [1, 0],
    [1, -1],
  ];
  for (let i = 0; i < directions.length; i++) {
    boggleSolver(
      row + directions[i][0],
      column + directions[i][1],
      grid,
      visited,
      head,
      solutions
    );
  }
  visited[row][column] = 0;
};

const validateGrid = (grid) => {
  if (grid.length === 0) {
    return false;
  }
  const numOfRows = grid.length;
  const numOfCols = grid[0].length;
  if (numOfRows === 1 && numOfCols === 1) {
    return false;
  }
  for (let i = 0; i < numOfRows; i++) {
    for (let j = 0; j < numOfCols; j++) {
      if (
        !/[a-zA-Z]/.test(grid[i][j]) |
        (grid[i][j].toLowerCase() === "q") |
        (grid[i][j].toLowerCase() === "s")
      ) {
        return false;
      }
    }
  }
  return true;
};

export function generateGrid() {
  const dice = [
    "AAAFRS",
    "AAEEEE",
    "AAFIRS",
    "ADENNN",
    "AEEEEM",
    "AEEGMU",
    "AEGMNN",
    "AFIRSY",
    "BJKQXZ",
    "CCNSTW",
    "CEIILT",
    "CEILPT",
    "CEIPST",
    "DHHNOT",
    "DHHLOR",
    "DHLNOR",
    "DDLNOR",
    "EIIITT",
    "EMOTTT",
    "ENSSSU",
    "FIPRSY",
    "GORRVW",
    "HIPRRY",
    "NOOTUW",
    "OOOTTU",
  ];
  let chars = dice.map((cube) => cube[Math.floor(Math.random() * cube.length)]);
  chars.sort(() => Math.random() - 0.5); // Shuffle the letters.

  const SIZE = 5;
  let grid = [];
  for (let row = 0; row < SIZE; row++) {
    grid[row] = [];
    for (let col = 0; col < SIZE; ++col) {
      grid[row][col] = chars[SIZE * row + col];
      if (grid[row][col] === "Q") grid[row][col] = "Qu";
      if (grid[row][col] === "S") grid[row][col] = "St";
    }
  }
  return grid;
}

export function buildTrie() {
  const dictionary = data["words"];
  const trie = new Trie();
  for (let i = 0; i < dictionary.length; i++) {
    if (dictionary[i].length > 2 && /[a-zA-Z]/.test(dictionary[i])) {
      trie.addWord(dictionary[i]);
    }
  }
  return trie;
}
