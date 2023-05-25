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

    async getFollowers() {
        const followersFeed = this.ig.feed.accountFollowers(this.ig.state.cookieUserId);
        const followers = await followersFeed.items();

        return followers;
    }

    async getFollowing() {
        const followingFeed = this.ig.feed.accountFollowing(this.ig.state.cookieUserId);
        const following = await followingFeed.items();

        return following;
    }

    getUserInfo(id) {
        return this.ig.user.info(id);
    }
}

module.exports = Instagram;