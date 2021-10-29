const Gtk = require("../utils/Gtk");
const win = require("../utils/Window");

const sfx = require("../utils/sfx");

module.exports = class Sokoban {

    constructor(rawLayout) {
        this.gridBox = new Gtk.Box({ orientation: Gtk.Orientation.HORIZONTAL });
        this.grid = new Gtk.Grid({});

        this.layout;
        this.charCoords = [0, 0];
        this.targetCoords = [];
        this.steps = 0;
        this.currentSteps = 0;

        this.boxReachedTarget = false;

        if (rawLayout) {
            this.rawLayout = rawLayout;
            this.parseLayout(rawLayout);
        }
    }

    parseLayout(rawLayout) {
        this.rawLayout = rawLayout;
        this.layout = [[]];
        this.charCoords = [0, 0];
        this.targetCoords = [];
        this.currentSteps = 0;
        this.isWon = false;

        let y = 0;

        for (let i = 0; i < rawLayout.length; i++) {

            if (rawLayout[i] === "\n") {
                y++;
                this.layout.push([]);
            } else {
                this.layout[y].push(rawLayout[i].toUpperCase());
            }

        }

        for (let y = 0; y < this.layout.length; y++)
            for (let x = 0; x < this.layout[y].length; x++) {
                this.layout[y][x] == "X" && this.targetCoords.push([x, y]);
                if (this.layout[y][x] == "C") this.charCoords = [x, y];
            };

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
                        break;
                    case "B":
                        this.grid.attach((new Gtk.Image({ file: "./sprites/box.png" })), x, y, 1, 1);
                        break;
                    default:
                        break;

                }
            }
        }

        for (let i = 0; i < this.targetCoords.length; i++)
            if (!["B", "C"].includes(this.layout[this.targetCoords[i][1]][this.targetCoords[i][0]])) {
                this.layout[this.targetCoords[i][1]][this.targetCoords[i][0]] = "X"
                this.grid.attach((new Gtk.Image({ file: "./sprites/target.png" })), this.targetCoords[i][0], this.targetCoords[i][1], 1, 1);
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
            this.steps++;
            this.currentSteps++;
            this.charCoords[1]--;

            this.layout[charY][charX] = " ";
            this.layout[charY - 1][charX] = "C";

            this.isWon = this.targetCoords.reduce((prev, curr) => {
                return prev && this.layout[curr[1]][curr[0]] == "B";
            }, true);

            this.playSound(true);

            this.clear();
            this.render();
        } else this.playSound(false);


    }

    moveDown() {
        const charX = this.charCoords[0];
        const charY = this.charCoords[1];

        if (this.moveIsAllowed(charX, charY + 1, "DOWN")) {
            this.steps++;
            this.currentSteps++;
            this.charCoords[1]++;

            this.layout[charY][charX] = " ";
            this.layout[charY + 1][charX] = "C";

            this.isWon = this.targetCoords.reduce((prev, curr) => {
                return prev && this.layout[curr[1]][curr[0]] == "B";
            }, true)

            this.playSound(true);

            this.clear();
            this.render();
        } else this.playSound(false);

    }

    moveLeft() {
        const charX = this.charCoords[0];
        const charY = this.charCoords[1];

        if (this.moveIsAllowed(charX - 1, charY, "LEFT")) {
            this.steps++;
            this.currentSteps++;
            this.charCoords[0]--;

            this.layout[charY][charX] = " ";
            this.layout[charY][charX - 1] = "C";

            this.isWon = this.targetCoords.reduce((prev, curr) => {
                return prev && this.layout[curr[1]][curr[0]] == "B";
            }, true)

            this.playSound(true);

            this.clear();
            this.render();
        } else this.playSound(false);

    }

    moveRight() {
        const charX = this.charCoords[0];
        const charY = this.charCoords[1];

        if (this.moveIsAllowed(charX + 1, charY, "RIGHT")) {
            this.steps++;
            this.currentSteps++;
            this.charCoords[0]++;

            this.layout[charY][charX] = " ";
            this.layout[charY][charX + 1] = "C";

            this.isWon = this.targetCoords.reduce((prev, curr) => {
                return prev && this.layout[curr[1]][curr[0]] == "B";
            }, true);

            this.playSound(true);

            this.clear();
            this.render();
        } else this.playSound(false);
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
                    this.boxReachedTarget = this.layout[y - 1][x] == "X";
                    this.layout[y][x] = x == " ";
                    this.layout[y - 1][x] = "B";
                    return true;
                }
                else return false;
            case "DOWN":
                if (!["W", "B"].includes(this.layout[y + 1][x])) {
                    this.boxReachedTarget = this.layout[y + 1][x] == "X";
                    this.layout[y][x] = " ";
                    this.layout[y + 1][x] = "B";
                    return true;
                }
                else return false;
            case "LEFT":
                if (!["W", "B"].includes(this.layout[y][x - 1])) {
                    this.boxReachedTarget = this.layout[y][x - 1] == "X";
                    this.layout[y][x] = " ";
                    this.layout[y][x - 1] = "B";
                    return true;
                }
                else return false;
            case "RIGHT":
                if (!["W", "B"].includes(this.layout[y][x + 1])) {
                    this.boxReachedTarget = this.layout[y][x + 1] == "X";
                    this.layout[y][x] = " ";
                    this.layout[y][x + 1] = "B";
                    return true;
                }
                else return false;
            default:
                return false;
        }

    }

    playSound(moved) {
        if(this.isWon) sfx.nextLevel();
        else if(this.boxReachedTarget) sfx.targetReached();
        else moved ? sfx.step() : sfx.wallHit();

        this.boxReachedTarget = false;
    }

}
