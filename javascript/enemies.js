var enemies = new Array(ENEMIES_NUMBER);

function goblin() {
    this.alive = true;
    this.posx = 1+Math.floor(Math.random()*(MAX_WIDTH-2));
    this.posy = 1+Math.floor(Math.random()*(MAX_WIDTH-2));
    while (room[this.posx][this.posy].type == 1) {
        this.posx = 1+Math.floor(Math.random()*(MAX_WIDTH-2));
        this.posy = 1+Math.floor(Math.random()*(MAX_WIDTH-2));
    }
    this.health_points = GOBLIN_HEALTH;
    this.damage = GOBLIN_DAMAGE;
    this.speed = GOBLIN_SPEED;
    this.IsThere = function(itx,ity) {
        if (this.posx == itx && this.posy == ity) {return true;}
        else {return false;}
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
            if (player.posx == this.posx+dirx && player.posy == this.posy+diry) {
                this.Attack(this.damage);
                break;
            }
            if (display[this.posx+dirx][this.posy+diry] == GOBLIN_CHAR) {break;}
            this.posx += dirx;
            this.posy += diry;
            Refresh ();
        }
    };
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
    this.Pursue = function() {
        if (player.posx != this.posx || player.posy != this.posy) {
            var paramx = Dir(player.posx - this.posx)*this.speed;
            var paramy = Dir(player.posy - this.posy)*this.speed;
            this.Move(paramx,paramy);
        }
    };
}