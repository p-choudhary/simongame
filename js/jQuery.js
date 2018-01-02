var chain = [];
var userClick = [];
var sounds =[
"https://s3.amazonaws.com/freecodecamp/simonSound1.mp3", "https://s3.amazonaws.com/freecodecamp/simonSound2.mp3", "https://s3.amazonaws.com/freecodecamp/simonSound3.mp3", "https://s3.amazonaws.com/freecodecamp/simonSound4.mp3"
];
var red = "red";
var blue = "blue";
var yellow = "yellow";
var green = "green";
var colors = [red, blue, yellow, green];
var color;
var redSound = new Audio(sounds[0]);
var blueSound = new Audio(sounds[1]);
var yellowSound = new Audio(sounds[2]);
var greenSound = new Audio(sounds[3]);
var errorSound = new Audio("https://www.freesfx.co.uk/rx2/mp3s/10/12671_1442589611.mp3");
var sound;

$("#start").on("click", function(){
  $(".button").removeClass("lit")
  $("#counter").text("00");
  chain = [];
  userClick = [];
  game();
});

$("#reset").on("click", function(){
  $(".button").removeClass("lit")
  $("#counter").text("00");
  chain = [];
  userClick = [];
  $(".button").off();
});

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}

function randomNum() {
  return Math.floor(Math.random() * 4);
}

function game(){
  function addToChain(){
    chain.push(colors[randomNum()]);
  }
  
  function displayChain() {
    $("#counter").text(chain.length);
    var done = 1;
    doThing(chain[0]);
    function doThing(color) {
      playSound(color);
      var effect = $("#" + color).addClass("lit").delay(500).queue(function(){
        $("#" + color).removeClass("lit").dequeue();
      }, 1000);
      $.when(effect).done(function() {
        if (done < chain.length) {
          done++;
          doThing(chain[done-1]);
        }
      });
    }
  }

  function playSound(color){
    if(color === "green"){
      greenSound.play();
    }
    if(color === "red"){
      redSound.play();
    }
    if(color === "yellow"){
      yellowSound.play();
    }
    if(color === "blue"){
      blueSound.play();
    }
  }
  
  function checkIfCorrect(arr1,arr2){
    for(var i = arr1.length; i--;) {
      if(arr1[i] !== arr2[i]){
        console.log("BAH!")
        $(".button").off();
        $("#counter").text("00");
        //alert("Wrong! Game Over.");
        return false;
      }
    }
    return true;
  }
  
  addToChain();
  displayChain();
  
  $(".button").on("click", function(){
    playSound(this.id);
    $(this).addClass("lit").delay(250).queue(function(){
      $(this).removeClass("lit").dequeue();
    });
    userClick.push(this.id);
    console.log(userClick, chain);
    for(var i in userClick){
      if(chain[i] !== userClick[i]){
        console.log("Mistake!")
        errorSound.play();
        userClick = [];
        setTimeout(function(){
          displayChain();
        }, 1500)
      }
    }
    if (userClick.length === chain.length) {
      checkIfCorrect(userClick,chain);
      userClick = [];
      addToChain();
      setTimeout(function(){
         displayChain();
      }, 1500)
    }
  })  
  
}
