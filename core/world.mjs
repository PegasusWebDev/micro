const world = {
    generateTerrain: function(){
        Micro.render.characters.filter((e)=>e instanceof Micro.game.Tile.tileDictionary['▪']).forEach((e)=>e.remove());
        if(!Micro.settings.data.fill.value) return;
        let origin = [Math.round(Micro.game.player.x), Math.round(Micro.game.player.y)];
        let distance = Micro.game.player.light;
        for(let x = origin[0]-distance; x <= origin[0]+distance; x++){
            for(let y = origin[1]-distance; y <= origin[1]+distance; y++){
                if(Math.abs(origin[0]-x) + Math.abs(origin[1]-y) > distance) continue; 
                if(!Micro.game.Tile.topAtPos(x, y)){
                    Micro.game.Tile.fromChar('▪', x, y, 1);
                }
            }
        }
    }
}

Micro.game.world = world;
export default world;