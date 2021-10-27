const Gtk = require("../utils/Gtk");
const win = require("../utils/Window")

module.exports = class Sokoban {

    constructor(rawLayout) {
        this.gridBox = new Gtk.Box({ orientation: Gtk.Orientation.HORIZONTAL });
        this.grid = new Gtk.Grid({});

        this.layout;
        this.charCoords = [0, 0];

        if(rawLayout) {
            this.rawLayout = rawLayout;
            this.parseLayout(rawLayout);
        }
    }

    parseLayout(rawLayout) {
        this.layout = [[]]
        let y = 0;

        for(let i = 0 ; i < rawLayout.length ; i++) {

            if(rawLayout[i] === "\n") {
                y++;
                this.layout.push([]);
            } else {
                this.layout[y].push(rawLayout[i].toUpperCase());
            }

        }

    }

    render() {
        for(let y = 0 ; y < this.layout.length ; y++) {
            for(let x = 0 ; x < this.layout[y].length ; x++) {

                switch (this.layout[y][x]) {
                    case "W":
                        this.grid.attach((new Gtk.Image({file: "./sprites/brick.png"})), x, y, 1, 1);
                        break;
                    case "C":
                        this.grid.attach((new Gtk.Image({file: "./sprites/worker.png"})), x, y, 1, 1);
                        this.charCoords = [x, y];
                        break;
                    case "B":
                        this.grid.attach((new Gtk.Image({file: "./sprites/box.png"})), x, y, 1, 1);
                        break;
                    case "X":
                        this.grid.attach((new Gtk.Image({file: "./sprites/target.png"})), x, y, 1, 1);
                        break;
                    default:
                        break;
                
                }
            }
        }

        this.gridBox.packStart(this.grid, true, false, 2);
        win.showAll();
    }

    clear() {
        this.gridBox.remove(this.grid);
        this.grid = new Gtk.Grid({});
    }

}
