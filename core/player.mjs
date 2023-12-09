/* This module defines the player and its movement.
 * It exposes the Player class to Micro.common.
 */

class Player extends Micro.render.Character {
    kind = "micro:Player"
    moveVector = [0, 0];
    constructor(pos, size){
        super('◇', pos, size, 2);
        this.maxSpeed = 3;
        this.enableControls();
        this.light = 5;
    }
    enableControls(){
        this.controls = [
            Micro.controls.registerControl('ArrowLeft', (p)=>{
                this.addMovement([-3, 0]);
                p.then(()=>{this.subtractMovement([-3, 0])});
            }, false),
            Micro.controls.registerControl('ArrowRight', (p)=>{
                this.addMovement([3, 0]);
                p.then(()=>{this.subtractMovement([3, 0])});
            }, false),
            Micro.controls.registerControl('ArrowUp', (p)=>{
                this.addMovement([0, -3]);
                p.then(()=>{this.subtractMovement([0, -3])});
            }, false),
            Micro.controls.registerControl('ArrowDown', (p)=>{
                this.addMovement([0, 3]);
                p.then(()=>{this.subtractMovement([0, 3])});
            }, false),
            Micro.controls.registerControl('Space', ()=>{
                Micro.common.Tile.topAtPos(Math.round(this.x), Math.round(this.y))?.activate?.();
            })
        ]
    }
    disableControls(){
        Micro.controls.relinquishKey('ArrowLeft', this.controls[0]);
        Micro.controls.relinquishKey('ArrowRight', this.controls[1]);
        Micro.controls.relinquishKey('ArrowUp', this.controls[2]);
        Micro.controls.relinquishKey('ArrowDown', this.controls[3]);
        Micro.controls.relinquishKey('Space', this.controls[4]);
        delete this.controls;
    }
    addMovement(vector){
        this.moveVector[0] += vector[0];
        this.moveVector[1] += vector[1];
    }
    subtractMovement(vector){
        this.moveVector[0] -= vector[0];
        this.moveVector[1] -= vector[1];
    }
    render(renderChar){
        Micro.common.world.generateTerrain();
        let millisecondsPassed = isFinite(1000/Micro.render.fps)?1000/Micro.render.fps:0;
        let oldPos = [this.x, this.y];
        this.x = parseFloat((this.x+(this.moveVector[0]*millisecondsPassed/1000)).toFixed(2));
        this.y = parseFloat((this.y+(this.moveVector[1]*millisecondsPassed/1000)).toFixed(2));
        let blocked = false;
        Micro.game.characters.filter((e)=>e.blocksMovement).forEach((e)=>{
            if(Micro.utils.collide(e, Micro.game.player)) blocked = true;
        });
        if(blocked) this.pos = oldPos
        Micro.render.offset = [-this.x, -this.y];
        super.render(renderChar);
        renderChar('◆', [this.x - (this.moveVector[0]/this.maxSpeed)/15*this.size, this.y - (this.moveVector[1]/this.maxSpeed)/15*this.size], this.size*0.5, this.opacity??1, this.light);
        if(this.carrying) {
            this.carrying.pos = this.pos;
            renderChar(this.carrying.char, [this.x + this.size*Math.cos(Date.now()/1000), this.y + this.size*Math.sin(Date.now()/1000)], this.size * 0.5, 1, this.light);
            this.carrying.hover?.();
        } else {
            Micro.common.Tile.topAtPos(Math.round(this.x), Math.round(this.y))?.hover?.();
        }
    }
    //Creates a taxicab circle hitbox.
    doesPointIntersect(x, y){
        if(Math.abs(this.x - x)+Math.abs(this.y - y) < this.size/2) return true
        else return false
    }
    //Returns a list of vertices for the polygonal collision detection.
    vertices(){
        return [
            [this.x + this.size/2, this.y],
            [this.x - this.size/2, this.y],
            [this.x, this.y + this.size/2],
            [this.x, this.y - this.size/2]
        ]
    }
    serialize(){
        let self = super.serialize();
        self.maxSpeed = this.maxSpeed;
        self.carrying = this?.carrying?.id;
        return self;
    }
    static deserialize(s){
        let self = new this(s.pos, s.size);
        self.id = s.id;
        self.kind = s.kind;
        self.char = s.char;
        self.opacity = s.opacity;
        self.exists = s.exists;
        self.layer = s.layer;
        self._carrying = s.carrying;
        console.log("*insert undertale reference here*")
        Micro.game.player = self;
    }
}

Micro.common.Player = Player;
Micro.common.classes["micro:Player"] = Player;
export default Player;