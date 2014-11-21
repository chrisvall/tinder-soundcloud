// var getTracks = function(tracks) { 
// 	var url = 'https://api.soundcloud.com/tracks.json?client_id=33e7a0df888ec6bed1d7188d1a861a28';
// 	$.getJSON(url, function(tracks) {
//   $(tracks).each(function(track) {
//     console.log(track.title); });
// 	});
// };

// getTracks('daft-punk-random-access');

// soundManager.setup({
//   url: '/',
//   flashVersion: 9, // optional: shiny features (default = 8)
//   // optional: ignore Flash where possible, use 100% HTML5 mode
//   // preferFlash: false,
//   onready: function() {
//     // Ready to use; soundManager.createSound() etc. can now be called.
//   }
// });

var ready;
ready = function() {
  SC.initialize({
    client_id: '33e7a0df888ec6bed1d7188d1a861a28',
    redirect_uri: 'http://' + location.hostname + ':3000' + '/callback.html'
  });

  SC.get('/tracks', { genres: 'electronica' }, function(tracks) {
    $(tracks).each(function(index, track) {
       $('#results').append($('<li></li>').html(track.title + ' - ' + track.genre + ' - ' + track.id ));
      });
  });

  $('a.connect').click(function(e) {
    e.preventDefault();
    SC.connect(function() {
        SC.get('/me', function(me) {
            $('#username').html(me.username + ' ' + me.full_name);
        });
    });
  });

SC.get('/tracks/169427466', function(track) {
    $('#player span').html(track.title + ' ' + track.genre);
    $('#player img').attr('src', track.artwork_url)
    // SC.oEmbed(track.permalink_url, document.getElementById('player'));
});

  SC.stream('/tracks/169427466', function(sound) {
      $('#start').click(function(e) {
          e.preventDefault();
          sound.start();
      });
      $('#stop').click(function(e) {
          e.preventDefault();
          sound.stop();
      });
  });
};

$(document).ready(ready);
$(document).on('page:load', ready);
// var track_url = 'http://soundcloud.com/forss/flickermood';
// SC.oEmbed(track_url, { auto_play: true }, function(oEmbed) {
//   console.log('oEmbed response: ' + oEmbed);
// });

// SC.get("/groups/55517/tracks", {limit: 1}, function(tracks){
//   alert("Latest track: " + tracks[0].title);
// });

