var __defProp = Object.defineProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __toCommonJS = (from) => {
  const moduleCache = __toCommonJS.moduleCache ??= new WeakMap;
  var cached = moduleCache.get(from);
  if (cached)
    return cached;
  var to = __defProp({}, "__esModule", { value: true });
  var desc = { enumerable: false };
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key))
        __defProp(to, key, {
          get: () => from[key],
          enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
        });
  }
  moduleCache.set(from, to);
  return to;
};
var __commonJS = (cb, mod) => () => (mod || cb((mod = { exports: {} }).exports, mod), mod.exports);
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, {
      get: all[name],
      enumerable: true,
      configurable: true,
      set: (newValue) => all[name] = () => newValue
    });
};
var __esm = (fn, res) => () => (fn && (res = fn(fn = 0)), res);

// node_modules/2048_functional/dist/rotateMatrix.js
var require_rotateMatrix = __commonJS((exports) => {
  var _toConsumableArray = function(arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = Array(arr.length);i < arr.length; i++) {
        arr2[i] = arr[i];
      }
      return arr2;
    } else {
      return Array.from(arr);
    }
  };
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var compose = function compose() {
    for (var _len = arguments.length, functions = Array(_len), _key = 0;_key < _len; _key++) {
      functions[_key] = arguments[_key];
    }
    return function(arg) {
      return functions.reduceRight(function(curArg, curFunc) {
        return curFunc(curArg);
      }, arg);
    };
  };
  var composeNTimes = function composeNTimes(func) {
    var count = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
    var arg = arguments[2];
    var funcNTimes = new Array(count).fill(func);
    return compose.apply(undefined, _toConsumableArray(funcNTimes))(arg);
  };
  var reverseMatrix = function reverseMatrix(matrix) {
    return matrix.reduceRight(function(acc, row) {
      return [].concat(_toConsumableArray(acc), [row]);
    }, []);
  };
  var transposeMatrix = function transposeMatrix(matrix) {
    return matrix.reduce(function(acc, row) {
      return row.map(function(item, i) {
        return (acc[i] || []).concat(row[i]);
      });
    }, []);
  };
  var rotateMatrixClockwise = function rotateMatrixClockwise(matrix) {
    var count = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
    var rotateClockwiseOnce = function rotateClockwiseOnce(array) {
      return compose(transposeMatrix, reverseMatrix)(array);
    };
    return composeNTimes(rotateClockwiseOnce, count, matrix);
  };
  var rotateMatrixCounter = function rotateMatrixCounter(matrix) {
    var count = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
    var rotateCounterClockwiseOnce = function rotateCounterClockwiseOnce(array) {
      return compose(reverseMatrix, transposeMatrix)(array);
    };
    return composeNTimes(rotateCounterClockwiseOnce, count, matrix);
  };
  exports.rotateMatrixClockwise = rotateMatrixClockwise;
  exports.rotateMatrixCounter = rotateMatrixCounter;
});

