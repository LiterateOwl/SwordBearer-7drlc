var enemies = new Array(ENEMIES_NUMBER);

var enemykinds = ["goblin","knight"]
/*var enemystats = new Array(enemykinds.length);
enemystats[0] = [GOBLIN_HEALTH,GOBLIN_DAMAGE,GOBLIN_SPEED];
enemystats[1] = [KNIGHT_HEALTH,KNIGHT_DAMAGE,KNIGHT_SPEED];*/

function enemy(name) {
    this.type = name;
    this.alive = true;
    this.posx = 1+Math.floor(Math.random()*(MAX_WIDTH-2));
    this.posy = 1+Math.floor(Math.random()*(MAX_WIDTH-2));
    while (room[this.posx][this.posy].type == 1 || (this.posx == player.posx && this.posy == player.posy)) {
        this.posx = 1+Math.floor(Math.random()*(MAX_WIDTH-2));
        this.posy = 1+Math.floor(Math.random()*(MAX_WIDTH-2));
    }
    this.IsThere = function(itx,ity) {
        if (this.posx == itx && this.posy == ity) {return true;}
        else {return false;}
    } 
    
    this.Attack = function(n) {
        player.Damage(n);
    };
    this.Die = function() {
        this.alive = false;
        this.posx = null;
        this.posy = null;
        Refresh();
    }
    this.Damage = function(n) {
        this.health_points -= n;
        if (this.health_points < 1) {
            this.Die();
        }
    }
    this.Move = function(movx,movy) {
        if (isNaN(movx)) {
            movx = 0;
        }
        if (isNaN(movy)) {
            movy = 0;
        }
        var destx = this.posx+movx;
        var desty = this.posy+movy;
            
        while (this.posx != destx || this.posy != desty) {
            var dirx = Dir(movx);
            var diry = Dir(movy);
            if (room[this.posx+dirx][this.posy+diry].type == 1) {
                break;
            }
            if (CheckForEnemy(this.posx+dirx,this.posy+diry) != null) {break;}
            if (player.posx == this.posx+dirx && player.posy == this.posy+diry) {break;}
            this.posx += dirx;
            this.posy += diry;
            Refresh ();
        }
    };
    switch (this.type) {
        case "goblin":
            this.health_points = GOBLIN_HEALTH;
            this.damage = GOBLIN_DAMAGE;
            this.speed = GOBLIN_SPEED;
            this.sprite = GOBLIN_CHAR;
            this.Behaviour = function () {
                this.Pursue();
            }
            this.Pursue = function() {
                if (player.posx != this.posx || player.posy != this.posy) {
                    var movrange = this.speed;
                    while (movrange > 0) {
                        var paramx = Dir(player.posx - this.posx);
                        var paramy = Dir(player.posy - this.posy);
                        this.Move(paramx,paramy);
                        movrange--;
                    }
                if (Math.abs(this.posx - player.posx) <= 1 && Math.abs(this.posy - player.posy) <= 1) {
                        this.Attack(this.damage);
                    }
                }
            };
            break;
            
        case "knight":
            this.health_points = KNIGHT_HEALTH;
            this.damage = KNIGHT_DAMAGE;
            this.speed = KNIGHT_SPEED;
            this.sprite = KNIGHT_CHAR;
            this.charging = false;
            this.chargex = 0;
            this.chargey = 0;
            this.Behaviour = function () {
                if (this.charging) {
                    this.Charge(this.chargex,this.chargey);
                    this.charging = false;
                    this.chargex = 0;
                    this.chargey = 0;
                }
                else {
                    if (
                        Math.abs(this.posx-player.posx) <= KNIGHT_CHARGE_RANGE && 
                        Math.abs(this.posy-player.posy) <= KNIGHT_CHARGE_RANGE && (
                            player.posx == this.posx || 
                            player.posy == this.posy || 
                            Math.abs(this.posx-player.posx) == Math.abs(this.posy-player.posy)
                        )
                    ) {
                        this.charging = true;
                        this.chargex = Dir(player.posx - this.posx);
                        this.chargey = Dir(player.posy - this.posy);
                        /*this.Charge(this.chargex,this.chargey);
                        this.chargex = 0;
                        this.chargey = 0;*/
                    }
                    else {
                        this.Pursue();
                    }
                }
            };
            this.Pursue = function() {
                var movrange = this.speed;
                while (movrange > 0) {
                    var paramx = Dir(player.posx - this.posx);
                    var paramy = Dir(player.posy - this.posy);
                    this.Move(paramx,paramy);
                    movrange--;
                }
            };
            /*this.Setup = function () {
                if (Math.abs(this.posx-player.posx) < Math.abs(this.posy-player.posy)) {
                    if (this.posy == player.posy) {
                        var movrange = Math.abs(this.posx-player.posx);
                        while (movrange > 0) {
                            this.Move(0,1);
                            movrange--;
                        }
                    }
                    else if (this.posx == player.posy) 
                }
                else if ()
                else {
                    var movrange = this.speed;
                    while (movrange > 0) {
                        var paramx = Dir(player.posx - this.posx);
                        this.Move(paramx,0);
                        movrange--;
                    }
                }
                
            };*/
            this.Charge = function (chx,chy) {
                this.Move(chx*KNIGHT_CHARGE_RANGE,chy*KNIGHT_CHARGE_RANGE);
                if (player.posx == this.posx+chx && player.posy == this.posy+chy) {
                    this.Attack(this.damage);
                }
                if (CheckForEnemy(this.posx+chx,this.posy+chy) != null) {
                    for (var e = 0; e < enemies.length; e++) {
                        if (enemies[e].IsThere(this.posx+chx,this.posy+chy)) {
                            enemies[e].Damage(this.damage);
                        }
                    }
                }
            };
            break;
    }
    
}