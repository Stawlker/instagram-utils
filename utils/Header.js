'use strict';

class Header {
    static print(text) {
        console.log(`  ____  _                 _ _             \n / ___|| |_ __ ___      _| | | _____ _ __ \n \\___ \\| __/ _\` \\ \\ /\\ / / | |/ / _ \\ '__|\n  ___) | || (_| |\\ V  V /| |   <  __/ |   \n |____/ \\__\\__,_| \\_/\\_/ |_|_|\\_\\___|_|   ${text}\n`);
    }
}

module.exports = Header;