// node_modules/2048_functional/dist/index.js
var require_dist = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.play = exports.movePlayField = undefined;
  var _rotateMatrix = require_rotateMatrix();
  var directions = {
    left: {
      direction: "left",
      count: 0
    },
    down: {
      direction: "down",
      count: 1
    },
    right: {
      direction: "right",
      count: 2
    },
    up: {
      direction: "up",
      count: 3
    }
  };
  var blankField = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
  var flat = function flat(arr) {
    return arr.reduce(function(acc, val) {
      return acc.concat(val);
    }, []);
  };
  var map2DimArr = function map2DimArr(array, fn) {
    return array.map(function(curr, i) {
      return curr.map(function(elem, j) {
        return fn(elem, i, j, array);
      });
    });
  };
  var getRandomInt = function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  };
  var addNumberToPlayField = function addNumberToPlayField(playField) {
    var getFreeCells = function getFreeCells(field) {
      var cellsIndexes = map2DimArr(field, function(elem, i, j) {
        return [i, j, elem];
      });
      var flattenCellsIndexes = cellsIndexes.reduce(function(acc, val) {
        return acc.concat(val);
      }, []);
      var freeCellsIndexes = flattenCellsIndexes.filter(function(elem) {
        return elem[2] === 0;
      });
      return freeCellsIndexes;
    };
    var freeCells = getFreeCells(playField);
    if (freeCells.length === 0)
      return playField;
    var randomCellIndex = getRandomInt(freeCells.length);
    var randomCellI = freeCells[randomCellIndex][0];
    var randomCellJ = freeCells[randomCellIndex][1];
    var num2or4 = getRandomInt(100) < 90 ? 2 : 4;
    var result = map2DimArr(playField, function(elem, i, j) {
      return i === randomCellI && j === randomCellJ ? num2or4 : elem;
    });
    return result;
  };
  var movePlayField = exports.movePlayField = function movePlayField(playField, direction) {
    var rotatedField = (0, _rotateMatrix.rotateMatrixClockwise)(playField, directions[direction].count);
    var moveRowToLeft = function moveRowToLeft(array) {
      if (array.length < 2)
        return array;
      if (array[0] === array[1])
        return [array[0] * 2].concat(moveRowToLeft(array.slice(2)));
      return [array[0]].concat(moveRowToLeft(array.slice(1)));
    };
    var movedField = rotatedField.map(function(curr) {
      return moveRowToLeft(curr.filter(function(e) {
        return e !== 0;
      }));
    });
    var addedZerosField = map2DimArr(blankField, function(elem, i, j) {
      return elem + movedField[i][j] ? movedField[i][j] : 0;
    });
    var result = (0, _rotateMatrix.rotateMatrixCounter)(addedZerosField, directions[direction].count);
    return result;
  };
  var isWin = function isWin(playField) {
    var has2048 = flat(playField).includes(2048);
    return has2048;
  };
  var isLoss = function isLoss(playField) {
    var hasZeros = playField.reduce(function(acc, elem) {
      return acc + (elem.includes(0) ? 1 : 0);
    }, 0);
    if (hasZeros)
      return false;
    var canMoveToLeftToUp = function canMoveToLeftToUp(elem, i, j, arr) {
      var canMoveAlongI = i > 0 ? elem === arr[i - 1][j] : false;
      var canMoveAlongJ = j > 0 ? elem === arr[i][j - 1] : false;
      return canMoveAlongI || canMoveAlongJ;
    };
    var isExistsMoves = map2DimArr(playField, canMoveToLeftToUp);
    var hasSomeMove = isExistsMoves.map(function(elem) {
      return elem.includes(true);
    }).includes(true);
    return !hasSomeMove;
  };
  var isEqual = function isEqual(prevField, nextField) {
    var prev = flat(prevField);
    var next = flat(nextField);
    if (prev.length !== next.length) {
      return false;
    }
    if (prev.every(function(item, i) {
      return item === next[i];
    })) {
      return true;
    }
    return false;
  };
  var play = exports.play = function play(_ref) {
    var { prevField, direction, isNewGame } = _ref;
    if (isNewGame) {
      return { prevField: blankField, nextField: addNumberToPlayField(blankField) };
    }
    var movedField = movePlayField(prevField, direction);
    if (isEqual(movedField, prevField)) {
      return { prevField, nextField: movedField };
    }
    var nextField = addNumberToPlayField(movedField);
    var victory = isWin(nextField);
    var defeat = isLoss(nextField);
    return {
      prevField,
      nextField,
      victory,
      defeat
    };
  };
});

