'use strict';

const { GREEN, RESET } = require('./Colors');

class Spinner {
    constructor() {
        this.frames = [
            "⠋",
            "⠙",
            "⠹",
            "⠸",
            "⠼",
            "⠴",
            "⠦",
            "⠧",
            "⠇",
            "⠏"
        ];

        this.milliseconds = 80;

        this.index = 0;

        this.text = null;

        this.interval = null;
    }

    start(text) {
        this.text = text;
        
        this.interval = setInterval(() => {
            process.stdout.write(`\r${GREEN}${this.frames[this.index]}${RESET} ${this.text}`);

            this.index = (this.index + 1) % this.frames.length;
        }, this.milliseconds);
    }

    stop() {
        clearInterval(this.interval);

        this.interval = this.text = null;

        this.index = 0;
    }
}

module.exports = Spinner;