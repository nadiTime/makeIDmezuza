var playSound = function(soundToPlay, freeToPlay){
  if(freeToPlay){
    soundToPlay.play();
    freeToPlay = false;
    soundToPlay.on('end', function(){
      freeToPlay = true;
    });
  }
}