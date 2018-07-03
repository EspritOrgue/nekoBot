let Discord = require("discord.js");
var bot = new Discord.Client();
let fs = require('fs');
let ytdl = require('ytdl-core');

var login = require('./login');
var owner = require('./owner');
var dialog = require('./dia');
var Command = require('./commands/commands');
var DiscordFunction = require('./discordFunction');
var MiscHelper = require('./mischelper');
var memberManager = require('./manager/memberManager');
var serverManager = require('./manager/serverManager');

const { Client } = require('discord-rpc');

if(login.hasOwnProperty(process.argv[2])){
  var tk = login[process.argv[2]].tk;
  var neko = login[process.argv[2]].name;
}else{
  var rand = Math.floor(Math.random())*(Object.keys(login).length-1);
  var tk = login[Object.keys(login)[rand]].tk;
  var neko = login[Object.keys(login)[rand]].name;
}
bot.neko = neko;
bot.command = new Command(bot);
bot.memberManager = new memberManager(bot);
bot.serverManager = new serverManager(bot);
bot.funct = new DiscordFunction(Discord,bot);
bot.helper = new MiscHelper(Discord,bot);
bot.owner = owner.id;
bot.file_path = owner.file_path;
bot.default_prefix ='!';

bot.on("message", msg => {
  if(msg.author.bot) return;

  if (msg.channel.type == "dm" || msg.channel.type == "group") {
    if(msg.author.id != owner.id){
      msg.reply("Sorry, I can't send you a message in private currently.");
    }
    else{
      msg.reply("hehehe. :heart:");
    }
  }
  else{
    var guild = msg.guild;
    bot.guild = guild;
    bot.guild_info = bot.serverManager.getServer(guild.id);

    if(!msg.content.startsWith(bot.default_prefix) && !msg.content.startsWith(bot.guild_info.prefix)) return;
    if(bot.guild_info.prefix != undefined && msg.content.startsWith(bot.default_prefix)) return;

    bot.message = msg;
    bot.dialog = dialog;
    bot.command.isCommand(bot.helper.toArray(msg.content.toString()));
  }
  msg.channel.stopTyping();
});

bot.on('guildMemberAdd', (member) => {
  var guild = member.guild;
  bot.guild = guild;
  bot.guild_info = bot.serverManager.getServer(guild.id);
  if(bot.guild_info.autorole != undefined){
    member.addRole(member.guild.roles.find("id",bot.guild_info.autorole)).then(output => {
        console.log("Role Given.");
    }).catch(err => {
        console.log("Error when trying to give the role to that user "+member.tag);
    });
  }
    var channel = member.guild.channels.get("349870683284832258");
    var emb = bot.funct.richEmbed([member.guild.name,undefined,'RANDOM',member.user.avatarURL,member.user.tag+" has joined the server."]);
    channel.send({embed:emb});
    var chan = member.guild.channels.get("158225197877559296");
    chan.send("Welcome to my harem "+member+", nyaa.~\n\nBefore doing anything else, I recommend you to read "+member.guild.channels.get("315935055379693569")+" and "+member.guild.channels.get("315937156373807104")+", if you don't and you do something bad, my masters will be very hard on you, nyaaa.~\n\nEnjoy your stay with us, nyaaa.~",{embed: {
        color: Math.floor(Math.random()*0xffffff),
        author: {
        name: bot.user.username,
        icon_url: bot.user.avatarURL
      },
      title: 'Useful commands',
      description: 'The following commands are the main one you may want to use to get yourself cozy on the server.',
      fields: [
        {
          name: '!create g+ username, g+ url',
          value: 'If an admin still didn\'t add you your join date on the G+ group, you can use this command to create your profile'
        },
        {
          name: '!edit username name or !edit url g+ url',
          value: 'If your join date was given by an admin, you can use this command to add the usernamde and url to your profile.'
        },
        {
          name: '!setcolor',
          value: 'This will show you a list of color you can add by yourself. (The command to do so will be given at the same time)'
        },
        {
          name: '!role',
          value: 'This will show you a list of role you can add by yourself. (The command to do so will be given at the same time)'
        }
      ]
}})});

bot.on('guildMemberRemove', (member) => {
    var channel = member.guild.channels.get("349870683284832258");
    var emb = bot.funct.richEmbed([member.guild.name,undefined,'RANDOM',member.user.avatarURL,member.user.tag+" has left the server."]);
    channel.send({embed:emb});
    var chan = member.guild.channels.get("158225197877559296");
    chan.send(member.displayName+" left the server, nyaaa.~\n\nI wonder why, nyaaa.~");
});

