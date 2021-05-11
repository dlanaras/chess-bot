const Discord = require("discord.js");
const config = require("../config.json");
const client = new Discord.Client();
const tmi = require('tmi.js');
const fs = require('fs')
const https = require('https');
const readline = require('readline');
const prefix = "!";

const wk = "<:kingw:841224208972513320>";
const bk = "<:kingb:841224209086152704>";
const wq = "<:queenw:841224234457628712>";
const bq = "<:queenb:841224234420142080>";
const wr = "<:rookw:841224234315284491>";
const br = "<:rookb:841224234444652574>";
const wb = "<:bishopw:841224183492509696>";
const bb = "<:bishopb:841223730272403456>";
const wn = "<:kinghtw:841224209069375509>";
const bn = "<:knightb:841224208587292713>";
const wp = "<:pawnw:841224234508484608>";
const bp = "<:pawnb:841224234289725470>";
const w = ":white_large_square:";
const b = ":black_large_square:";
let field = [
    [wr,wn,wb,wk,wq,wb,wn,wr],
    [wp,wp,wp,wp,wp,wp,wp,wp],
    [w, b, w, b, w, b, w, b],
    [b, w, b, w, b, w, b, w],
    [w, b, w, b, w, b, w, b],
    [b, w, b, w, b, w, b, w],
    [bp,bp,bp,bp,bp,bp,bp,bp],
    [br,bn,bb,bq,bk,bb,bn,br]
];
function show () {
    let formatedfield = "";

    field.forEach(value => {
        formatedfield += "\n";
        console.log("maybe")
        value.forEach(element => {
            formatedfield += element;
        })
    });
    return formatedfield;
}/*


    field.forEach(element => {
    
        
        if (count == 8) {
            formatedfield += "\n" 
            count = 0
        }
        
        if (element == 8) { formatedfield += ":w_large_square:" }
        else if (element == 2) { formatedfield += "<:pawnw:841224234508484608>" }
        else if (element == 3) { formatedfield += "<:rookw:841224234315284491>" }
        else if (element == 4) { formatedfield += "<:kinghtw:841224209069375509>" }
        else if (element == 5) { formatedfield += "<:bishopw:841224183492509696>" }
        else if (element == 6) { formatedfield += "<:queenw:841224234457628712>" }
        else if (element == 7) { formatedfield += "<:kingw:841224208972513320>" }
        else if (element == 1) { formatedfield += ":b_large_square:" }
        else if (element == 12) { formatedfield += "<:pawnb:841224234289725470>" }
        else if (element == 13) { formatedfield += "<:rookb:841224234444652574>" }
        else if (element == 14) { formatedfield += "<:knightb:841224208587292713>" }
        else if (element == 15) { formatedfield += "<:bishopb:841223730272403456>" }
        else if (element == 16) { formatedfield += "<:queenb:841224234420142080>" }
        else if (element == 17) { formatedfield += "<:kingb:841224209086152704>" }
        
        count += 1
    });
    return formatedfield
    */


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
        // 1 = b 0 = w
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
            message.channel.send(show())
            
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
                        message.channel.send(show())
                    }
                });
            } catch (err) {
                console.log(err)
            }
        }

    }
})

// TODO: knight: can move in L or in cappital Gamma (Γ)
// + 10/6 - 10/6   + 15/17 -15/17
// dishop: can move in diagonal() + 9/7 - 9/7
// rook: can move in cross() +8,16,24,32,40,48,56,64  +1,2,3,4,5,6,7,8 -1,2,3,4,5,6,7,8 -8,16,24,32,40,48,56,64

client.login(config.BOT_TOKEN);
