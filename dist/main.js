/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmory imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmory exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		Object.defineProperty(exports, name, {
/******/ 			configurable: false,
/******/ 			enumerable: true,
/******/ 			get: getter
/******/ 		});
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

const Board = __webpack_require__(1);
const MoveError = __webpack_require__(2);

class Game {
  constructor() {
    this.board = new Board();
    this.currentPlayer = Board.marks[0];
  }

  isOver() {
    return this.board.isOver();
  }

  playMove(pos) {
    this.board.placeMark(pos, this.currentPlayer);
    this.swapTurn();
  }

  // promptMove(reader, callback) {
  //   const game = this;

  //   this.board.print();
  //   console.log(`Current Turn: ${this.currentPlayer}`);

  //   reader.question('Enter rowIdx: ', rowIdxStr => {
  //     const rowIdx = parseInt(rowIdxStr);
  //     reader.question('Enter colIdx: ', colIdxStr => {
  //       const colIdx = parseInt(colIdxStr);
  //       callback([rowIdx, colIdx]);
  //     });
  //   });
  // }

  // run(reader, gameCompletionCallback) {
  //   this.promptMove(reader, move => {
  //     try {
  //       this.playMove(move);
  //     } catch (e) {
  //       if (e instanceof MoveError) {
  //         console.log(e.msg);
  //       } else {
  //         throw e;
  //       }
  //     }

  //     if (this.isOver()) {
  //       this.board.print();
  //       if (this.winner()) {
  //         console.log(`${this.winner()} has won!`);
  //       } else {
  //         console.log('NO ONE WINS!');
  //       }
  //       gameCompletionCallback();
  //     } else {
  //       // continue loop
  //       this.run(reader, gameCompletionCallback);
  //     }
  //   });
  // }

  swapTurn() {
    if (this.currentPlayer === Board.marks[0]) {
      this.currentPlayer = Board.marks[1];
    } else {
      this.currentPlayer = Board.marks[0];
    }
  }

  winner() {
    return this.board.winner();
  }
}

module.exports = Game;


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

const MoveError = __webpack_require__(2);

class Board {
  constructor() {
    this.grid = Board.makeGrid();
  }

  isEmptyPos(pos) {
    if (!Board.isValidPos(pos)) {
      throw new MoveError('Is not valid position!');
    }

    return (this.grid[pos[0]][pos[1]] === null);
  }

  isOver() {
    if (this.winner() != null) {
      return true;
    }

    for (let rowIdx = 0; rowIdx < 3; rowIdx++) {
      for (let colIdx = 0; colIdx < 3; colIdx++) {
        if (this.isEmptyPos([rowIdx, colIdx])) {
          return false;
        }
      }
    }

    return true;
  }

  placeMark(pos, mark) {
    if (!this.isEmptyPos(pos)) {
      throw new MoveError('Is not an empty position!');
    }

    this.grid[pos[0]][pos[1]] = mark;
  }

  print() {
    const strs = [];
    for (let rowIdx = 0; rowIdx < 3; rowIdx++) {
      const marks = [];
      for (let colIdx = 0; colIdx < 3; colIdx++) {
        marks.push(
          this.grid[rowIdx][colIdx] ? this.grid[rowIdx][colIdx] : " "
        );
      }
      strs.push(`${marks.join('|')}\n`);
    }

    console.log(strs.join('-----\n'));
  }

  winner() {
    const posSeqs = [
      // horizontals
      [[0, 0], [0, 1], [0, 2]],
      [[1, 0], [1, 1], [1, 2]],
      [[2, 0], [2, 1], [2, 2]],
      // verticals
      [[0, 0], [1, 0], [2, 0]],
      [[0, 1], [1, 1], [2, 1]],
      [[0, 2], [1, 2], [2, 2]],
      // diagonals
      [[0, 0], [1, 1], [2, 2]],
      [[2, 0], [1, 1], [0, 2]]
    ];

    for (let i = 0; i < posSeqs.length; i++) {
      const winner = this.winnerHelper(posSeqs[i]);
      if (winner != null) {
        return winner;
      }
    }

    return null;
  }

