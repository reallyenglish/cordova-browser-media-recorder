var jQuery = window.com.reallyenglish.cordova.plugin.browsermedia.lib.jQuery,
    Recorder = require('com.reallyenglish.cordova.plugin.browser-media.MediaRecorder'),
    BrowserMedia = require('com.reallyenglish.cordova.plugin.browser-media.BrowserMedia');

jQuery.noConflict(true);

// Media messages
var MEDIA_STATE = 1,
    MEDIA_DURATION = 2,
    MEDIA_POSITION = 3,
    MEDIA_ERROR = 9;

var MEDIA_NONE = 0,
    MEDIA_STARTING = 1,
    MEDIA_RUNNING = 2,
    MEDIA_PAUSED = 3,
    MEDIA_STOPPED = 4,
    MEDIA_CAN_PLAY_THROUGH = 5;

module.exports = {
  create: function(){
    this.onStatusCallback = Array.prototype.slice.call(arguments, 0, 1)[0];

    var self = this,
        args = Array.prototype.slice.call(arguments, 2)[0],
        id = args[0],
        src = args[1];

    console.log('MediaProxy#create onStatusCallback', self.onStatusCallback);
    console.log('MediaProxy#create id', id, 'src', src);

    jQuery( document ).ready(function() {
      console.log('MediaProxy#create document ready');

      var playerDiv = document.createElement("div");
      playerDiv.id = 'jquery_jplayer_' + id;

      document.body.appendChild(playerDiv);

      jQuery('#' + playerDiv.id).jPlayer({
        noConflict: 'window.com.reallyenglish.cordova.plugin.browsermedia.lib.jQuery',
        ready: function(){
          jQuery(this).jPlayer("setMedia", {
            mp3: src
          });
        },

        canplaythrough: function(e){
          console.log('MediaProxy#create CANPLAYTHROUGH event', e);
          self.onStatusCallback(id, MEDIA_STATE, MEDIA_CAN_PLAY_THROUGH);
        },

        durationchange: function(e){
          console.log('MediaProxy#create DURATIONCHANGE event', e);
          self.onStatusCallback(id, MEDIA_DURATION, e.jPlayer.status.duration);
        },

        play: function(e){
          console.log('MediaProxy#create PLAY event', e);
          self.onStatusCallback(id, MEDIA_STATE, MEDIA_STARTING);
        },

        playing: function(e){
          console.log('MediaProxy#create PLAYING event', e);
          self.onStatusCallback(id, MEDIA_STATE, MEDIA_RUNNING);
        },

        pause: function(e){
          console.log('MediaProxy#create PAUSE event', e);
          self.onStatusCallback(id, MEDIA_STATE, MEDIA_PAUSED);
        },

        seeking: function(e){
          console.log('MediaProxy#create SEEKING event', e);
        },

        volumechange: function(e){
          console.log('MediaProxy#create VOLUMECHANGE event', e);
        },

        ended: function(e){
          console.log('MediaProxy#create ENDED event', e);
          self.onStatusCallback(id, MEDIA_STATE, MEDIA_STOPPED);
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
    var onSuccessCallback = Array.prototype.slice.call(arguments, 0, 1)[0],
        args = Array.prototype.slice.call(arguments, 2)[0],
        id = args[0],
        milliseconds = parseInt(args[1], 10),
        seconds = Math.floor(milliseconds / 1000),
        jPlayerId = 'jquery_jplayer_' + id;

    if(!jQuery('#' + jPlayerId)){ return; }

    console.log('MediaProxy#seekToAudio jPlayerId', jPlayerId, 'seconds', seconds);
    jQuery('#' + jPlayerId).jPlayer('play', seconds);
    onSuccessCallback(seconds);
  },

  pausePlayingAudio: function(){
    var args = Array.prototype.slice.call(arguments, 2)[0],
        id = args[0],
        jPlayerId = 'jquery_jplayer_' + id;

    if(!jQuery('#' + jPlayerId)){ return; }

    console.log('MediaProxy#pausePlayingAudio jPlayerId', jPlayerId);
    jQuery('#' + jPlayerId).jPlayer('pause');
  },

  getCurrentPositionAudio: function(){
    var onSuccessCallback = Array.prototype.slice.call(arguments, 0, 1)[0],
        args = Array.prototype.slice.call(arguments, 2)[0],
        id = args[0],
        jPlayerId = 'jquery_jplayer_' + id,
        jpData = jQuery('#' + jPlayerId).data('jPlayer'),
        currentPositionInSeconds = jpData.status.currentTime;

    if(!jQuery('#' + jPlayerId)){ return; }

    console.log('MediaProxy#getCurrentPositionAudio jPlayerId', jPlayerId, 'currentPositionInSeconds', currentPositionInSeconds);
    onSuccessCallback(currentPositionInSeconds);
  },

  startRecordingAudio: function(){
    var args = Array.prototype.slice.call(arguments, 2)[0],
        id = args[0],
        src = args[1];

    this.recorder = Recorder.getInstance({swfSrc: 'scripts/recorder.swf'});

    console.log('MediaProxy#startRecordingAudio fake src', src);
    this.Recorder.record();
  },

  stopRecordingAudio: function(){
    var self = this,
        args = Array.prototype.slice.call(arguments, 2)[0],
        id = args[0];

    if(!this.recorder){ return; }

    var mediaInstanceById = BrowserMedia.get(id);
    console.log('MediaProxy#stopRecordingAudio mediaInstanceById', mediaInstanceById);

    var dataReady = function(data) {
      mediaInstanceById.src = window.URL.createObjectURL(data);
      self.onStatusCallback(id, MEDIA_STATE, MEDIA_STOPPED);
      console.log('MediaProxy#stopRecordingAudio - new fake src', mediaInstanceById.src);
    };

    this.recorder.stop();
    this.recorder.getData(dataReady);
  },

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