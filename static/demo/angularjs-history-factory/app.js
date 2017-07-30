function HistoryFactory(){
  return function() {
    var _this = this;
    var subjects = arguments; // We can track multiple objects or arrays
    var history = []; // Each call to "save" makes a copy of every subject on the history
    var currentIndex = 0; // The "current" position on the history stack
    this.timestamp = null; // The timestamp for the current history
    this.canUndo = function() {
      return currentIndex > 0;
    };
    this.canRedo = function() {
      return currentIndex < history.length - 1;
    };
    this.save = function() {
      var snapshot = {
        timestamp: Date.now(), // The save time
        subjects: [], // Contains a copy of each of the subjects that we instantiated with
      };
      for (var a = 0, al = subjects.length; a < al; a++) {
        snapshot.subjects.push(angular.copy(subjects[a]));
      }
      if (history[currentIndex] && angular.equals(history[currentIndex].subjects, snapshot.subjects)) {
        return; // Do nothing if the new snapshot is the same as the current snapshot
      }
      if (this.canRedo()) {
        history = history.slice(0, currentIndex + 1); // Since we can "redo" we must overwrite that timeline (consider Back To The Future: Part II)
      }
      this.timestamp = snapshot.timestamp; // Store the time
      history.push(snapshot);
      currentIndex = history.length - 1;
    };
    var restoreSnapshot = function(indexDiff) {
      currentIndex += indexDiff;
      var snapshot = history[currentIndex];
      _this.timestamp = snapshot.timestamp; // Update the timestamp
      for (var s = 0, sl = snapshot.subjects.length; s < sl; s++) {
        if (snapshot.subjects[s] !== subjects[s]) {
          angular.copy(snapshot.subjects[s], subjects[s]);
        }
      }
    };
    this.undo = function() {
      if (this.canUndo()) {
        restoreSnapshot(-1);
      }
    };
    this.redo = function() {
      if (this.canRedo()) {
        restoreSnapshot(+1);
      }
    };
    // Begin by saving the current state
    this.save();
  };
};




EditorController.$inject = ['HistoryFactory'];
function EditorController(HistoryFactory){
  var ctrl = this;
  ctrl.meta = {
    title: 'The Many Worlds of David King',
    description: 'From the depths of the fractal noggin'
  };
  ctrl.worlds = [
    { value: 'earth' },
    { value: 'wonderland' },
    { value: 'discworld' },
    { value: 'the up-side-down'},
  ];
  ctrl.checkbox = [ true, false, true ];
  // How to track
  var History = new HistoryFactory(ctrl.meta, ctrl.worlds, ctrl.checkbox);
  // Expose the undo and redo methods
  ctrl.canUndo = History.canUndo;
  ctrl.redo    = History.redo;
  ctrl.canRedo = History.canRedo;
  ctrl.undo    = History.undo;
  // This method makes random changes
  ctrl.makeRandomChange = function() {
    var rand = Math.random();
    if (rand < 0.2) {
      ctrl.meta.title = 'The ' + Math.random() + ' Worlds of David King';
    } else if (rand < 0.4) {
      ctrl.meta.description = 'From the depths of noggin ' + Math.random();
    } else if (rand < 0.6) {
      ctrl.worlds.push({ value: 'World ' + Math.ceil(Math.random() * 100) });
    } else if (rand < 0.8) {
      var index = Math.floor(Math.random()*ctrl.checkbox.length);
      ctrl.checkbox[index] = !ctrl.checkbox[index];
    } else {
      ctrl.worlds.shift();
    }
    History.save();
  };
  // User interactions can manually trigger save
  ctrl.save = History.save;
}




var app = angular.module('app', []);
app.factory('HistoryFactory', HistoryFactory);
app.controller('EditorController', EditorController);
