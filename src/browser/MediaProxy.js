module.exports = {
  create: function(){ alert('Create!'); },

  startPlayingAudio: function(){ alert('startPlayingAudio!'); },

  stopPlayingAudio: function(){ alert('stopPlayingAudio!'); },

  seekToAudio: function(){ alert('seekToAudio!'); },

  pausePlayingAudio: function(){ alert('pausePlayingAudio!'); },

  getCurrentPositionAudio: function(){ alert('getCurrentPositionAudio!'); },

  startRecordingAudio: function(){},

  stopRecordingAudio: function(){},

  release: function(){ alert('release'); },

  setVolume: function(){ alert('setVolume'); }
};

require("cordova/exec/proxy").add("Media", module.exports);