// node_modules/2048game/index.js
var require_2048game = __commonJS((exports, module) => {
  var indexes = function(arr, val) {
    var indexes2 = [], i = -1;
    while ((i = arr.indexOf(val, i + 1)) != -1) {
      indexes2.push(i);
    }
    return indexes2;
  };
  var contador = function(array) {
    let contado = [];
    array.forEach((e) => {
      let index = contado.findIndex((c) => c.numero == e);
      if (index == -1) {
        contado.push({ numero: e, contador: 1 });
      } else {
        contado[index].contador++;
      }
    });
    return contado;
  };
  var numerosaumentados = function(array1, array2) {
    let aumentados = [];
    for (let i = 0;i < array1.length; i++) {
      let index = array2.findIndex((c) => c.numero == array1[i].numero);
      if (index !== -1) {
        if (array1[i].numero !== 0 && array1[i].contador < array2[index].contador) {
          aumentados.push((array2[index].contador - array1[i].contador) * array1[i].numero);
        }
      }
    }
    return aumentados;
  };
  var comprobarderrota = function(estado) {
    for (let i = 0;i < estado.length; i++) {
      for (let j = 0;j < estado[i].length; j++) {
        if (j < estado[i].length - 1 && estado[i][j] === estado[i][j + 1]) {
          return false;
        }
        if (i < estado.length - 1 && estado[i][j] === estado[i + 1][j]) {
          return false;
        }
      }
    }
    if (estado.reduce((a, b) => a.concat(b)).indexOf(0) == -1)
      return true;
    return false;
  };
  var juego = require_dist();
  module.exports = {
    partida: function(final) {
      if (final == undefined)
        throw new Error(`Debe decirme si quiere que la partida tenga final o no`);
      this.bloques = 2;
      this.board = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
      ];
      this.puntuacion = 0;
      this.tecnical = this.board.map((y) => y.join(",")).join(",").split(",").map((y) => parseInt(y));
      this.tecnicaltoboard = function() {
        this.board[0] = this.tecnical.slice(0, 4);
        this.board[1] = this.tecnical.slice(4, 8);
        this.board[2] = this.tecnical.slice(8, 12);
        this.board[3] = this.tecnical.slice(12, 16);
      };
      this.randomn = function() {
        this.tecnical = this.board.map((y) => y.join(",")).join(",").split(",").map((y) => parseInt(y));
        let total = this.bloques;
        for (let i = 0;i < total; i++) {
          let numero = Math.random() < 0.9 ? 2 : 4;
          let indexe = indexes(this.tecnical, 0);
          this.tecnical[indexe[Math.floor(Math.random() * indexe.length)]] = numero;
        }
        this.tecnicaltoboard();
      };
      this.randomn();
      this.reiniciar = function() {
        this.board = [
          [0, 0, 0, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0]
        ];
        this.randomn();
        this.puntuacion = 0;
        return "Partida empezada";
      };
      this.mover = function(direccion) {
        if (!direccion)
          throw new Error(`Debe decirme la direcci\xF3n`);
        let direcciones = ["arriba", "abajo", "izquierda", "derecha"];
        if (direcciones.indexOf(direccion.toLowerCase()) == -1)
          return `Dime una direcci\xF3n valida`;
        let tecnicala = this.board.map((y) => y.join(",")).join(",").split(",").map((y) => parseInt(y));
        let contadoa = contador(tecnicala);
        if (direccion == "arriba") {
          this.board = juego.movePlayField(this.board, "up");
        }
        if (direccion == "abajo") {
          this.board = juego.movePlayField(this.board, "down");
        }
        if (direccion == "izquierda") {
          this.board = juego.movePlayField(this.board, "left");
        }
        if (direccion == "derecha") {
          this.board = juego.movePlayField(this.board, "right");
        }
        this.tecnical = this.board.map((y) => y.join(",")).join(",").split(",").map((y) => parseInt(y));
        let contado = contador(this.tecnical);
        let aumentados = numerosaumentados(contadoa, contado);
        for (let i = 0;i < aumentados.length; i++) {
          this.puntuacion += aumentados[i];
        }
        this.randomn();
        this.tecnical = this.board.map((y) => y.join(",")).join(",").split(",").map((y) => parseInt(y));
        this.puntuacion = this.tecnical.reduce((a, b) => a + b, 0);
        if (comprobarderrota(this.board)) {
          return `Has perdido porfavor reinicia la partida.`;
        }
        if (final == true) {
          if (this.tecnical.indexOf(2048) !== -1) {
            return `Has ganado porfavor reinicia la partida.`;
          }
        }
      };
      this.estado = function(array) {
        if (array == undefined)
          throw new Error("Especifica si quieres el estado como un array o un texto");
        if (array == false) {
          let display = this.board.map((y) => y.join("|"));
          display = display.join("\n-------\n");
          return display;
        } else if (array == true) {
          return this.tecnical;
        }
      };
    }
  };
});

// node_modules/four-in-a-row/src/constants.js
var GameStatus, MoveStatus, PlayerColor, BoardDimensions, BoardToken;
var init_constants = __esm(() => {
  GameStatus = {
    IN_PROGRESS: "in-progress",
    START: "start",
    WIN: "win",
    DRAW: "draw"
  };
  MoveStatus = {
    INVALID: "invalid",
    WIN: "win",
    SUCCESS: "success",
    DRAW: "draw"
  };
  PlayerColor = {
    NONE: "none",
    YELLOW: "yellow",
    RED: "red"
  };
  BoardDimensions = {
    ROWS: 6,
    COLUMNS: 7,
    WIN_LINE_LENGTH: 4
  };
  BoardToken = {
    NONE: 0,
    YELLOW: 1,
    RED: 2
  };
});

