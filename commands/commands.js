var disconnect = require("./owner/dc");
var eval = require("./owner/eval");
var nickall = require("./owner/nickall");
var test = require("./owner/test");
var admin = require("./admin/admin");
var addcolor = require("./admin/addcolor");
var addfetishes = require("./admin/addfetishes");
var addvotecolor = require("./admin/addvotecolor");
var autorole = require("./admin/addautorole");
var changecolor = require("./admin/changecolor");
var prefix = require("./admin/prefix");
var poi = require("./admin/poi");
var nya = require("./fun/nya");
var no_cmd = require("./fun/no_command");
var setcolor = require("./management/setcolor");
var setfetishes = require("./management/setfetishes");
var votecolor = require("./management/votecolor");
var info = require("./info/info");
var serverinfo = require("./info/serverinfo");
var rpinfo = require("./rp/info");

function command(bot){
  this.bot = bot;
  this.bot.args = "";
  this.owner_commands = [
    disconnect,
    eval,
    nickall,
    test
  ];
  this.admin_commands = [
    admin,
    addcolor,
    addfetishes,
    addvotecolor,
    autorole,
    changecolor,
    poi,
    prefix
  ];
  this.fun_commands = [
    no_cmd,
    nya
  ];
  this.management_commands = [
    setcolor,
    setfetishes,
    votecolor
  ];
  this.info_commands = [
    info,
    serverinfo
  ];
  this.rp_commands = [
    rpinfo
  ];

  this.commands = [].concat(this.owner_commands,this.admin_commands,this.fun_commands,this.management_commands,this.info_commands, this.rp_commands);

  this.modules = {
    "admin": {
      "name": "Admin",
      "description": "A module regrouping all admin commands",
      "commands": this.admin_commands
    },
    "fun": {
      "name": "Fun",
      "description": "A module regrouping all fun commands",
      "commands": this.fun_commands
    },
    "info": {
      "name": "Info",
      "description": "A module regrouping all info commands",
      "commands": this.info_commands
    },
    "management": {
      "name": "Management",
      "description": "A module regrouping all management commands",
      "commands": this.management_commands
    },
    "owner": {
      "name": "Owner",
      "description": "A module regrouping all owner commands",
      "commands": this.owner_commands
    },
    "rp": {
      "name": "RP",
      "description": "A module regrouping all RP commands.",
      "commands": this.rp_commands
    }
  };
}

command.prototype.isCommand = function(msg){
  var cmd_name = msg[0].toLowerCase().substring(this.bot.guild_info.prefix.length);
  msg.shift();
  this.bot.args = msg;
  console.log(this.bot.args);
  if(cmd_name == "help"){
    if(this.bot.args[0] != undefined && this.modules[this.bot.args[0].toLowerCase()]){
        var infoRE = [this.bot.message.guild.members.find('id',this.bot.user.id).displayName,this.bot.user.avatarURL,this.bot.message.guild.members.find('id',this.bot.user.id).displayHexColor,this.bot.message.guild.iconURL, "The module "+this.bot.args[0].toLowerCase()+" has the following commands:"]
        var field = [];
        for(var i=0; i<this.modules[this.bot.args[0].toLowerCase()].commands.length; i++){
          field.push(this.modules[this.bot.args[0].toLowerCase()].commands[i].title,this.modules[this.bot.args[0].toLowerCase()].commands[i].description+"\n**All aliases**: "+this.modules[this.bot.args[0].toLowerCase()].commands[i].common_names.join(', ')+"\n**Example**: "+this.modules[this.bot.args[0].toLowerCase()].commands[i].example,'false');
        }
        var emb = this.bot.funct.richEmbed(infoRE,field);
        this.bot.message.channel.send({embed:emb});
    }else{
        var infoRE = [this.bot.message.guild.members.find('id',this.bot.user.id).displayName,this.bot.user.avatarURL,this.bot.message.guild.members.find('id',this.bot.user.id).displayHexColor,this.bot.message.guild.iconURL, "The following modules are available.\nTo get the help for one oof them, type: ``!help <module name>``"]
        var field = [];

        for(obj in this.modules){
          field.push(this.modules[obj].name,this.modules[obj].description,'false');
        }
        var emb = this.bot.funct.richEmbed(infoRE,field);
        this.bot.message.channel.send({embed:emb});
    }
  }else{
    var isCommand = false;
    var i = 0;
    while(!isCommand && i < this.commands.length){
      console.log(this.commands[i].title+" has a white-listed channel: "+this.commands[i].channel);
      if(this.commands[i].common_names.indexOf(cmd_name) != -1 && (this.commands[i].channel == undefined || this.bot.guild_info[this.commands[i].channel].indexOf(this.bot.message.channel.id) != -1)){
        if(this.owner_commands.indexOf(this.commands[i]) != -1){
          if(this.bot.message.author.id == this.bot.owner){
            isCommand = true;
          }
        }else if(this.admin_commands.indexOf(this.commands[i]) != -1){
          if(this.bot.message.author.id == this.bot.message.guild.ownerID || this.bot.message.member.roles.find('id',this.bot.guild_info.admin[0])){
            isCommand = true;
          }
        }else if(this.management_commands.indexOf(this.commands[i]) != -1){
          isCommand = true;
        }else if(this.fun_commands.indexOf(this.commands[i]) != -1){
          isCommand = true;
        }else if(this.info_commands.indexOf(this.commands[i]) != -1){
          isCommand = true;
        }else if(this.rp_commands.indexOf(this.commands[i]) != -1){
          isCommand = true;
        }else{
          i++;
        }
      }else{
        i++;
      }
    }
    if(isCommand){
      this.commands[i].handle(this.bot);
      this.bot.message.channel.stopTyping();
      return;
    }else{
      console.log(this.bot.message.author.username+" used a wrong command.");
    }
  }
}

module.exports = command;
