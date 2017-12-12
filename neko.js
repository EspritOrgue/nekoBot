let Discord = require("discord.js");
var bot = new Discord.Client();
let fs = require('fs');
let ytdl = require('ytdl-core');
var login = require('./login');
var owner = require('./owner');
var rand = login.test.status?Object.keys(login).length-1:Math.floor(Math.random())*(Object.keys(login).length-1);
var neko = login[Object.keys(login)[rand]].name;

var disconnect = require("./commands/owner/dc");

const CMD = [
  disconnect
];

bot.on("message", msg => {
  if(msg.author.bot){
    return;
  }
  if (msg.channel.type == "dm" || msg.channel.type == "group") {
    if(msg.author.id != owner.id){
      msg.reply(msg.author.id+" "+owner.id);
      msg.reply("Sorry, I can't send you a message in private currently.");
    }
    else{
      msg.reply("hehehe. :heart:");
    }
  }
  else{
    if(msg.author. id == owner.id){

    }
  }
});

bot.on("ready", () => {
  //bot.guilds.forEach();
  console.log(neko+"'s ready, Master.~");
});

bot.login(login[Object.keys(login)[rand]].tk);
