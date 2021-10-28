const fs = require("fs");
const path = require("path");

module.exports = class Campaign {

    constructor(str) {
        if(fs.existsSync(str)) {
            this.dir = str + "/";
            this.files = fs.readdirSync(str).sort((a, b) => parseInt(a) - parseInt(b));
            this.rawLevels = [];
            this.current = 0;

            for(let i = 0 ; i < this.files.length ; i++) 
                this.rawLevels.push(fs.readFileSync(this.dir + this.files[i], {encoding: "utf8"}))

        }
    }

    next() {
        return this.rawLevels[this.current++] || null
    }
}