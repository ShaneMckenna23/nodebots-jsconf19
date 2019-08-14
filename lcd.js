var five = require("johnny-five");
var axios = require("axios");
var Tessel = require("tessel-io");
var SpotifyApi = require("spotify-web-api-node");

var board = new five.Board({
  io: new Tessel()
});

var spotifyApi = new SpotifyApi({
  clientId: "007e545253024e3ea05a844fd33c0f19",
  clientSecret: "4d8557beef154db8ac7c1ae8c4ac5f84"
});

spotifyApi.setAccessToken(
  "BQB9B2vRnfBwHkktSEFBqPcGbw7i2EFiGourPy2-qkc518wHmO1ySQPMoezcQ4FYEoCww62B_YosO6LVhKcwhBqmj_pvZczTYxly_gaq4Cr7bQ6Nrhhg5QQpF4Gcr97o8-iRnKChAW9KpLhWSpaABO6yPX7W06BDvul4vU4bqGuhRtB3e-q3AMDhz9dCxX46F-X1aEWqnnF85qX4thJXuI64TWlnr5Hw9vh-8sAmhAORHppDCFuezh-Zv2IY3ASjIZZdq9DCpuKUeESngZNx2AnLX24cCgVBoQ"
);

board.on("ready", function() {
  var lcd = new five.LCD({
    pins: ["a2", "a3", "a4", "a5", "a6", "a7"]
  });

  setInterval(getCurrentSong, 5000);

  function getCurrentSong() {
    spotifyApi.getMyCurrentPlaybackState({}).then(
      function(data) {
        const song = data.body.item.name;
        lcd.cursor(0, 0).print(song);
        console.log("Now Playing: ", data.body);
      },
      function(err) {
        lcd.cursor(1, 0).print("00".repeat(8));
        console.log("Something went wrong!", err);
      }
    );
  }
});
