//room generation
const MAX_WIDTH = 20;
const MAX_HEIGHT = 20;
const FLOOR = 0;
const WALL = 1;
const WALL_CHANCE_PERCENTILE = 5;
const ENEMIES_NUMBER = 5;

//enemies
//goblin
const GOBLIN_HEALTH = 1;
const GOBLIN_DAMAGE = 1;
const GOBLIN_SPEED = 1;
//knight
const KNIGHT_HEALTH = 1;
const KNIGHT_DAMAGE = 1;
const KNIGHT_SPEED = 2;
const KNIGHT_CHARGE_RANGE = 3;

//player
const PLAYER_HEALTH = 3;
const SWIPE_DAMAGE = 1;
const SWORD_JUMP_1_DAMAGE = 1;
const SWORD_JUMP_2_DAMAGE = 1;
const THRUST_DAMAGE = 1;

//display
const FLOOR_CHAR = "_";
const WALL_CHAR = "#";
const PLAYER_CHAR = "P";
const GOBLIN_CHAR = "g";
const KNIGHT_CHAR = "k";
const DAMAGE_CHAR = "X"