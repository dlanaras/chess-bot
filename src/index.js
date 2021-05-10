const Discord = require("discord.js");
const config = require("../config.json");
const client = new Discord.Client();
const tmi = require('tmi.js');
const fs = require('fs')
const https = require('https');
const readline = require('readline');

const prefix = "k";

client.on("message", function (message) {

    client.user.setActivity("with depression", {
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
        const challanger = message.author
        const duelist = message.mentions.members.first()
        var count = 0
        var turn = [""]
        var f = "a\t b\t c\t d\t e\t f\t g\t h \n" 
        // 1 = black 0 = white
        console.log("im in")
        message.reply("L")
        var field = [
            3,4,5,6,7,5,4,3,
            2,2,2,2,2,2,2,2,
            8,1,8,1,8,1,8,1,
            1,8,1,8,1,8,1,8,
            8,1,8,1,8,1,8,1,
            1,8,1,8,1,8,1,8,
            12,12,12,12,12,12,12,12,
            13,14,15,17,16,15,14,13,]

            round(field,challanger,duelist)
        function round (field,challanger,duelist) {


        field.forEach(element => {
            
            if (count == 8 ) {
                f += "\n"
                count = 0
            }
            if (element == 8){f += ":white_large_square:"}
            else if (element == 2) {f += "<:pawnw:841224234508484608>"}
            else if (element == 3) {f += "<:rookw:841224234315284491>"}
            else if (element == 4) {f += "<:kinghtw:841224209069375509>"}
            else if (element ==  5) {f += "<:bishopw:841224183492509696>"}
            else if (element == 6) {f += "<:queenw:841224234457628712>"}
            else if (element == 7) {f += "<:kingw:841224208972513320>"}
            else if (element == 1) {f += ":black_large_square:"}
            else if (element == 12) {f += "<:pawnb:841224234289725470>"}
            else if (element == 13) {f += "<:rookb:841224234444652574>"}
            else if (element == 14) {f += "<:knightb:841224208587292713>"}
            else if (element == 15) {f += "<:bishopb:841223730272403456>"}
            else if (element == 16) {f += "<:queenb:841224234420142080>"}
            else if (element == 17) {f += "<:kingb:841224209086152704>"}

            count += 1
        });

        try {
            client.on('message', message => {
                if (message.author.bot) return;
                if (message.content != "") {
                    if (message.author.id == challanger.id)
                    turn = message.content.split(" ")
                    function fieldchooser(row,number){
                        index = 0

                        console.log (row)
                        switch (row) {
                            case'a':
                                index = number * 8 + 1  -9
                                break
                            case'b':
                                index = number * 8 + 2 -9
                                break
                            case 'c':
                                index = number * 8 + 3 -9
                                break
                            case 'd':
                                index = number * 8 + 4 -9
                                break
                            case 'e':
                                index = number * 8 + 5 -9
                                break
                            case 'f':
                                index = number * 8 + 6 -9
                                break
                            case 'g':
                                index = number * 8 + 7 -9
                                break
                            case 'h':
                                index = number * 8 + 8 -9
                                break
                        }
                       return index
                    }
                    rowc =turn[0].slice(0,1) 
                    numberc =  turn[0].slice(1,2)
                    current = fieldchooser(rowc,numberc)

                    rowf =turn[1].slice(0,1) 
                    numberf =  turn[1].slice(1,2)
                    fture = fieldchooser(rowf,numberf)

                    console.log(current,fture)
                    field[fture] = field[current]
                    console.log(field)
                   
                }
            });
        }catch(err) {
            console.log(err)
        }
    }
    message.channel.send(f)
    }
})

client.login(config.BOT_TOKEN);