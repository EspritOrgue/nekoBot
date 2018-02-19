var disconnect = require("./owner/dc");
var eval = require("./owner/eval");
var admin = require("./admin/admin");
var addcolor = require("./admin/addcolor");
var poi = require("./admin/poi");
var nya = require("./fun/nya");
var setcolor = require("./management/setcolor");

function command(bot){
  this.bot = bot;
  this.bot.args = "";
  this.owner_commands = [
    disconnect,
    eval
  ];
  this.admin_commands = [
    admin,
    addcolor,
    poi
  ];
  this.fun_commands = [
    nya
  ];
  this.management_commands = [
    setcolor
  ];
  this.commands = [].concat(this.owner_commands,this.admin_commands,this.fun_commands,this.management_commands);
}

command.prototype.isCommand = function(msg){
  var cmd_name = msg[0].toLowerCase().substring(1);
  msg.shift();
  this.bot.args = msg;
  for(var i=0; i<this.commands.length; i++){
    if(this.owner_commands[i] != undefined && this.owner_commands[i].common_names.indexOf(cmd_name) != -1){
      if(this.bot.message.author.id == this.bot.owner){
        this.owner_commands[i].handle(this.bot);
        return;
      }
    }else if(this.admin_commands[i] != undefined && this.admin_commands[i].common_names.indexOf(cmd_name) != -1){
      if(this.bot.message.author.id == this.bot.message.guild.ownerID || this.bot.message.member.roles.find('id',this.bot.guild_info.admin[0])){
        this.admin_commands[i].handle(this.bot);
        return;
      }
    }else if(this.management_commands[i] != undefined && this.management_commands[i].common_names.indexOf(cmd_name) != -1){
      this.management_commands[i].handle(this.bot);
      return;
    }else if(this.fun_commands[i] != undefined && this.fun_commands[i].common_names.indexOf(cmd_name) != -1){
      this.fun_commands[i].handle(this.bot);
      return;
    }
  }
  console.log(this.bot.message.author.username+" used a wrong command.");
}

module.exports = command;
