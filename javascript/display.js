var display = new Array(MAX_WIDTH);
for (var X = 0; X < MAX_WIDTH; X++) {
    display[X] = new Array(MAX_HEIGHT);
}

function Paint() {
    var print = "";
    for (var b = MAX_HEIGHT-1; b >= 0; b--) {
        for (var a = 0; a < MAX_WIDTH; a++) {
            if (display[a][b] == undefined) {display[a][b] = "X";}
            print = print + display[a][b];
        }
        print = print + "<br>";
    }
    document.getElementById("board").innerHTML = print;
}

function CheckForEnemy(cx,cy) {
    for (var e = 0; e < enemies.length; e++) {
        if (enemies[e].IsThere(cx,cy)) {return true;}
    }
    return false;
}

function Refresh() {
    for (var x = 0; x < MAX_WIDTH; x++) {
        for (var y = 0; y < MAX_HEIGHT; y++) {
                if (player.posx == x && player.posy == y) {
                    display[x][y] = player.health_points;
                    continue;
                }
                if (CheckForEnemy(x,y)) {
                    display[x][y] = GOBLIN_CHAR;
                    continue;
                }
                switch (room[x][y].type) {
                    case 0: display[x][y] = FLOOR_CHAR; break;
                    case 1: display[x][y] = WALL_CHAR; break;
                }
        }
    }
    Paint();
}

/*function Flash(dx,dy) {
    var d = display[dx][dy];
    display[dx][dy] = DAMAGE_CHAR;
    Paint();
    display[dx][dy] = d;
    var wait = true;
    setInterval(wait=false,30);
    while (wait) {};
    Paint();
}*/