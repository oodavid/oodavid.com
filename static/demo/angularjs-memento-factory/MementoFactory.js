function MementoFactory(){
  return function() {
    var memento = this;
    // Private properties
    var subjects = arguments; // We can track multiple objects or arrays
    var stack = []; // Each call to "save" makes a copy of every subject on the stack
    var currentIndex = 0; // The "current" position on the stack stack
    // Begin by saving the current state
    save();
    // Public properties
    memento.timestamp = null; // The timestamp for the current stack
    // Public methods
    memento.save = save;
    memento.canUndo = canUndo;
    memento.undo = undo;
    memento.canRedo = canRedo;
    memento.redo = redo;

    function save() {
      var snapshot = {
        timestamp: Date.now(), // The save time
        subjects: [], // Contains each of the subjects
      };
      for (var a = 0, al = subjects.length; a < al; a++) {
        snapshot.subjects.push(angular.copy(subjects[a]));
      }
      if (stack[currentIndex] && angular.equals(stack[currentIndex].subjects, snapshot.subjects)) {
        return; // Do nothing if the new snapshot is the same as the current snapshot
      }
      if (canRedo()) {
        stack = stack.slice(0, currentIndex + 1); // Since we can "redo" we must overwrite that timeline (consider Back To The Future: Part II)
      }
      memento.timestamp = snapshot.timestamp; // Store the time
      stack.push(snapshot);
      currentIndex = stack.length - 1;
    };
    function canUndo() {
      return currentIndex > 0;
    };
    function undo() {
      if (canUndo()) {
        restoreSnapshot(-1);
      }
    };
    function canRedo() {
      return currentIndex < stack.length - 1;
    };
    function redo() {
      if (canRedo()) {
        restoreSnapshot(+1);
      }
    };
    function restoreSnapshot(indexDiff) {
      currentIndex += indexDiff;
      var snapshot = stack[currentIndex];
      memento.timestamp = snapshot.timestamp; // Update the timestamp
      for (var s = 0, sl = snapshot.subjects.length; s < sl; s++) {
        if (snapshot.subjects[s] !== subjects[s]) {
          angular.copy(snapshot.subjects[s], subjects[s]);
        }
      }
    };
  };
};

angular
  .module('app')
  .factory('Memento', MementoFactory);
