const Superbrain = require("../solution/superbrain.js");

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
