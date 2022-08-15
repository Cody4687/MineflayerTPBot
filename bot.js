const mineflayer = require('mineflayer')
const colors = require('colors')

const tpaList = ["usernames", "go", "here"]

var options = {
    host: "0b0t.org",
    port: 25565,
    version: "1.12.2",
    auth: 'microsoft',
    username: "email@example.com",
    password: "password123",
    verbose: "true"
};

function startBot() {
    const bot = mineflayer.createBot(options)

    bot.chatAddPattern(/^.*?(\w*) wants to teleport to you\.$/, "tpa", "tparequest");

    bot.on('tpa', function (username) {
        console.log(`${username} tried to tp.`)
        if (tpaList.includes(username)) {
            bot.chat(`/tpy ${username}`)
        }
    })

    bot.on('login', function () {
        console.log('Bot is online!'.green)
    })

    bot.on('end', function (reason) {
        console.log(`Bot ended. Reason: ${reason}`.red)
        startBot()
    })
    bot.on('error', function (err) {
        console.log(`Error: ${err}`.red)
        startBot()
    })
}
startBot()
