function Dir(n) {
    if (isNaN(n)) {return NaN;}
    if (n < 0) {return -1;}
    if (n > 0) {return 1;}
    return 0;
}

function EnemyTurn() {
    for (var i = 0; i < enemies.length; i++) {
        if (enemies[i].alive) {enemies[i].Pursue();}
    }
}

function IssueCommand(e) {
    if (e.keyCode != 123) {e.preventDefault();}
    switch (e.keyCode) {
        case 37: player.Move(-1,0,true); EnemyTurn(); break;
        case 38: player.Move(0,1,true); EnemyTurn(); break;
        case 39: player.Move(1,0,true); EnemyTurn(); break;
        case 40: player.Move(0,-1,true); EnemyTurn(); break;
    }
    Refresh();
}

function Transition() {
    /*window.alert("to alter the game, change the values in the config file and the settings file")
    window.alert("The player character is displayed as a number, which coincides with your health points. Move with the arrow keys. After every move, the player character will perform an attack chosen form those displayed on the right side of the page, then the enemies will each perform a move and, if possible, an attack.");*/
    GenRoom();
    player.Spawn();
    for (var i = 0; i < enemies.length; i++) {
        enemies[i] = new goblin();
    }
    Refresh();
}

/*var directx = {0,1,1,1,0,-1,-1,-1};
var directy = {1,1,0,-1,-1,-1,0,1};

function nav (desx,desy) {
    
    this.Turn = function (direction,turn) {
        if (direction == 7 && turn == 1) {return 0;}
        if (direction == 0 && turn == -1) {return 7;}
        return direction+turn;
    },
    this.Go: function (direction) {}
}

document.onkeypress = IssueCommand;*/