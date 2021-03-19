const Board = require("./board");

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