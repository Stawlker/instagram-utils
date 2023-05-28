'use strict';

const { IgApiClient } = require('instagram-private-api');
const SLEEPING_TIME = 20;

class Instagram {
    constructor(username, password) {
        this.ig = new IgApiClient();

        this.username = username;

        this.password = password;
    }

    static get SLEEPING_TIME() {
        return SLEEPING_TIME;
    }

    login(username, password, proxyUrl) {
        this.ig.state.generateDevice(username);

        if (proxyUrl) this.ig.state.proxyUrl = proxyUrl;
        
        return this.ig.account.login(username, password);
    }

    async getAllItems(feed) {
        let items = [];

        do {
            items = items.concat(await feed.items());
        } while (feed.isMoreAvailable());

        return items;
    }

    getFollowers() {
        return this.getAllItems(this.ig.feed.accountFollowers(this.ig.state.cookieUserId));
    }

    getFollowing() {
        return this.getAllItems(this.ig.feed.accountFollowing(this.ig.state.cookieUserId));
    }

    getUserInfo(id) {
        return this.ig.user.info(id);
    }
}

module.exports = Instagram;