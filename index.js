const gi = require('node-gtk');
const Gtk = gi.require('Gtk', '3.0');

gi.startLoop();
Gtk.init();

const win = new Gtk.Window();
win.on('destroy', () => Gtk.mainQuit());
win.on('delete-event', () => false);

const mainBox = new Gtk.Box({ orientation: Gtk.Orientation.VERTICAL });
const gridBox = new Gtk.Box({ orientation: Gtk.Orientation.HORIZONTAL });
const gtkGrid = new Gtk.Grid({});

gtkGrid.attach((new Gtk.Image({file: "./sprites/brick.png"})), 3, 1, 1, 1);
gtkGrid.attach((new Gtk.Image({file: "./sprites/brick.png"})), 4, 1, 1, 1);
gtkGrid.attach((new Gtk.Image({file: "./sprites/brick.png"})), 5, 1, 1, 1);

gtkGrid.attach(new Gtk.Image({file: "./sprites/brick.png"}), 3, 2, 1, 1);
gtkGrid.attach((new Gtk.Image({file: "./sprites/worker.png"})), 4, 2, 1, 1);
gtkGrid.attach(new Gtk.Image({file: "./sprites/brick.png"}), 5, 2, 1, 1);

gtkGrid.attach((new Gtk.Image({file: "./sprites/brick.png"})), 3, 3, 1, 1);
gtkGrid.attach((new Gtk.Image({file: "./sprites/brick.png"})), 5, 3, 1, 1);

gtkGrid.attach((new Gtk.Image({file: "./sprites/brick.png"})), 3, 4, 1, 1);
gtkGrid.attach((new Gtk.Image({file: "./sprites/box.png"})), 4, 4, 1, 1);
gtkGrid.attach((new Gtk.Image({file: "./sprites/brick.png"})), 5, 4, 1, 1);

gtkGrid.attach((new Gtk.Image({file: "./sprites/brick.png"})), 3, 5, 1, 1);
gtkGrid.attach((new Gtk.Image({file: "./sprites/brick.png"})), 5, 5, 1, 1);

gtkGrid.attach((new Gtk.Image({file: "./sprites/brick.png"})), 3, 6, 1, 1);
gtkGrid.attach((new Gtk.Image({file: "./sprites/brick.png"})), 5, 6, 1, 1);

gtkGrid.attach((new Gtk.Image({file: "./sprites/brick.png"})), 3, 7, 1, 1);
gtkGrid.attach((new Gtk.Image({file: "./sprites/target.png"})), 4, 7, 1, 1);
gtkGrid.attach((new Gtk.Image({file: "./sprites/brick.png"})), 5, 7, 1, 1);

gtkGrid.attach((new Gtk.Image({file: "./sprites/brick.png"})), 3, 8, 1, 1);
gtkGrid.attach((new Gtk.Image({file: "./sprites/brick.png"})), 4, 8, 1, 1);
gtkGrid.attach((new Gtk.Image({file: "./sprites/brick.png"})), 5, 8, 1, 1);


gridBox.packStart(gtkGrid, true, false, 2)
mainBox.packStart(gridBox, true, false, 2)

win.setDefaultSize(800, 600);
win.setTitle("Sokoban");
win.add(mainBox);

win.showAll();
Gtk.main();