// node_modules/four-in-a-row/src/game.js
class Game {
  startingColor;
  currentTurn;
  status;
  currentBoard;
  constructor() {
    this.reset();
  }
  static createBoard() {
    let board = new Array(BoardDimensions.ROWS);
    for (let i = 0;i < BoardDimensions.ROWS; i++) {
      board[i] = new Uint8Array(BoardDimensions.COLUMNS);
      board[i].fill(BoardToken.NONE);
    }
    return board;
  }
  static deepBoardCopy(oldBoard) {
    let newBoard = new Array(BoardDimensions.ROWS);
    for (let rowIndex = 0;rowIndex < BoardDimensions.ROWS; rowIndex++) {
      newBoard[rowIndex] = new Uint8Array(BoardDimensions.COLUMNS);
      for (let columnIndex = 0;columnIndex < BoardDimensions.COLUMNS; columnIndex++) {
        newBoard[rowIndex][columnIndex] = oldBoard[rowIndex][columnIndex];
      }
    }
    return newBoard;
  }
  static playerColorToBoardToken(playerColor) {
    switch (playerColor) {
      case PlayerColor.YELLOW:
        return BoardToken.YELLOW;
      case PlayerColor.RED:
        return BoardToken.RED;
      default:
        return BoardToken.NONE;
    }
  }
  static tryFindWinLine(board, options) {
    options = options || {};
    let config = {
      startRowIndex: options.startRowIndex || 0,
      startColumnIndex: options.startColumnIndex || 0,
      rowCountStep: options.rowCountStep || 0,
      columnCountStep: options.columnCountStep || 0
    };
    let count = 0;
    let tokenToCheck = BoardToken.NONE;
    let winLine = [];
    for (let i = 0;i < BoardDimensions.WIN_LINE_LENGTH; i++) {
      let row = config.startRowIndex + config.rowCountStep * i;
      let column = config.startColumnIndex + config.columnCountStep * i;
      if (Game.checkIfOutOfBounds(row, column)) {
        break;
      }
      let currentToken = board[row][column];
      if (currentToken === BoardToken.NONE) {
        break;
      }
      if (tokenToCheck === BoardToken.NONE) {
        tokenToCheck = currentToken;
      }
      if (currentToken === tokenToCheck) {
        count++;
      }
      winLine.push({ row, column });
    }
    if (count === BoardDimensions.WIN_LINE_LENGTH) {
      return {
        winLine,
        winner: Game.boardTokenToPlayerColor(tokenToCheck)
      };
    }
    return {
      winLine: []
    };
  }
  static checkIfOutOfBounds(row, column) {
    return row < 0 || row > BoardDimensions.ROWS || column < 0 || column > BoardDimensions.COLUMNS;
  }
  static boardTokenToPlayerColor(boardToken) {
    switch (boardToken) {
      case BoardToken.YELLOW:
        return PlayerColor.YELLOW;
      case BoardToken.RED:
        return PlayerColor.RED;
      default:
        return PlayerColor.NONE;
    }
  }
  static checkForWin(board) {
    for (let columnIndex = 0;columnIndex < BoardDimensions.COLUMNS; columnIndex++) {
      for (let rowIndex = BoardDimensions.ROWS - 1;rowIndex > -1; rowIndex--) {
        let verticalWinCheckResult = Game.tryFindWinLine(board, {
          startRowIndex: rowIndex,
          startColumnIndex: columnIndex,
          rowCountStep: -1
        });
        if (verticalWinCheckResult.winner) {
          return verticalWinCheckResult;
        }
        let horizontalWinCheckResult = Game.tryFindWinLine(board, {
          startRowIndex: rowIndex,
          startColumnIndex: columnIndex,
          columnCountStep: -1
        });
        if (horizontalWinCheckResult.winner) {
          return horizontalWinCheckResult;
        }
        let leftDiagonalWinCheck = Game.tryFindWinLine(board, {
          startRowIndex: rowIndex,
          startColumnIndex: columnIndex,
          rowCountStep: -1,
          columnCountStep: -1
        });
        if (leftDiagonalWinCheck.winner) {
          return leftDiagonalWinCheck;
        }
        let rightDiagonalWinCheck = Game.tryFindWinLine(board, {
          startRowIndex: rowIndex,
          startColumnIndex: columnIndex,
          rowCountStep: -1,
          columnCountStep: 1
        });
        if (rightDiagonalWinCheck.winner) {
          return rightDiagonalWinCheck;
        }
      }
    }
    return {
      winLine: [],
      winner: PlayerColor.NONE
    };
  }
  static checkForFilledBoard(board) {
    for (let j = 0;j < board.length; j++) {
      let boardColumn = board[j];
      for (let i = 0;i < boardColumn.length; i++) {
        let boardPosition = boardColumn[i];
        if (boardPosition === BoardToken.NONE) {
          return false;
        }
      }
    }
    return true;
  }
  reset() {
    this.startingColor = PlayerColor.YELLOW;
    this.currentTurn = this.startingColor;
    this.status = GameStatus.START;
    this.currentBoard = Game.createBoard();
  }
  playMove(columnIndex) {
    switch (this.status) {
      case GameStatus.START:
        this.status = GameStatus.IN_PROGRESS;
        break;
      case GameStatus.DRAW:
      case GameStatus.WIN:
        return this.evaluateGame(this.currentBoard);
      default:
        break;
    }
    let moveResult = this.performMove(columnIndex);
    if (moveResult.status === MoveStatus.SUCCESS) {
      this.currentTurn = this.currentTurn === PlayerColor.YELLOW ? PlayerColor.RED : PlayerColor.YELLOW;
    }
    return moveResult;
  }
  performMove(columnIndex) {
    let nextBoard = Game.deepBoardCopy(this.currentBoard);
    let moveAttemptResult = this.tryPerformMove(columnIndex, nextBoard);
    if (moveAttemptResult.status === MoveStatus.INVALID) {
      return {
        board: nextBoard,
        winner: PlayerColor.NONE,
        status: MoveStatus.INVALID,
        winLine: []
      };
    }
    this.currentBoard = moveAttemptResult.board;
    return this.evaluateGame(moveAttemptResult.board);
  }
  tryPerformMove(columnIndex, nextBoard) {
    let isMoveValid = false;
    for (let i = nextBoard.length - 1;i > -1; i--) {
      let boardRow = nextBoard[i];
      let boardPosition = boardRow[columnIndex];
      if (boardPosition !== BoardToken.NONE) {
        continue;
      }
      boardRow[columnIndex] = Game.playerColorToBoardToken(this.currentTurn);
      isMoveValid = true;
      break;
    }
    if (!isMoveValid) {
      return {
        status: MoveStatus.INVALID
      };
    }
    return {
      status: MoveStatus.SUCCESS,
      board: nextBoard
    };
  }
  evaluateGame(board) {
    let winCheckResult = Game.checkForWin(board);
    if (winCheckResult.winner !== PlayerColor.NONE) {
      this.status = GameStatus.WIN;
      return {
        board,
        winner: winCheckResult.winner,
        status: MoveStatus.WIN,
        winLine: winCheckResult.winLine
      };
    }
    if (Game.checkForFilledBoard(board)) {
      this.status = GameStatus.DRAW;
      return {
        board,
        winner: PlayerColor.NONE,
        status: MoveStatus.DRAW,
        winLine: []
      };
    }
    return {
      board,
      winner: PlayerColor.NONE,
      status: MoveStatus.SUCCESS,
      winLine: []
    };
  }
}
var init_game = __esm(() => {
  init_constants();
});

