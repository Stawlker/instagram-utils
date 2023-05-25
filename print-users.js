'use strict';

const Instagram = require('./src/Instagram');
const Header = require('./utils/Header');
const Sleep = require('./utils/Sleep');
const Spinner = require('./utils/Spinner');
const { GREEN, MAGENTA, RED, RESET, YELLOW } = require('./utils/Colors');

const { username, password } = require('./options.json')
const instagram = new Instagram(username, password);

async function run() {
    const spinner = new Spinner();

    Header.print('by Stawlker');

    spinner.start(`Logging into ${MAGENTA}Instagram${RESET}...`);

    await instagram.login(instagram.username, instagram.password);

    spinner.stop();

    process.stdout.write(`\n${GREEN}${spinner.frames[8]}${RESET} Logged into ${MAGENTA}Instagram${RESET} as ${GREEN}${instagram.username}${RESET}.\n`);

    spinner.start(`Loading ${GREEN}${instagram.username}${RESET}'s followers...`);

    const followers = await instagram.getFollowers();

    followers.sort((a, b) => a.username.localeCompare(b.username));

    spinner.stop();

    process.stdout.write(`\n${GREEN}${spinner.frames[8]}${RESET} Loaded ${YELLOW}${followers.length}${RESET} followers.\n`);

    spinner.start(`Loading ${GREEN}${instagram.username}${RESET}'s accounts followed...`);

    const following = await instagram.getFollowing();

    following.sort((a, b) => a.username.localeCompare(b.username));

    spinner.stop();

    process.stdout.write(`\n${GREEN}${spinner.frames[8]}${RESET} Loaded ${YELLOW}${following.length}${RESET} accounts followed.\n\nHere are the users who follow you on Instagram:`);

    for (const user of followers) {
        process.stdout.write(`\n- `);

        if (user.is_private)
            process.stdout.write(`🔒 `);

        if (following.some(u => u.pk === user.pk))
            process.stdout.write(`${GREEN}@${user.username}${RESET}`);
        else
            process.stdout.write(`@${user.username}`);

        if (user.full_name)
            process.stdout.write(`, ${user.full_name}`);

        await Sleep.sleep(Instagram.SLEEPING_TIME);
    }

    process.stdout.write(`\n\nHere are the users you follow on Instagram:`)

    for (const user of following) {
        process.stdout.write(`\n- `);

        if (user.is_private)
            process.stdout.write(`🔒 `);

        if (followers.some(u => u.pk === user.pk))
            process.stdout.write(`${GREEN}@${user.username}${RESET}`);
        else
            process.stdout.write(`${RED}@${user.username}${RESET}`);

        if (user.full_name)
            process.stdout.write(`, ${user.full_name}`);

        await Sleep.sleep(Instagram.SLEEPING_TIME);
    }
}

run();