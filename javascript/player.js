var player = {
    posx: -1,
    posy: -1,
    health_points: PLAYER_HEALTH,
    Spawn: function () {
        this.posx = Math.floor(MAX_WIDTH/2);
        this.posy = Math.floor(MAX_HEIGHT/2);
    },
    Swipe: function () {
        var count = 0;
        for (var atkx = -1; atkx < 2; atkx++) {
            for (var atky = -1; atky < 2; atky++) {
                if (CheckForEnemy(this.posx+atkx,this.posy+atky) != null) {count++;}
            }
        }
        if (count >= 3) {
            //window.alert("swipe");
            for (var atkx = -1; atkx < 2; atkx++) {
                for (var atky = -1; atky < 2; atky++) {
                    for (var e = 0; e < enemies.length; e++) {
                        if (enemies[e].IsThere(this.posx+atkx,this.posy+atky)) {
                            enemies[e].Damage(SWIPE_DAMAGE);
                        }
                    }
                }
            }
            return true;
        }
        return false;
    },
    SwordJump: function (dirx,diry) {
        if (
            display[this.posx+dirx][this.posy+diry] == GOBLIN_CHAR &&
            display[this.posx+(dirx*2)][this.posy+(diry*2)] != GOBLIN_CHAR &&
            display[this.posx+(dirx*3)][this.posy+(diry*3)] == GOBLIN_CHAR
        ) {
            //window.alert("swordjump");
                for (var e = 0; e < enemies.length; e++) {
                    if (enemies[e].IsThere(this.posx+dirx,this.posy+diry)) {
                        enemies[e].Damage(SWORD_JUMP_1_DAMAGE);
                    }
                }
                this.Move(dirx*2,diry*2,false);
                for (var e = 0; e < enemies.length; e++) {
                    if (enemies[e].IsThere(this.posx+dirx,this.posy+diry)) {
                        enemies[e].Damage(SWORD_JUMP_2_DAMAGE);
                    }
                }
                return true;
            
        }
        return false;
    },
    Thrust: function (dirx,diry) {
        for (var e = 0; e < enemies.length; e++) {
            if (enemies[e].IsThere(this.posx+dirx,this.posy+diry)) {
                //window.alert("thrust");
                enemies[e].Damage(THRUST_DAMAGE);
            }
        }
    },
    Attack: function(dirx,diry) {
        if (this.Swipe()) {return;}
        if (this.SwordJump(dirx,diry)) {return;}
        if (this.Thrust(dirx,diry)) {return;}
    },
    Move: function (movx,movy,attack) {
        if (isNaN(movx)) {
            movx = 0;
        }
        if (isNaN(movy)) {
            movy = 0;
        }
        var destx = this.posx+movx;
        var desty = this.posy+movy;
        var dirx = Dir(movx);
        var diry = Dir(movy);
        while (this.posx != destx || this.posy != desty) {
            if (room[this.posx+dirx][this.posy+diry].type == 1) {break;}
            if (CheckForEnemy(this.posx+dirx,this.posy+diry) != null) {break;}
            this.posx += dirx;
            this.posy += diry;
            Refresh ();
        }
        if (attack) {
            this.Attack(dirx,diry);
            Refresh();
        }
    },
    ShowX: function () {
        return this.posx;
    },
    ShowY: function () {
        return this.posy;
    },
    Damage: function (n) {
        this.health_points -= n;
        if (this.health_points < 1) {
            this.Die();
        }
    },
    Die: function () {
        player.health_points = 3;
        window.alert("YOU DIED");
        Transition();
    }
};