// node_modules/four-in-a-row/src/index.js
var exports_src = {};
__export(exports_src, {
  PlayerColor: () => {
    {
      return PlayerColor;
    }
  },
  MoveStatus: () => {
    {
      return MoveStatus;
    }
  },
  GameStatus: () => {
    {
      return GameStatus;
    }
  },
  Game: () => {
    {
      return Game;
    }
  },
  BoardToken: () => {
    {
      return BoardToken;
    }
  },
  BoardDimensions: () => {
    {
      return BoardDimensions;
    }
  }
});
var init_src = __esm(() => {
  init_game();
  init_constants();
});

// Envs/Frozenlake.js
class Frozenlake {
  static TextToInt(state) {
    let middle = state.map((e) => e.split(""));
    let final = middle.flat(Infinity).map((e) => e == "S" ? 0 : e == "F" ? 1 : e == "H" ? 2 : 3);
    return final;
  }
  constructor(desc, map_name, is_slippery) {
    this.observation_shape = [1];
    this.action_size = 4;
    this.is_slippery = is_slippery;
    this.desc = desc;
    this.map_name = map_name;
    this.height;
    this.width;
    this.state = [];
    this.playerx;
    this.playery;
    this.goalx;
    this.goaly;
    this.reset();
  }
  static sampleAction() {
    return Math.floor(Math.random() * 4);
  }
  step(action) {
    if (this.is_slippery) {
      let actions = [];
      if (action == 0 && this.playerx > 0) {
        actions = [0, 1, 3];
      }
      if (action == 1 && this.playery < this.height) {
        actions = [0, 1, 2];
      }
      if (action == 2 && this.playerx < this.width) {
        actions = [1, 2, 3];
      }
      if (action == 3 && this.playery > 0) {
        actions = [0, 2, 3];
      }
      let realaction = actions[Math.floor(actions.length * Math.random())];
      this.move(realaction);
    } else {
      this.move(action);
    }
    let obs = this.get_obs();
    let reward = this.state[obs] == 3 ? 1 : 0;
    let done = this.state[obs] == 3 || this.state[obs] == 2;
    let info = this.get_info();
    return [obs, reward, done, info];
  }
  move(action) {
    if (action == 0 && this.playerx > 0)
      this.playerx -= 1;
    if (action == 1 && this.playery < this.height)
      this.playery += 1;
    if (action == 2 && this.playerx < this.width)
      this.playerx += 1;
    if (action == 3 && this.playery > 0)
      this.playery -= 1;
  }
  get_obs() {
    return [this.playery * (this.height + 1) + this.playerx];
  }
  get_info() {
    return [Math.hypot(this.playerx - this.goalx, this.playery - this.goaly)];
  }
  reset() {
    if (this.desc && this.desc.length > 0) {
      this.state = Frozenlake.TextToInt(this.desc.flat(Infinity));
      for (let y = 0;y < this.desc.length; y++) {
        for (let x = 0;x < this.desc[y].length; x++) {
          if (this.desc[y][x] == "S") {
            this.playerx = x;
            this.playery = y;
          }
          if (this.desc[y][x] == "G") {
            this.goalx = x;
            this.goaly = y;
          }
        }
      }
      this.height = this.desc.length - 1;
      this.width = this.desc[0].length - 1;
    } else {
      if (this.map_name == "4x4") {
        this.state = Frozenlake.TextToInt([
          "SFFF",
          "FHFH",
          "FFFH",
          "HFFG"
        ]);
        this.playerx = 0;
        this.playery = 0;
        this.goalx = 3;
        this.goaly = 3;
        this.height = 3;
        this.width = 3;
      } else {
        this.state = Frozenlake.TextToInt([
          "SFFFFFFF",
          "FFFFFFFF",
          "FFFHFFFF",
          "FFFFFHFF",
          "FFFHFFFF",
          "FHHFFFHF",
          "FHFFHFHF",
          "FFFHFFFG"
        ]);
        this.playerx = 0;
        this.playery = 0;
        this.goalx = 7;
        this.goaly = 7;
        this.height = 7;
        this.width = 7;
      }
    }
    return [this.get_obs(), this.get_info()];
  }
  render() {
    let line = "";
    for (let i = 0;i < this.state.length; i++) {
      if (i % (this.height + 1) == 0) {
        console.log(line);
        line = "";
      }
      if (this.get_obs() == i) {
        line += "P";
      } else {
        let representation = ["S", "F", "H", "G"];
        lina += representation[this.state[i]];
      }
    }
    console.log(line);
    console.log("-------------");
  }
}
var Frozenlake_default = Frozenlake;

