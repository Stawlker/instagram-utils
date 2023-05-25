'use strict';

class Sleep {
    constructor() {
        throw new Error(`The ${this.constructor.name} class may not be instantiated.`);
    }

    static sleep(milliseconds) {
        return new Promise((resolve) => setTimeout(resolve, milliseconds));
    }
}

module.exports = Sleep;