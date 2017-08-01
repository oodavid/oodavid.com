EditorController.$inject = ['Memento'];
function EditorController(Memento){
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
  // Create a new Memento object
  var memento = new Memento(ctrl.meta, ctrl.worlds, ctrl.checkbox);
  // Expose the undo and redo methods
  ctrl.canUndo = memento.canUndo;
  ctrl.redo    = memento.redo;
  ctrl.canRedo = memento.canRedo;
  ctrl.undo    = memento.undo;
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
    memento.save();
  };
  // User interactions can manually trigger save
  ctrl.save = memento.save;
}

angular
  .module('app')
  .controller('EditorController', EditorController);