// Envs/2048.js
var game = require_2048game();

class TwoThousandfortyeight {
  constructor() {
    this.observation_shape = [16];
    this.action_size = 4;
    this.lastscore = 0;
    this.match = new game.partida(false);
    this.reset();
  }
  static sampleAction() {
    return Math.floor(Math.random() * 4);
  }
  step(action) {
    let actions = ["arriba", "abajo", "izquierda", "derecha"];
    let mov = this.match.mover(actions[action]);
    let obs = this.get_obs();
    let reward = this.match.puntuacion - this.lastscore;
    let max = Math.max(...obs);
    if (obs.indexOf(max) == 0 || obs.indexOf(max) == 3 || obs.indexOf(max) == 12 || obs.indexOf(max) == 15) {
      reward += 100;
    }
    let done = mov == `Has perdido porfavor reinicia la partida.` || mov == `Has ganado porfavor reinicia la partida.`;
    let info = this.get_info();
    this.lastscore = this.match.puntuacion;
    return [obs, reward, done, info];
  }
  get_obs() {
    return this.match.estado(true);
  }
  get_info() {
    return [];
  }
  reset() {
    this.match.reiniciar();
    return [this.get_obs(), this.get_info()];
  }
  render() {
    console.log(this.match.estado(false));
  }
}
var _2048_default = TwoThousandfortyeight;

