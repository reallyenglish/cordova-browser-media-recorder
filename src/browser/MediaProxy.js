// var jQuery = require('com.reallyenglish.cordova.plugin.browser-media.jQuery');
var jQuery = window.com.reallyenglish.cordova.plugin.browsermedia.lib.jQuery;
jQuery.noConflict(true);

var MEDIA_CAN_PLAY_THROUGH = 5;

module.exports = {
  create: function(){
    var onStatusCallback = Array.prototype.slice.call(arguments, 0, 1)[0],
        args = Array.prototype.slice.call(arguments, 2)[0],
        id = args[0],
        src = args[1];

    console.log('MediaProxy#create onStatusCallback', onStatusCallback);
    console.log('MediaProxy#create id', id, 'src', src);

    jQuery( document ).ready(function() {
      console.log('MediaProxy#create document ready');

      var playerDiv = document.createElement("div");
      playerDiv.id = 'jquery_jplayer_' + id;

      document.body.appendChild(playerDiv);
      // http://www.freesfx.co.uk/rx2/mp3s/10/11333_1399100038.mp3

      jQuery('#' + playerDiv.id).jPlayer({
        noConflict: 'window.com.reallyenglish.cordova.plugin.browsermedia.lib.jQuery',
        ready: function(){
          jQuery(this).jPlayer("setMedia", {
            mp3: src
          });
        },

        canplaythrough: function(e){
          console.log('MediaProxy#create CANPLAYTHROUGH event', e);
          onStatusCallback(id, MEDIA_CAN_PLAY_THROUGH);
        },

        play: function(e){
          console.log('MediaProxy#create PLAY event', e);
        },

        pause: function(e){
          console.log('MediaProxy#create PAUSE event', e);
        },

        seeking: function(e){
          console.log('MediaProxy#create SEEKING event', e);
        },

        volumechange: function(e){
          console.log('MediaProxy#create VOLUMECHANGE event', e);
        },

        wmode:"window",
        supplied: "mp3",
        swfPath: "scripts/jquery.jplayer.swf",
        preload: 'auto',
        solution: 'html, flash'
      });
    });
  },

  startPlayingAudio: function(){
    var args = Array.prototype.slice.call(arguments, 2)[0],
        id = args[0],
        src = args[1],
        options = args[2],
        jPlayerId = 'jquery_jplayer_' + id;

    if(!jQuery('#' + jPlayerId)){ return; }

    console.log('MediaProxy#startPlayingAudio jPlayerId', jPlayerId);
    jQuery('#' + jPlayerId).jPlayer('play');
  },

  stopPlayingAudio: function(){
    var args = Array.prototype.slice.call(arguments, 2)[0],
        id = args[0],
        jPlayerId = 'jquery_jplayer_' + id;

    if(!jQuery('#' + jPlayerId)){ return; }

    console.log('MediaProxy#stopPlayingAudio jPlayerId', jPlayerId);
    jQuery('#' + jPlayerId).jPlayer('stop');
  },

  seekToAudio: function(){
    var args = Array.prototype.slice.call(arguments, 2)[0],
        id = args[0],
        milliseconds = parseInt(args[1], 10),
        seconds = milliseconds / 1000,
        jPlayerId = 'jquery_jplayer_' + id;

    if(!jQuery('#' + jPlayerId)){ return; }

    console.log('MediaProxy#seekToAudio jPlayerId', jPlayerId, 'seconds', seconds);
    jQuery('#' + jPlayerId).jPlayer('play', seconds);
  },

  pausePlayingAudio: function(){
    var args = Array.prototype.slice.call(arguments, 2)[0],
        id = args[0],
        jPlayerId = 'jquery_jplayer_' + id;

    if(!jQuery('#' + jPlayerId)){ return; }

    console.log('MediaProxy#pausePlayingAudio jPlayerId', jPlayerId);
    jQuery('#' + jPlayerId).jPlayer('pause');
  },

  getCurrentPositionAudio: function(){ console.log('getCurrentPositionAudio!'); },

  startRecordingAudio: function(){},

  stopRecordingAudio: function(){},

  release: function(){
    var args = Array.prototype.slice.call(arguments, 2)[0],
        id = args[0],
        jPlayerId = 'jquery_jplayer_' + id;

    if(!jQuery('#' + jPlayerId)){ return; }

    console.log('MediaProxy#release jPlayerId', jPlayerId);
    jQuery('#' + jPlayerId).jPlayer('destroy');
  },

  setVolume: function(){
    var args = Array.prototype.slice.call(arguments, 2)[0],
        id = args[0],
        volume = parseFloat(args[1]),
        jPlayerId = 'jquery_jplayer_' + id;

    if(!jQuery('#' + jPlayerId)){ return; }

    console.log('MediaProxy#setVolume jPlayerId', jPlayerId, 'volume', volume);
    jQuery('#' + jPlayerId).jPlayer('volume', volume);
  }
};

require("cordova/exec/proxy").add("Media", module.exports);