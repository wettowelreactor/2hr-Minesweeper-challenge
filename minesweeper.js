//Minesweeper built in 2 hour challenge
window.game = {
  width: 10,
  height: 10,
  numBombs: 0,
  board: [],
  test: function(){
    this.initialize();
    this.printBoard();
  },
  initialize: function() {
    this.board = [];
    this.numBombs = 0;
    this.initBoard();
    this.scoreBoard();
    this.countNumBombs();
  },
  countNumBombs: function() {
    for (row = 0; row < this.height; row += 1) {
      for (var col = 0; col < this.width; col += 1) {
        if (this.isBomb(row, col)) {
          this.numBombs += 1;
        }
      }
    }
  },
  initBoard: function() {
    for (var row = 0; row < this.height; row += 1) {
      this.board.push({});
    }

    for (row = 0; row < this.height; row += 1) {
      for (var col = 0; col < this.width; col += 1) {
        var value = 0;
        if (Math.floor(Math.random() * 10) < 3) {
          value = 9;
        }
        this.board[row][col] = value;
      }
    }
  },
  scoreBoard: function() {
    for (var row = 0; row < this.height; row += 1) {
      for (var col = 0; col < this.width; col += 1) {
        for (var yoffset = -1; yoffset <= 1; yoffset += 1) {
          for (var xoffset = -1; xoffset <= 1; xoffset += 1) {
            var x = row + xoffset;
            var y = col + yoffset;
            if (!this.isBomb(row,col) && this.isValidPosition(x,y) && this.isBomb(x, y)) {
              this.board[row][col] += 1;
            }
          }
        }
      }
    }
  },
  isValidPosition: function(row, col) {
    return row >= 0 && col >= 0 && row < this.height && col < this.width;
  },
  isBomb: function(row, col) {
    return this.board[row][col] === 9;
  },
  printBoard: function() {
    for (var row = 0; row < this.height; row += 1) {
      console.log(this.board[row]);
    }
  }
};

$(function(){
  for (var row = 0; row < game.height; row += 1) {
    $('.gamearea').append('<div data-row=' + row +'></div>');
  }
  for (row = 0; row < game.height; row += 1) {
    var rowval = 'div[data-row="' + row + '"]';
    $row = $(rowval);
    for (col = 0; col < game.width; col += 1) {
      colval = '<div class="cell" data-row=' + row +' data-col=' + col + '></div>';
      $row.append(colval);
    }   
  }

  var click = function(e, d) {
    $cell = $(e.currentTarget);
    var row = $cell.data('row');
    var col = $cell.data('col');
    $cell.addClass('clicked');
    if (game.isBomb(row, col)) {
      $cell.html('<h3> * </h3>');
      gameOver();
    } else {
      $cell.html('<h3>' + game.board[row][col] + '</h3>');
      if ($('.cell').not('.clicked').length === game.numBombs) {
        gameWin();
      }
    }

  };

  var gameOver = function() {
    $('.cell').off();
    $('.title').html('<h1>GAME OVER</h1><h2>Click here to restart</h2>');
    $('.title').on('click', startGame);
  };

  var gameWin = function() {
    $('.cell').off();
    $('.title').html('<h1>You Win</h1><h2>Click here to restart</h2>');
    $('.title').on('click', startGame);
  };

  var startGame = function() {
    $('.cell').removeClass('clicked');
    $('.cell').html('');
    $('.title').html('');
    $('.title').off();
    $('.cell').on('click', click.bind(this));
    game.test();
  };

  startGame();
});