// Envs/TicTacToe.js
class TicTacToe {
  static Status(board) {
    for (let i = 0;i < 3; i++) {
      if (board[i][0] === board[i][1] && board[i][1] === board[i][2]) {
        if (board[i][0] !== 0) {
          return board[i][0];
        }
      }
      if (board[0][i] === board[1][i] && board[1][i] === board[2][i]) {
        if (board[0][i] !== 0) {
          return board[0][i];
        }
      }
    }
    if (board[0][0] === board[1][1] && board[1][1] === board[2][2] || board[0][2] === board[1][1] && board[1][1] === board[2][0]) {
      if (board[1][1] !== 0) {
        return board[1][1];
      }
    }
    for (let i = 0;i < 3; i++) {
      for (let j = 0;j < 3; j++) {
        if (board[i][j] === 0) {
          return "In progress";
        }
      }
    }
    return "Draw";
  }
  static OneHot(state) {
    let X = state.map((x) => x == 1 ? 1 : 0);
    let O = state.map((x) => x == 2 ? 1 : 0);
    let E = state.map((x) => x == 0 ? 1 : 0);
    return [X, O, E];
  }
  constructor(player) {
    this.observation_shape = [3, 9];
    this.action_size = 9;
    this.player = player ? 2 : 1;
    this.reset();
  }
  static sampleAction() {
    return Math.floor(Math.random() * 9);
  }
  step(action) {
    let actiony = Math.floor(action / 3);
    let actionx = action % 3;
    let info;
    if (this.state[actiony][actionx] == 0) {
      this.state[actiony][actionx] = this.turn + 1;
      info = this.get_info();
      info[1] = 0;
      this.turn = (this.turn + 1) % 2;
    } else {
      info = this.get_info();
      info[1] = 1;
    }
    let obs = this.get_obs();
    let reward;
    if (info[0] == this.player) {
      reward = 1;
    } else if (info[0] == "Draw" || info[0] == "In progress") {
      reward = 0;
    } else {
      reward = -1;
    }
    let done = info[0] == "Draw" || info[0] == 1 || info[0] == 2;
    return [obs, reward, done, info];
  }
  get_obs() {
    return TicTacToe.OneHot(this.state);
  }
  get_info() {
    return [TicTacToe.Status(this.state)];
  }
  reset() {
    this.turn = 0;
    this.state = [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0]
    ];
    return [this.get_obs(), this.get_info()];
  }
  render() {
    let text = "+-+-+-+\n";
    for (let y = 0;y < this.state.length; y++) {
      let line = "|";
      for (let x = 0;x < this.state[y].length; x++) {
        if (this.state[y][x] == 0) {
          line += " ";
        } else if (this.state[y][x] == 1) {
          line += "X";
        } else {
          line += "O";
        }
        line += "|";
      }
      text += line + "\n+-+-+-+\n";
    }
    console.log(text);
  }
}
var TicTacToe_default = TicTacToe;

// Envs/Fourinarow.js
var { Game: Game2 } = (init_src(), __toCommonJS(exports_src));

class Fourinarow {
  constructor() {
    this.observation_shape = [6, 7];
    this.action_size = 7;
    this.match = new Game2;
    this.reset();
  }
  static sampleAction() {
    return Math.floor(Math.random() * 7);
  }
  step(action) {
    const moveResult = this.match.playMove(action);
    let obs = this.get_obs();
    let reward = 0;
    if (moveResult.status == "invalid") {
      reward -= 1;
    } else if (moveResult.status == "win") {
      reward += 1;
    }
    let done = moveResult.status == "draw" || moveResult.status == "win";
    let info = this.get_info();
    return [obs, reward, done, info];
  }
  get_obs() {
    return this.match.currentBoard.map((e) => Object.values(e));
  }
  get_info() {
    return [this.match.status, this.match.currentTurn];
  }
  reset() {
    this.match.reset();
    return [this.get_obs(), this.get_info()];
  }
  render() {
    let result = "";
    let status = this.get_obs();
    for (let y = 0;y < status.length; y++) {
      let line = "";
      for (let x = 0;x < status[y].length; x++) {
        if (status[y][x] == 0) {
          line += "\u26AA";
        } else if (status[y][x] == 1) {
          line += "\uD83D\uDFE1";
        } else {
          line += "\uD83D\uDD34";
        }
      }
      result += line + "\n";
    }
    result += "-----------------";
    console.log(result);
  }
}
var Fourinarow_default = Fourinarow;