  winnerHelper(posSeq) {
    for (let markIdx = 0; markIdx < Board.marks.length; markIdx++) {
      const targetMark = Board.marks[markIdx];
      let winner = true;
      for (let posIdx = 0; posIdx < 3; posIdx++) {
        const pos = posSeq[posIdx];
        const mark = this.grid[pos[0]][pos[1]];

        if (mark != targetMark) {
          winner = false;
        }
      }

      if (winner) {
        return targetMark;
      }
    }

    return null;
  }

  duplicate(board){
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        this.grid[i][j] = board.grid[i][j];
      }
    }
  }

  static isValidPos(pos) {
    return (0 <= pos[0]) &&
    (pos[0] < 3) &&
    (0 <= pos[1]) &&
    (pos[1] < 3);
  }

  static makeGrid() {
    const grid = [];

    for (let i = 0; i < 3; i++) {
      grid.push([]);
      for (let j = 0; j < 3; j++) {
        grid[i].push(null);
      }
    }

    return grid;
  }
}

Board.marks = ['x', 'o'];

module.exports = Board;


/***/ },
/* 2 */
/***/ function(module, exports) {


const MoveError = function (msg) { this.msg = msg; };

// MoveError really should be a child class of the built in Error object provided
// by Javascript, but since we haven't covered inheritance yet, we'll just
// let it be a vanilla Object for now!

module.exports = MoveError;


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

const Superbrain = __webpack_require__(5);

class View {
  constructor(game, $el) {
    this.$el = $el;
    this.game = game;
    this.setupBoard();
    this.bindEvents();
    
  }


  bindEvents() {

    $("li").on("click",(e)=>{
      const square = $(e.currentTarget).off();
      const mark = this.game.currentPlayer
      square.addClass(mark).text(mark);

      square.css({
        'background-color': 'white',
        "font-size": 60,
        "text-align": "center",
        "font-family": "system-ui",
        "font-weight": 'bold'
      });

      var prev_pos = this.makeMove(square);
      
      if (this.game.isOver()) {
        //add the line to tell the result
        if (this.game.winner()) {
            if(this.game.winner()==='o'){
              const test = $("<p></p>").text("Aha, AI just beat your ass!!!").css({
                "font-size": 40,
                "text-align": "center",
                "font-family": "system-ui",
                "font-weight": 'bold'
              });
              this.$el.append(test);
              $("li").off();
              //change the font to white and color to green. 
              $("." + mark).css({
                'background-color': 'green',
                'color': "white"
              });
              $("li:not(." + mark + ")").css({
                'background-color': 'white',
                'color': "red"
              });
            }else{
              const test = $("<p></p>").text("You are the winner!!!").css({
                "font-size": 40,
                "text-align": "center",
                "font-family": "system-ui",
                "font-weight": 'bold'
              });
              this.$el.append(test);
              $("li").off();
              //change the font to white and color to green. 
              $("." + mark).css({
                'background-color': 'green',
                'color': "white"
              });
              $("li:not(." + mark + ")").css({
                'background-color': 'white',
                'color': "red"
              });
            }

          //when it is a tie 
        } else {
          const test = $("<p></p>").text("This is a tie.").css({
            "font-size": 40,
            "text-align": "center",
            "font-family": "system-ui",
            "font-weight": 'bold'
          });
          this.$el.append(test);
          $("li").css({
            'background-color': 'white',
            'color': "red"
          });
        }
      }else{


        //superbrain play the next move....

        if (mark === "x") {
          //give me a position and problem solved
          var AI = Superbrain.super_move(this.game,prev_pos);
          console.log(AI);
          //*************************************************//
          var move = AI[0] * 3 + AI[1] 
          $($("li")[move]).trigger("click");
        }

      }
    });


  }

  makeMove(square) {
    //back-end side 
    const pos = square.attr("data-pos");
    var position = [parseInt(pos[0]), parseInt(pos[2])];
    this.game.playMove(position);
    return position;
  }

  setupBoard() {
    //create <ul>
    for(let r = 0; r < 3; r++){
      const $ul = $("<ul>").addClass("row").addClass("group");
      // create <li>
      for (let c = 0; c < 3; c++){
        let $li = $("<li>").addClass("sqaure").attr("data-pos",[r,c]);
        $li.hover(function(event){
          const current = $(event.currentTarget);
          current.css('background-color','yellow');
        });
        $li.mouseleave(function(e){
          const current = $(e.currentTarget);
          current.css('background-color', 'gray');
        });
        $ul.append($li);
      }
      this.$el.append($ul);
    }

  }









}

module.exports = View;


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

const Board = __webpack_require__(1);

class Node{


    constructor(board,next_mark,prev_pos=null){
        this.board = board;
        this.prev_pos =prev_pos;
        this.next_mark = next_mark;
    }


    is_losing_node(evaluator){

        if(this.board.isOver()){

            return this.board.winner()!==evaluator && this.board.winner()!== null;
        }

        if (this.next_mark === evaluator){
            return this.children().every(child=>{return child.is_losing_node(evaluator)});
        }else{
            return this.children().some(child => { return child.is_losing_node(evaluator)});
        }
    }

    is_winning_node(evaluator) {

        if (this.board.isOver()) {
            return this.board.winner() === evaluator;
        }

        if (this.next_mark === evaluator) {
            return this.children().some(child => { return child.is_winning_node(evaluator) });
        } else {
            return this.children().every(child => { return child.is_winning_node(evaluator) });
        }
    }

    children(){
        var children = [];
        for(let r = 0; r < 3; r++){
            for (let c = 0; c < 3; c++) {
                let pos = [r, c]
                if(this.board.isEmptyPos(pos)){
                    var new_board = new Board;
                   ///////////////////////////
                    new_board.duplicate(this.board);
                    new_board.placeMark(pos,this.next_mark);
                    var next = this.next_mark === "o"? "x":"o";
                    children.push(new Node(new_board,next,pos));
                }
            };
        };
        return children;
    }

}


module.exports = Node;

// var board = new Board;
// board.placeMark([0, 0],'x');
// board.placeMark([0, 1], 'o');
// board.placeMark([1, 0], 'x');
// board.placeMark([0, 2], 'o');

// var node = new Node(board,'x',[0,2]);

// node.board.print();

// console.log(node.is_winning_node('o'));



// node.children().forEach(ele=>{
//     ele.board.print();
//     console.log(ele.is_winning_node('o'));

// });

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

const Node = __webpack_require__(4);
const Game = __webpack_require__(0);

class Superbrain{


    static super_move(game,prev_pos){

        const node = new Node(game.board,game.currentPlayer,prev_pos);
        
        const children = node.children();



        let possible_outcome = children.filter((child) => {
            return child.is_winning_node("o");
        });



        if(possible_outcome.length){
            var select = Math.floor(Math.random()*(possible_outcome.length-1));
            return possible_outcome[select].prev_pos;

        }else{
            let compromise = children.filter((child) => {
                return !child.is_losing_node("o");
            });
            var select_com = Math.floor(Math.random() * (compromise.length - 1));
            return compromise[select_com].prev_pos;
        }

    }


    static random_move(board){
        var row = Math.floor(Math.random() * 3);
        var col = Math.floor(Math.random() * 3);

        while(!board.isEmptyPos([row,col])){
            col = Math.floor(Math.random() * 3);
            row = Math.floor(Math.random() * 3);
        };

        return [row,col];
    }


    
}


module.exports = Superbrain;


// var game = new Game;
// game.playMove([0,0]);
// game.playMove([0,1]);
// game.playMove([1,0]);
// Superbrain.super_move(game, [1, 0])



/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

const View = __webpack_require__(3)
const Game = __webpack_require__(0)

  $(() => {
    // Your code here
    const game = new Game;
    new View(game,$("figure"));
  });


/***/ }
/******/ ]);