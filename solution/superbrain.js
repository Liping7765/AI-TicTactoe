const Node = require("./node.js");
const Game = require("./game");

class Superbrain{


    static super_move(game,prev_pos){

        const node = new Node(game.board,game.currentPlayer,prev_pos);
        
        const children = node.children();



        let possible_outcome = children.filter((child) => {

            return child.is_winning_node("o");
        });


        if(possible_outcome.length){
  
            return possible_outcome[0].prev_pos;

        }else{
            let compromise = children.filter((child) => {

                return !child.is_losing_node("o");
            });
            return compromise[0].prev_pos;
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