// Envs/Snake.js
class Snake {
  constructor(size = 10) {
    this.size = size;
    this.doublesize = this.size * this.size;
    this.observation_shape = [8];
    this.action_size = 4;
    this.reset();
  }
  static sampleAction() {
    return Math.floor(Math.random() * 4);
  }
  step(accion) {
    let result = 0;
    let newpos = [this.position[0], this.position[1]];
    if (accion == 0) {
      newpos[1]--;
    } else if (accion == 1) {
      newpos[1]++;
    } else if (accion == 2) {
      newpos[0]++;
    } else {
      newpos[0]--;
    }
    if (this.outside(newpos) || this.state[newpos[1]][newpos[0]] > 0)
      result = -1;
    if (result != -1 && this.state[newpos[1]][newpos[0]] == -1) {
      this.state[newpos[1]][newpos[0]] = 0;
      this.longitud++;
      this.generateApple(newpos);
      result = 1;
    }
    if (result != -1) {
      this.state = this.state.map((f) => {
        return f.map((e) => {
          if (e == -1)
            return -1;
          if (e == 0)
            return 0;
          if (result == 1) {
            return e;
          }
          return e - 1;
        });
      });
      this.state[this.position[1]][this.position[0]] = this.longitud;
      this.position = newpos;
    }
    return [this.get_obs(), result, result == -1, this.get_info()];
  }
  outside(position) {
    if (position[0] < 0 || position[1] < 0 || position[0] > this.size - 1 || position[1] > this.size - 1)
      return true;
    return false;
  }
  get_obs() {
    let peligros = this.free();
    let peligroarriba = peligros[2] == 0 ? 1 : 1 - peligros[2] / this.doublesize;
    let peligroabajo = peligros[3] == 0 ? 1 : 1 - peligros[3] / this.doublesize;
    let peligroderecha = peligros[1] == 0 ? 1 : 1 - peligros[1] / this.doublesize;
    let peligroizquierda = peligros[0] == 0 ? 1 : 1 - peligros[0] / this.doublesize;
    let comidaarriba = this.positionApple[1] < this.position[1] ? 1 : 0;
    let comidaabajo = this.positionApple[1] > this.position[1] ? 1 : 0;
    let comidaderecha = this.positionApple[0] > this.position[0] ? 1 : 0;
    let comidaizquierda = this.positionApple[0] < this.position[0] ? 1 : 0;
    return [peligroabajo, peligroarriba, peligroderecha, peligroizquierda, comidaarriba, comidaabajo, comidaderecha, comidaizquierda];
  }
  get_info() {
    return [];
  }
  generateApple(newpos) {
    let x = Math.floor(Math.random() * this.size);
    let y = Math.floor(Math.random() * this.size);
    if (newpos == undefined)
      newpos = this.position;
    while (this.state[y][x] !== 0 || x == newpos[0] && y == newpos[1] || x == this.position[0] && y == this.position[1]) {
      x = Math.floor(Math.random() * this.size);
      y = Math.floor(Math.random() * this.size);
    }
    this.state[y][x] = -1;
    this.positionApple = [x, y];
  }
  free() {
    let free = [0, 0, 0, 0];
    this.visitados = [this.position];
    free[0] = this.freeCell([this.position[0] - 1, this.position[1]]);
    this.visitados = [this.position];
    free[1] = this.freeCell([this.position[0] + 1, this.position[1]]);
    this.visitados = [this.position];
    free[2] = this.freeCell([this.position[0], this.position[1] - 1]);
    this.visitados = [this.position];
    free[3] = this.freeCell([this.position[0], this.position[1] + 1]);
    return free;
  }
  freeCell(position) {
    let free = 0;
    if (this.outside(position))
      return free;
    if (this.state[position[1]][position[0]] <= 0 && !this.visitados.some((p) => p[0] == position[0] && p[1] == position[1])) {
      free += 1;
      this.visitados.push(position);
      free += this.freeCell([position[0] - 1, position[1]]);
      free += this.freeCell([position[0] + 1, position[1]]);
      free += this.freeCell([position[0], position[1] - 1]);
      free += this.freeCell([position[0], position[1] + 1]);
    }
    return free;
  }
  reset() {
    this.longitud = 1;
    this.state = [];
    for (let i = 0;i < this.size; i++) {
      this.state.push(new Array(this.size).fill(0));
    }
    let startX = Math.floor(Math.random() * this.size);
    let startY = Math.floor(Math.random() * this.size);
    this.position = [startX, startY];
    this.visitados = [];
    this.positionApple = null;
    this.generateApple();
  }
  render() {
    let result = "\u259B" + "\u2594".repeat(this.size) + `\u259C
`;
    for (let y = 0;y < this.state.length; y++) {
      let linea = "\u258D";
      for (let x = 0;x < this.state[y].length; x++) {
        if (x == this.position[0] && y == this.position[1]) {
          linea += "\x1B[32mO\x1B[0m";
        } else if (this.state[y][x] == 0) {
          linea += " ";
        } else if (this.state[y][x] == -1) {
          linea += "\x1B[31m\u25A1\x1B[0m";
        } else {
          linea += "\x1B[32m+\x1B[0m";
        }
      }
      linea += "\u2590";
      result += linea + "\n";
    }
    result += "\u2599" + "\u2582".repeat(this.size) + `\u259F
`;
    console.log(result);
  }
}
var Snake_default = Snake;
export {
  _2048_default as TwoThousandfortyeight,
  TicTacToe_default as TicTacToe,
  Snake_default as Snake,
  Frozenlake_default as Frozenlake,
  Fourinarow_default as Fourinarow
};
