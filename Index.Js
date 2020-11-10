const Discord = require('discord.js')
const bot = new Discord.Client()
const ms = require('ms')
bot.login(//your login token here)
const prefix = ":";
const quiz = require(//json file with questions)
var verzion = "2.0.0"
var adminastrator = ""
const ping = require('minecraft-server-util')
const anilist = require('anilist-node');
const media = require('anilist-node/lib/media');
const { anime } = require('anilist-node/lib/lists');
const Anilist = new anilist()
//in discord bots, there is a prefix that is followed by a command in a way to know if you are referring to the bot
bot.on('ready', () => {
    console.log('I have become self-aware.')
    bot.user.setActivity(':help ', { type: "Playing" }.catch); //this line is pretty useless, but it will show the bot's custom status.
})
bot.on('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return
    let args = message.content.slice(prefix.length).split(" ")

    switch (args[0]) {
        case 'info':
            if (args[1] === 'version') { //defines arguments. This will be useful later. An argument is a word, set apart by spaces.
                //case:info: will send basic information about builds
                message.channel.send('The current build is Version ' + verzion)
            } else {
                message.channel.send("Patch Notes: Official Release is here! Access basic commands with :help")
            }
            break;
        case 'help':
            //case:help: it will send basic instructions
            message.reply('A message entitling all commands currently available have been sent to you.')
            const exo = new Discord.MessageEmbed()
                .setColor('#ffcc00') //This is a yellow hue. 
                .setTitle('Commands') //This is for the creation of a MessageEmbed, commonly used to display information in a concise area that is easily accessible.
                .setURL('https://discord.js.org/')
                .setAuthor('Created by me', 'https://i.stack.imgur.com/VM8eJ.png', 'https://discord.js.org') //the image link is a picture of Shinji from Eva sitting in a chair.
                .setDescription('These are the commands that are currently in place for loser bot.')
                .setThumbnail('https://i.stack.imgur.com/VM8eJ.png')
                .addFields(
                    { name: 'All commands are to be called with the prefix :', value: 'stupid' },
                    { name: '\u200B', value: '\u200B' },
                    { name: '`Ban`', value: 'Ban members within 5 seconds automatically, can be prevented by a prompt of reactions', inline: true },
                    { name: '`Kick`', value: 'Will kick any member immediately, must be followed with an @ with the user', inline: true },
                    { name: '`Mute`', value: 'Will mute any member for any denomination of time', inline: true },
                    { name: '`Clear`', value: 'Will clear any amount of messages from the server, list how many after writing clear', inline: true },
                    { name: '`Mc`', value: 'Will give info on any given minecraft server, after writing the command, follow it with the server address and port.', inline: true },
                    { name: '`Unmute`', value: 'Unmutes anyone that is currently muted.', inline: true },
                    { name: '`qban`', value: 'Quick Ban; bans a member in the server instantaneously', inline: true }
                )
                .addField('`Version`', 'The current build is ' + verzion, true)
                .setImage('https://i.stack.imgur.com/VM8eJ.png')
                .setTimestamp()
                .setFooter('Text', 'https://i.stack.imgur.com/VM8eJ.png')
            message.author.send(exo)
            break;
        case 'clear':
            if (!args[1]) return message.reply('Error please define how many messages are to be cleared')
            if (message.guild) {
                message.channel.bulkDelete(args[1])
            } else {
                message.reply('Deleting messages does not work in private messages!')
            }
            break;
        case 'kick':
            if (message.member.hasPermission(['KICK_MEMBERS'])) {
                const user = message.mentions.users.first();
                const member = message.guild.member(user);
                if (user) {
                    if (`${user.tag}` === 'Wesusa#4163') {
                        adminastrator = 'Yes'
                        if (adminastrator === 'Yes') {
                            message.reply('You cant do that.')
                            message.channel.send('https://tenor.com/view/jotaro-kujo-insult-jo-jos-bizarre-jojo-gif-12717155')
                        }
                    } else {
                        if (user) {
                            if (member) {
                                member.kick('You were removed from this server.').then(() => {
                                    message.reply(`Sucessfully kicked ${user.tag}`)
                                }).catch(err => {
                                    message.reply(`Unsucessful attempt to kick ${user.tag}`)
                                    console.log(err)
                                })
                            } else {
                                message.reply('That user isn\'t in this server!')
                            }
                        } else {
                            message.reply('You need to specify a person!')
                        }
                    }
                }
            } else {
                message.reply("You do not have permission to do that!")
            }
            break;

        case 'ban': //The ban command is quite complex. I'll do my best to explain it.
            (async () => {
                if (!args[1]) return message.channel.send('You need to specify a person!'); //If the statement is missing the second word, which in this case would be the person, it will notify you.
                const sweden = message.mentions.users.first()
                if (message.author.id != sweden.id) { //If the person detailed in the ban command is not the person initating ban, the following code will be executed.
                    if (!args[2]) return message.channel.send('Please specify a time for how long the ban council will last.') //A time is need to be set in order for this ban council to start.
                    if (!message.guild) return message.channel.send('Banning does not work here!'); //If the ban message is sent in a private message or a group chat, this message will be sent.
                    if(`${sweden.tag}` != "//your username and number here"){ //The reason I created this was so you would not be able to be banned from the server. It's useless yes, but funny if someone tries to ban you.
                    if (sweden) {
                        const tim = args[2]
                        const lyft = message.guild.member(sweden)
                        if (message.member.hasPermission(['KICK_MEMBERS', 'BAN_MEMBERS'])) {
                            const mappo = ['👍', '👎']
                            message.react('👍').then(() => message.react('👎'))

                            const embad = new Discord.MessageEmbed()
                                .setTitle('Ban Council')
                                .addField('The Convicted:', `${sweden.tag}`)
                                .addField('Rules:', 'Vote on whether the convicted is guilty or not with the prompted reactions.')
                            const embedMessage = await message.channel.send(embad);

                            setTimeout(function () {
                                if (!sweden) return message.reply('You need to mention a person');

                                const filter = (reaction) => mappo.includes(reaction.emoji.name);
                                message.awaitReactions(filter, { time: 6000 })
                                    .then(collection => {
                                        //not the most optimal way to do it
                                        const upvotes = message.reactions.cache.map(r => `${'👍'} ${r.users.cache.size}`)[0] //This can count the number of reactions. It's quite difficult to make.
                                        const downvotes = message.reactions.cache.map(r => `${'👍'} ${r.users.cache.size}`)[1]

                                        if (upvotes > downvotes) {
                                            lyft.ban({ reason: 'Majority has exiled you from server.' })
                                                .then(() => message.reply(`The user ${sweden.tag} was banned from the server ${message.guild.name} as a result of a majority vote.`));
                                        } else {
                                            message.channel.send('The ban was cancelled.');
                                        }

                                    })
                                    .catch(console.error);
                            }, tim);
                        } else {
                            message.reply("You do not have permission to do that!")
                        }
                    } else {
                        message.channel.send('That user is not in the server.')
                    }
                }else{
                    message.channel.send("I'm sorry, but you can't do that.")
                    message.channel.send("https://tenor.com/view/no-jojo-jotaro-kujo-anime-gif-11127067")
                }
                } else {
                    message.channel.send('You cannot ban yourself!')
                }
            })();


            break;

        case 'mc':
            if (!args[1]) return message.channel.send('You must type a minecraft server ip')
            if (!args[2]) return message.channel.send('You must type a minecraft server port')

            ping(args[1], parseInt(args[2]), (error, reponse) => {
                if (error) throw error
                const embid = new Discord.MessageEmbed()
                    .setTitle('Server Status')
                    .addField('Server IP', reponse.host)
                    .addField('Server Version', reponse.version)
                    .addField('Online Players', reponse.onlinePlayers)
                    .addField('Max Players', reponse.maxPlayers)

                message.channel.send(embid)
            })
            break;

        case 'mute':
            let person = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[1]))
            if (!person) return message.reply("Couldn't find that user");
            
            let mainrole = message.guild.roles.cache.find(r => r.name === "bum")
            if (!muterole) return message.reply("couldn't find the mute role, reset by using command reset role:")

            let time = args[2];
            if (!time) {
                return message.reply("Specify a denomination of time!")
            }
            //since v.12 it has been changed from removeRoles to var.roles.add/var.roles.remove
            person.roles.remove(mainrole.id);
            person.roles.add(muterole.id);

            message.channel.send(`@${person.user.tag} has now been muted for ${ms(ms(time))}`)

            setTimeout(function () {
                person.roles.add(mainrole.id);
                person.roles.remove(muterole.id);
                message.channel.send(`@${person.user.tag} has now been unmuted.`)
            }, ms(time));

            break;

        case 'unmute':
            if (!args[1]) return message.channel.send('You must specify a person!')
            let nerson = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[1]))
            if (!nerson) return message.channel.send('Couldnt find that user!')
            let bainrole = message.guild.roles.cache.find(r => r.name === "bum")
            let buterole = message.guild.roles.cache.find(r => r.name === "Muted")
            nerson.roles.remove(buterole.id)
            nerson.roles.add(bainrole.id)
            message.channel.send(`${nerson.user.tag} has now been unmuted.`)
            break;

        case 'qban':
            const uber = message.mentions.users.first()

            if (uber) {
                const tier = message.guild.member(uber)
                if (message.author.id != uber.id) {
                    if (tier) {
                        tier.ban({ ression: 'You were banned from the server.' }).then(() => {
                            message.reply(`The user ${uber.tag} was banned.`)
                        })
                    } else {
                        message.reply('That user isn\'t in this server.')
                    }
                } else {
                    message.channel.send('You cannot ban yourself!')
                }
            } else {
                message.reply('You need to specify a person!')
            }
            break;

        case 'update':
            var cu = ':qban'
            var kelp = 'Prefixes work 100 percent of the time, previously they would be shaky and accept basically anything.'
            var update = new Discord.MessageEmbed()
                .setTitle('Updates in Version ', verzion)
                .addField('Majority voting on bans is now possible! Start a ban council by typing :ban, or just stay with regular bans with', cu)
                .addField('Quality of life updates, these including but no limited to: ', kelp)
            message.channel.send(update)
        break;

        case 'invite': //really simple command, just sends a link to invite this bot to a server.
            message.reply('\nhttps://discord.com/oauth2/authorize?client_id=717500184908660897&scope=bot\nHope to see you soon!');
        break;

    }
});
