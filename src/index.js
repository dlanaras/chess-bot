const Discord = require("discord.js");
const config = require("../config.json");
const client = new Discord.Client();
const tmi = require('tmi.js');
const fs = require('fs')
const https = require('https');
const readline = require('readline');
const prefix = "!";

function show(field) {
    var count = 0
    var f = "a\t b\t c\t d\t e\t f\t g\t h \n"
    let formatedChessField = "";
    field.forEach(element => {
       
        
        if (count == 8) {
            formatedChessField += "\n" 
            count = 0
        }
        if (element == 8) { formatedChessField += ":white_large_square:" }
        else if (element == 2) { formatedChessField += "<:pawnw:841224234508484608>" }
        else if (element == 3) { formatedChessField += "<:rookw:841224234315284491>" }
        else if (element == 4) { formatedChessField += "<:kinghtw:841224209069375509>" }
        else if (element == 5) { formatedChessField += "<:bishopw:841224183492509696>" }
        else if (element == 6) { formatedChessField += "<:queenw:841224234457628712>" }
        else if (element == 7) { formatedChessField += "<:kingw:841224208972513320>" }
        else if (element == 1) { formatedChessField += ":black_large_square:" }
        else if (element == 12) { formatedChessField += "<:pawnb:841224234289725470>" }
        else if (element == 13) { formatedChessField += "<:rookb:841224234444652574>" }
        else if (element == 14) { formatedChessField += "<:knightb:841224208587292713>" }
        else if (element == 15) { formatedChessField += "<:bishopb:841223730272403456>" }
        else if (element == 16) { formatedChessField += "<:queenb:841224234420142080>" }
        else if (element == 17) { formatedChessField += "<:kingb:841224209086152704>" }

        count += 1
    });
    return formatedChessField
}
client.on("message", function (message) {

    client.user.setActivity("with cooom", {
        type: "STREAMING",
        url: "https://github.com/YvesHuber/discord-bot"
    });
    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;

    const commandBody = message.content.slice(prefix.length);
    const args = commandBody.split(' ');
    const command = args.shift().toLowerCase();

    if (command === "") {
        fs.readFile('help/help.txt', 'utf8', function (err, data) {
            if (err) {
                return console.log(err);
            }
            const help = data.split("\n")
            message.channel.send(help)
        });
    }


    else if (command === "ping") {
        const timeTaken = Date.now() - message.createdTimestamp;
        message.reply(`Pong! This message had a latency of ${timeTaken}ms.`);
    }

    else if (command === 'chess') {

        const challenger = message.author
        const duelist = message.mentions.members.first()

        var turn = [""]
        // 1 = black 0 = white
        var field = [
            3, 4, 5, 6, 7, 5, 4, 3,
            2, 2, 2, 2, 2, 2, 2, 2,
            8, 1, 8, 1, 8, 1, 8, 1,
            1, 8, 1, 8, 1, 8, 1, 8,
            8, 1, 8, 1, 8, 1, 8, 1,
            1, 8, 1, 8, 1, 8, 1, 8,
            12, 12, 12, 12, 12, 12, 12, 12,
            13, 14, 15, 17, 16, 15, 14, 13,]

        round(field, challenger, duelist)
        function round(field, challenger, duelist) {
            message.channel.send(show(field))
            
            try {
                client.on('message', message => {
                    if (message.author.bot) return;
                    if (message.content != "") {
                        if (message.author.id == challenger.id)
                            turn = message.content.split(" ")
                        function fieldchooser(row, number) {
                            index = 0
                            //dabaddby
                            console.log(row)
                            switch (row) {
                                case 'a':
                                    index = number * 8 + 1 - 9
                                    break
                                case 'b':
                                    index = number * 8 + 2 - 9
                                    break
                                case 'c':
                                    index = number * 8 + 3 - 9
                                    break
                                case 'd':
                                    index = number * 8 + 4 - 9
                                    break
                                case 'e':
                                    index = number * 8 + 5 - 9
                                    break
                                case 'f':
                                    index = number * 8 + 6 - 9
                                    break
                                case 'g':
                                    index = number * 8 + 7 - 9
                                    break
                                case 'h':
                                    index = number * 8 + 8 - 9
                                    break
                            }

                            return index
                        }
                        currentfield = fieldchooser(turn[0].slice(0, 1), turn[0].slice(1, 2))
                        futurefield = fieldchooser(turn[1].slice(0, 1), turn[1].slice(1, 2))
                        console.log("current Index", currentfield , "future Index", futurefield)
                        console.log("currentfield Value" , field[currentfield],"futurefireld Value" ,field[futurefield])
                        console.log(typeof(field[currentfield] , 8))
                        if (field[currentfield] == 1 || field[currentfield] == 8) {
                            message.channel.send("No Valid Move")
                            return
                        }
                        if (field[currentfield] == 2 || field[currentfield] == 12){
                            //pawn time
                        }
                        else {
                            field[futurefield] = field[currentfield]
                        }
                        message.channel.send(show(field))
                    }
                });
            } catch (err) {
                console.log(err)
            }
        }

    }
})

// rook: can move in cross ()

client.login(config.BOT_TOKEN);
