const Gtk = require("./utils/Gtk");
const win = require("./utils/Window");

const Sokoban = require("./classes/Sokoban");

const mainBox = new Gtk.Box({ orientation: Gtk.Orientation.VERTICAL });

const soko = new Sokoban()
soko.render();

mainBox.packStart(soko.gridBox, true, false, 0);

win.add(mainBox);
win.showAll();

Gtk.main();
