var abanibiCounter = 0;
var abanibiFired = false;
var secondTime = false;
var longPress = false;
var timebetween = 0;
var count = null;
var fired = false;
var pressState = 'free';
var canPlayAfterKiss = false;
var soundKiss1 = new Howl({
  src: ['kiss1.mp3']
});
var soundKiss2 = new Howl({
  src: ['kiss2.mp3']
});
var soundKiss3 = new Howl({
  src: ['kiss3.mp3']
});
var soundKiss4 = new Howl({
  src: ['kiss4.mp3']
});
const kissesArray = [soundKiss1, soundKiss2, soundKiss3, soundKiss4];
var soundLong = new Howl({
  src: ['long1.mp3']
});
var soundShort = new Howl({
  src: ['short.mp3']
});
var soundAbanibi = new Howl({
  src: ['abanibi.mp3']
});
var soundSecond1 = new Howl({
  src: ['second1.mp3']
});
var soundSecond2 = new Howl({
  src: ['second2.mp3']
});
var soundSecond3 = new Howl({
  src: ['second3.mp3']
});

var playingNow = soundKiss1;
document.addEventListener('keydown', (event) => {
  if(!fired) {
    playingNow.stop();
    abanibiCounter++;
    abanibiFired = false;
    if(abanibiCounter>10){
      console.log('abanibi');
      playingNow = soundAbanibi;
      playingNow.play();
      abanibiCounter = 0;
      pressState = 'free';
      abanibiFired = true;
    }
    fired= true;
    timebetween = 0;
    if(pressState == 'free' &! abanibiFired){
      var kissRand = Math.floor((Math.random() * 4));
      playingNow = kissesArray[kissRand];
      playingNow.play();
      console.log('kiss');
      secondTime = false;
    }
    if(pressState == 'press1'){
      console.log('second time');
      var secondRand = Math.floor((Math.random() * 7) + 1);
      if(secondRand == 7){
        playingNow = soundSecond2;
      }
      else if(secondRand == 2 || secondRand == 5){
        playingNow = soundSecond3;
      }
      else{
        playingNow = soundSecond1;
      }
      playingNow.play();
      pressState = 'free';
      secondTime = true;      
    }
    count = setInterval(function(){
        timebetween++;
        //console.log(timebetween);
        if(timebetween > 1000 && !longPress){
          console.log(playingNow);
          playingNow.stop();
          playingNow = soundLong;
          playingNow.play();
          console.log('long');
          longPress = true;
          clearInterval(count);
        }
    }, 1);
    //sound.play();
  }
});
document.addEventListener('keyup', (event) => {
  abanibiFired = false;
  fired = false;
  longPress = false;
  clearInterval(count);
  if(timebetween <= 1000 && pressState=='free' &! secondTime &! abanibiFired){
    var regaTimeout = setTimeout(function(){
      console.log('rega rega');
      playingNow = soundShort;
      playingNow.play();
      pressState = 'press1';
    }, 1000);
  }
  else if(timebetween > 1000 ){
    pressState = 'free';
  }
  //console.log("final time is" +timebetween);
});