bot.on('guildBanAdd', (guild,member) => {
    var channel = guild.channels.get("349870683284832258");
    var emb = bot.funct.richEmbed([guild.name,undefined,'RANDOM',member.avatarURL,member.tag+" was banned from "+guild]);
    channel.send({embed:emb});
    var chan = guild.channels.get("158225197877559296");
    chan.send(member.displayName+" is banned from the server, nyaaa.~\n\nI hope my masters will never unban that shitty guy, nyaaa.~");
});

bot.on('guildBanRemove', (guild,member) => {
    var channel = guild.channels.get("349870683284832258");
    var emb = bot.funct.richEmbed([guild.name,undefined,'RANDOM',member.user.avatarURL,member.user.tag+" was unbanned from "+guild]);
    channel.send({embed:emb});
});

bot.on('channelCreate', (chan) => {
    if(chan.type == 'text'){
      var channel = chan.guild.channels.get("349870807348150272");
      var emb = bot.funct.richEmbed([chan.guild.name,undefined,'RANDOM',chan.guild.iconURL,chan+"("+chan.name+") is created."]);
      channel.send({embed:emb});
    }
});

bot.on('channelDelete', (chan) => {
    var channel = chan.guild.channels.get("349870807348150272");
    var emb = bot.funct.richEmbed([chan.guild.name,undefined,'RANDOM',chan.guild.iconURL,chan+"("+chan.name+") is deleted."]);
    channel.send({embed:emb});
});

/*bot.on('channelUpdate', (oChan,nChan) => {
    var channel = oChan.guild.channels.get("349870807348150272");
    var change = "";
    (oChan.name == nChan.name)?(oChan.topic == nChan.topic)?var change = oChan.name+" topic s was changed to "+nChan.name:var change = oChan.name+" name was changed to "+nChan.name;
    var emb = funct.richEmbed([oChan.guild.name,undefined,'RANDOM',oChan.guild.iconURL,chan+"("+chan.name+") is created."]);
    channel.send({embed:emb});
});*/

bot.on('messageDelete', (msg) => {
    var channel = msg.guild.channels.get("349870715950071809");
    var emb = bot.funct.richEmbed([msg.guild.name,undefined,'RANDOM',msg.guild.iconURL,"The message from "+msg.author+" was deleted."],["Content",(msg.content!="")?msg.content:msg.embeds[0],false]);
    channel.send({embed:emb});
});

bot.on('messageUpdate', (oMsg, nMsg) => {
    if(nMsg.content!="" && oMsg.content != nMsg.content){
        var channel = oMsg.guild.channels.get("349870715950071809");
        var emb = bot.funct.richEmbed([oMsg.guild.name,undefined,'RANDOM',oMsg.guild.iconURL,oMsg.author+" edited a message."],["Old Message",oMsg.content,false,"New Message",nMsg.content,false]);
        channel.send({embed:emb});
    }
});

bot.on("ready", () => {
  console.log(dialog[neko].greetings.toString());
  var channel = bot.guilds.find("id","158225197877559296").channels.find("id","158225197877559296");
  //channel.send(dialog[neko].greetings);
  bot.user.setPresence({ game: { name: dialog[neko].games[Math.floor(Math.random()*dialog[neko].games .length)], type: 0 } })
  .then(function(){console.log("Game set")})
  .catch(function(){console.log("Game not set")});

  /*const clientID = bot.user.id;
  const scopes = ['rpc', 'rpc.api', 'messages.read'];

  // This demonstrates discord's implicit oauth2 flow
  // http://discordapi.com/topics/oauth2#implicit-grant

  const accessToken = tk;


  const client = new Client({ transport: 'websocket' });

  client.on('ready', () => {
    console.log('Logged in as', client.application.name);
    console.log('Authed for user', client.user.tag);
  });

  // Log in to RPC with client id and access token
  client.login(clientID, { accessToken, scopes });*/

  var change = false;
  bot.memberManager.load();
  bot.serverManager.load();

  bot.setTimeout(function(){
  bot.guilds.forEach(function(server){
    if(bot.serverManager.serverList[server.id] == undefined){
      console.log(server.id+" is not on the server list");
      bot.serverManager.createEmptyServer(server);
      change = true;
    }else{
      console.log(server.id+" is on the server list");
    }
  });
  if(change){
    bot.serverManager.save();
  }
},1000);
});

bot.on('disconnect', (event) => {
    console.log("disconnected");
});

bot.on('reconnecting', (event) => {
    console.log("reconnecting");
});

process.on('uncaughtException', function (err) {
    console.log('Uncaught Exception: \n' + err.stack);
});

process.on("unhandledRejection", err => {
    console.log("Uncaught Promise Error: \n" + err.stack);
});

bot.login(tk);
