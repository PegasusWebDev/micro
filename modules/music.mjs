import Howler from './howler.mjs'

window.music = {
  soundtracks: {},
  playingSoundtrack: null,
  init: function(){
    if(world.gameworld.length == 1) this.soundtracks.start.start().next('safe');
    else if(world.player.pos[0]<42 && world.player.pos[1]<4) this.soundtracks.safe.start();
    else this.soundtracks.world.start();
  },
  stop: function(){
    for(var i in this.soundtracks){
      this.soundtracks[i].stop();
    }
  },
  disabled: true
}

class Soundtrack {
  constructor(howls){
    this.tracks = howls;
    this.playing = null;
    this.shouldContinue = true;
  }
  playRandom(){
    var track = this.tracks[Math.floor(Math.random()*this.tracks.length)];
    if(!track) return;
    this.id = track.play();
    this.playing = track;
    track.on('end', ()=>{
      track.stop();
      if(this.shouldContinue) this.playRandom();
      else this.playing = null;
    }, this.id);
    return track;
  }
  stop(){
    if(this.playing) this.playing.fade(1, 0, 1000, this.id);
    this.shouldContinue = false;
    return this;
  }
  start(){
    if (window.music.disabled) return;
    window.music.playingSoundtrack = this;
    this.shouldContinue = true;
    for(var i in window.music.soundtracks){
      if(window.music.soundtracks[i] != this) window.music.soundtracks[i].stop();
    }
    if(this.playing) this.playing.fade(0, 1, 1000, this.id);
    else this.playRandom();
    return this;
  }
  next(name){
    this.playing.on('end', ()=>{
      window.music.soundtracks[name].start();
    }, this.id);
    return window.music.soundtracks[name];
  }
}

window.music.soundtracks.start = new Soundtrack([
  
])

window.music.soundtracks.safe = new Soundtrack ([
  
])

window.music.soundtracks.world = new Soundtrack([
  //March of the Foreigners
  new Howl({
    src: ['assets/ost/March%20of%20the%20Foreigners.wav']
  })
]);

window.music.soundtracks.fight = new Soundtrack([
  
]);

window.music.soundtracks.boss = new Soundtrack([
  //The Wager With Death
  new Howl({
    src: ['assets/ost/The%20Wager%20With%20Death.wav']
  })
]);

window.music.soundtracks.death = new Soundtrack([
  
]);

window.music.soundtracks.quest = new Soundtrack([
  
]);

export default window.music;