var Tessel = require("tessel-io");
var five = require("johnny-five");

var board = new five.Board({
  io: new Tessel()
});

board.on("ready", () => {
  var led = new five.Led.RGB({
    pins: {
      red: "b2",
      green: "b3",
      blue: "b5"
    }
  });

  var index = 0;
  var rainbow = [
    "white",
    "black",
    "red",
    "orange",
    "yellow",
    "green",
    "blue",
    "indigo",
    "violet"
  ];

  board.loop(1000, () => {
    led.color(rainbow[index]);
    index = index + 1;
    if (index === rainbow.length) {
      index = 0;
    }
  });
});
