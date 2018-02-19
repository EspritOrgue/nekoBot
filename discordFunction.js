function discordFunction(Discord,bot){
    this.Discord = Discord;
    this.bot = bot;
}

discordFunction.prototype.richEmbed = function(info = undefined,field = undefined ,option = undefined){
    this.emb = new this.Discord.RichEmbed();
    if(info != undefined){
        //[0] = author, [1] = avatar, [2] = color, [3] = thumbnail, [4] = description, [5] = Footer, [6] = image, [7] = Title, [8] = file
        if(info[0]!= undefined && info[1]!=undefined)this.emb.setAuthor(info[0],info[1]);
        else if(info[0]!= undefined)this.emb.setAuthor(info[0]);
        if(info[2]!= undefined)this.emb.setColor(info[2]);
        if(info[3]!= undefined)this.emb.setThumbnail(info[3]);
        if(info[4]!= undefined) this.emb.setDescription(info[4]);
        if(info[5]!= undefined) this.emb.setFooter(info[5]);
        if(info[6]!= undefined) this.emb.attachFile(info[6]);
        if(info[7]!= undefined) this.emb.setTitle(info[7]);
        if(info[8]!= undefined) this.emb.attachFile(info[8]);
    }
    if(field != undefined && field.length%3 == 0){
        for(var i = 0;i < field.length; i += 3){
            this.emb.addField(field[i],field[i+1],field[i+2]);
        }
    }
    if(option != undefined){

    }
    return this.emb;
}

discordFunction.prototype.isRole = function(role){
  var r = false;
  this.bot.message.guild.roles.forEach(function(value,key,map){
    if(value.id == role){
      console.log(role+" is a role.");
      r = true;
    }else if(value.name == role){
      console.log(role+" is a role.");
      r = true;
    }
  });
  if(!r)console.log(role+" is not a correct role");
  return r;
}

discordFunction.prototype.returnRole = function(role){
  var r = false;
  this.bot.message.guild.roles.forEach(function(value,key,map){
    if(value.id == role){
      console.log(value.name);
      r = value;
    }else if(value.name == role){
      console.log(value.name);
      r = value;
    }
  });
  return r;
}

module.exports = discordFunction;
