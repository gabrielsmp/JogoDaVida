// Tamanho do tabuleiro
const rows = 10;
const cols = 10;

// Criação do tabuleiro
const board = document.getElementById('board');
let grid = createGrid();

// Preenche o tabuleiro com células
function createGrid() {
  let arr = new Array(rows);
  for (let i = 0; i < rows; i++) {
    arr[i] = new Array(cols);
    for (let j = 0; j < cols; j++) {
      arr[i][j] = 0;
      let cell = document.createElement('div');
      cell.className = 'cell';
      cell.addEventListener('click', () => toggleCell(i, j));
      board.appendChild(cell);
    }
  }
  return arr;
}

// Alterna o estado de uma célula
function toggleCell(row, col) {
  grid[row][col] = grid[row][col] === 0 ? 1 : 0;
  const cell = document.getElementsByClassName('cell')[row * cols + col];
  cell.className = grid[row][col] === 1 ? 'cell alive' : 'cell';
}

// Inicia o jogo
let interval;
function startGame() {
  interval = setInterval(updateGrid, 500);
}

// Atualiza o tabuleiro para a próxima geração
function updateGrid() {
  let newGrid = createEmptyGrid();
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const cell = grid[row][col];
      const neighbors = countNeighbors(row, col);
      if (cell === 1) {
        if (neighbors === 2 || neighbors === 3) {
          newGrid[row][col] = 1;
        } else {
          newGrid[row][col] = 0;
        }
      } else {
        if (neighbors === 3) {
          newGrid[row][col] = 1;
        } else {
          newGrid[row][col] = 0;
        }
      }
      const cellElement = document.getElementsByClassName('cell')[row * cols + col];
      cellElement.className = newGrid[row][col] === 1 ? 'cell alive' : 'cell';
    }
  }
  grid = newGrid;
}

// Conta o número de vizinhos vivos de uma célula
function countNeighbors(row, col) {
  let count = 0;
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      if (i === 0 && j === 0) continue;
      const newRow = row + i;
      const newCol = col + j;
      if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols) {
        count += grid[newRow][newCol];
      }
    }
  }
  return count;
}

// Cria uma nova matriz vazia para a próxima geração
function createEmptyGrid() {
  let arr = new Array(rows);
  for (let i = 0; i < rows; i++) {
    arr[i] = new Array(cols).fill(0);
  }
  return arr;
}

// Para o jogo
function stopGame() {
  clearInterval(interval);
}

// Limpa o tabuleiro
function clearBoard() {
  stopGame();
  grid = createEmptyGrid();
  const cells = document.getElementsByClassName('cell');
  for (let i = 0; i < cells.length; i++) {
    cells[i].className = 'cell';
  }
}