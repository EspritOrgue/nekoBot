let Discord = require("discord.js");
var bot = new Discord.Client();
let fs = require('fs');
let ytdl = require('ytdl-core');
var login = require('./login');
var rand = Math.floor(Math.random())*Object.keys(login).length;
var neko = login[Object.keys(login)[rand]].name;
console.log(login[Object.keys(login)[rand]]);
bot.on("message", msg => {

});

bot.login(login[Object.keys(login)[rand]].tk);
