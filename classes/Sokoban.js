const Gtk = require("../utils/Gtk");
const win = require("../utils/Window")

module.exports = class Sokoban {

    constructor(rawLayout) {
        this.gridBox = new Gtk.Box({ orientation: Gtk.Orientation.HORIZONTAL });
        this.grid = new Gtk.Grid({});

        this.layout;
        this.charCoords = [0, 0];

        if (rawLayout) {
            this.rawLayout = rawLayout;
            this.parseLayout(rawLayout);
        }
    }

    parseLayout(rawLayout) {
        this.layout = [[]]
        let y = 0;

        for (let i = 0; i < rawLayout.length; i++) {

            if (rawLayout[i] === "\n") {
                y++;
                this.layout.push([]);
            } else {
                this.layout[y].push(rawLayout[i].toUpperCase());
            }

        }

    }

    render() {
        for (let y = 0; y < this.layout.length; y++) {
            for (let x = 0; x < this.layout[y].length; x++) {

                switch (this.layout[y][x]) {
                    case "W":
                        this.grid.attach((new Gtk.Image({ file: "./sprites/brick.png" })), x, y, 1, 1);
                        break;
                    case "C":
                        this.grid.attach((new Gtk.Image({ file: "./sprites/worker.png" })), x, y, 1, 1);
                        this.charCoords = [x, y];
                        break;
                    case "B":
                        this.grid.attach((new Gtk.Image({ file: "./sprites/box.png" })), x, y, 1, 1);
                        break;
                    case "X":
                        this.grid.attach((new Gtk.Image({ file: "./sprites/target.png" })), x, y, 1, 1);
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

    moveUp() {
        const charX = this.charCoords[0];
        const charY = this.charCoords[1];

        if (this.moveIsAllowed(charX, charY - 1, "UP")) {
            this.charCoords[1]--;

            this.layout[charY][charX] = " ";
            this.layout[charY - 1][charX] = "C";

            this.clear();
            this.render();
        }

    }

    moveDown() {
        const charX = this.charCoords[0];
        const charY = this.charCoords[1];

        if (this.moveIsAllowed(charX, charY + 1, "DOWN")) {
            this.charCoords[1]++;

            this.layout[charY][charX] = " ";
            this.layout[charY + 1][charX] = "C";

            this.clear();
            this.render();
        }

    }

    moveLeft() {
        const charX = this.charCoords[0];
        const charY = this.charCoords[1];

        if (this.moveIsAllowed(charX - 1, charY, "LEFT")) {
            this.charCoords[0]--;

            this.layout[charY][charX] = " ";
            this.layout[charY][charX - 1] = "C";

            this.clear();
            this.render();
        }
    }

    moveRight() {
        const charX = this.charCoords[0];
        const charY = this.charCoords[1];

        if (this.moveIsAllowed(charX + 1, charY, "RIGHT")) {
            this.charCoords[0]++;

            this.layout[charY][charX] = " ";
            this.layout[charY][charX + 1] = "C";

            this.clear();
            this.render();
        }
    }

    moveIsAllowed(x, y, direction) {
        if (this.layout[y][x] == "B") {
            return this.pushBox(x, y, direction);
        } else return this.layout[y][x] != "W";
    }

    pushBox(x, y, direction) {

        switch (direction) {
            case "UP":
                if (!["W", "B"].includes(this.layout[y - 1][x])) {
                    this.layout[y][x] = " ";
                    this.layout[y - 1][x] = "B";
                    return true;
                }
                else return false;
            case "DOWN":
                if (!["W", "B"].includes(this.layout[y + 1][x])) {
                    this.layout[y][x] = " ";
                    this.layout[y + 1][x] = "B";
                    return true;
                }
                else return false;
            case "LEFT":
                if (!["W", "B"].includes(this.layout[y][x - 1])) {
                    this.layout[y][x] = " ";
                    this.layout[y][x - 1] = "B";
                    return true;
                }
                else return false;
            case "RIGHT":
                if (!["W", "B"].includes(this.layout[y][x + 1])) {
                    this.layout[y][x] = " ";
                    this.layout[y][x + 1] = "B";
                    return true;
                }
                else return false;
            default:
                return false;
        }

    }

}
