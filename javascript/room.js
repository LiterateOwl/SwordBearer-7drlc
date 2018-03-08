var room;

function Tile() {
    this.type = 0;
    this.changetype = function (t) {
        this.type = t;
    }
};

function PathClear() {
    var middlex = Math.floor(MAX_WIDTH/2);
    var middley = Math.floor(MAX_HEIGHT/2);
    for (var a = 2; a < MAX_WIDTH-2; a++) {
        for (var b = 2; b < MAX_HEIGHT-2; b++) {
            if (a == middlex && b == middley) {
                room[a][b].changetype(0);
            }
        }
    }
}

function GenObstacles() {
    for (var a = 1; a < MAX_WIDTH-1; a++) {
        for (var b = 1; b < MAX_HEIGHT-1; b++) {
            if (a == 1 && b == 1) {continue;}
            var i = Math.floor(Math.random()*101);
            if (i < WALL_CHANCE_PERCENTILE) {
                room[a][b].changetype(1);
            }
        }
    }
}

function GenRoom() {
    room = new Array(MAX_WIDTH);
    for (var x = 0; x < MAX_WIDTH; x++) {
        room[x] = new Array(MAX_HEIGHT);
        for (var y = 0; y < MAX_HEIGHT; y++) {
            room[x][y] = new Tile;
            if (x == 0 || x == MAX_WIDTH-1 || y == 0 || y == MAX_HEIGHT-1) {
                room[x][y].changetype(1);
            }
        }
    }
    //GenObstacles();
    //PathClear();
}