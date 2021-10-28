const Gtk = require("./utils/Gtk");
const win = require("./utils/Window");

const Sokoban = require("./classes/Sokoban");
const Campaign = require("./classes/Campaign");

const mainBox = new Gtk.Box({ orientation: Gtk.Orientation.VERTICAL });
const controlsBox = new Gtk.Box({ orientation: Gtk.Orientation.HORIZONTAL });
const controlsGrid = new Gtk.Grid({});

const gameLabel = new Gtk.Label();
gameLabel.label = "Move boxes to target(s).";

const levels = new Campaign("./levels")

const soko = new Sokoban(levels.next());
soko.render();

const upButton = new Gtk.Button({ label: "↑" });
const leftButton = new Gtk.Button({ label: "←" });
const rightButton = new Gtk.Button({ label: "→" });
const downButton = new Gtk.Button({ label: "↓" });
const restartButton = new Gtk.Button({ label: "Restart" })

upButton.on("clicked", onUp);
leftButton.on("clicked", onLeft);
rightButton.on("clicked", onRight);
downButton.on("clicked", onDown);
restartButton.on("clicked", onRestart);

controlsGrid.attach(upButton, 1, 0, 1, 1);
controlsGrid.attach(leftButton, 0, 1, 1, 1);
controlsGrid.attach(rightButton, 2, 1, 1, 1);
controlsGrid.attach(downButton, 1, 2, 1, 1);

controlsGrid.attach((new Gtk.Label("\n")), 0, 3, 3, 1);
controlsGrid.attach((new Gtk.Label("\n")), 0, 4, 3, 1);
controlsGrid.attach(restartButton, 0, 5, 3, 1);

controlsBox.packStart(controlsGrid, true, false, 2);

mainBox.packStart(gameLabel, true, false, 0)
mainBox.packStart(soko.gridBox, true, false, 0);
mainBox.packStart(controlsBox, true, false, 0);

win.add(mainBox);
win.showAll();

Gtk.main();

function onUp() {
    soko.moveUp() && nextLevel();

}

function onDown() {
    soko.moveDown() && nextLevel();
}

function onLeft() {
    soko.moveLeft() && nextLevel();;
}

function onRight() {
    soko.moveRight() && nextLevel();
}

function onRestart() {
    soko.clear();

    soko.parseLayout(soko.rawLayout);
    soko.render();
}

function nextLevel() {
    const nextLevel = levels.next();

    if (nextLevel) {
        soko.parseLayout(nextLevel);
        soko.clear();
        soko.render();
        win.showAll();
    } else {
        upButton.on("clicked", () => {Gtk.mainQuit()});
        leftButton.on("clicked", () => {Gtk.mainQuit()});
        rightButton.on("clicked", () => {Gtk.mainQuit()});
        downButton.on("clicked", () => {Gtk.mainQuit()});
        gameLabel.label = "Congratulations!"
        restartButton.label = "Close";
        restartButton.on("clicked", () => {Gtk.mainQuit()});
        win.showAll();
    }
}
