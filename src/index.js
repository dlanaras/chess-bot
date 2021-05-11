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
function getFormatedField() {
    let formatedfield = "";

    field.forEach(value => {
        formatedfield += "\n";
        console.log("maybe")
        value.forEach(element => {
            formatedfield += element;
        })
    });
    return formatedfield;
}
client.on("message", function (message) {

    client.user.setActivity("with big pp", {
        type: "STREAMING",
        url: "https://github.com/YvesHuber/chess-bot"
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



        round(field, challenger, duelist)
        function round(field, challenger, duelist) {
            message.channel.send(getFormatedField())
            
            try {
                client.on('message', message => {
                    if (message.author.bot) return;
                    if (message.content != "") {
                        if (message.author.id == challenger.id)
                        turn = message.content.split(" ")
                        currentrow = turn[0].slice(0, 1) 
                        currentnum = turn[0].slice(1, 2)
                        futuretrow = turn[1].slice(0, 1) 
                        futurenum = turn[1].slice(1, 2)
                        function fieldchooser(row, number) {
                            index = 0
                            //dabaddby
                            console.log(row)
                            switch (row) {
                                case 'a':
                                    // field[y][0]
                                    field = 
                                    index = number * 8 + 1 - 9
                                    break
                                case 'b':
                                    // field[y][1]
                                    index = number * 8 + 2 - 9
                                    break
                                case 'c':
                                    // field[y][2]
                                    index = number * 8 + 3 - 9
                                    break
                                case 'd':
                                    // field[y][3]
                                    index = number * 8 + 4 - 9
                                    break
                                case 'e':
                                    // field[y][4]
                                    index = number * 8 + 5 - 9
                                    break
                                case 'f':
                                    //field[y][5]
                                    index = number * 8 + 6 - 9
                                    break
                                case 'g':
                                    // field[y][6]
                                    index = number * 8 + 7 - 9
                                    break
                                case 'h':
                                    // field[y][7]
                                    index = number * 8 + 8 - 9
                                    break
                            }

                            return index
                        }
                        currentfield = fieldchooser()
                        futurefield = fieldchooser()
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
                        message.channel.send(getFormatedField())
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
