const Gtk = require("./Gtk");

const win = new Gtk.Window();

win.setTitle("Node.js GTK Sokoban");
win.setDefaultSize(800, 600);

win.on('destroy', () => Gtk.mainQuit());
win.on('delete-event', () => false);

module.exports = win;
