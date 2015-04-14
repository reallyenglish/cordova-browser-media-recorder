var Recorder = require('com.reallyenglish.cordova.plugin.browser-media.MediaRecorder'),
    BrowserMedia = require('com.reallyenglish.cordova.plugin.browser-media.BrowserMedia');

module.exports = {
  startRecordingAudio: function(){
    var args = Array.prototype.slice.call(arguments, 2)[0],
        id = args[0],
        src = args[1];

    this.recorder = Recorder.getInstance({swfSrc: 'scripts/recorder.swf'});
    this.recorder.record();
  },

  stopRecordingAudio: function(){
    var args = Array.prototype.slice.call(arguments, 2)[0],
        id = args[0];

    if(!this.recorder){ return; }

    var mediaInstanceById = BrowserMedia.get(id);
    var dataReady = function(data) {
      mediaInstanceById.src = window.URL.createObjectURL(data);
      BrowserMedia.onStatus(id, BrowserMedia.MEDIA_STATE, BrowserMedia.MEDIA_STOPPED);
    };

    this.recorder.stop();
    this.recorder.getData(dataReady);
  }
};

require("cordova/exec/proxy").add("Media", module.exports);