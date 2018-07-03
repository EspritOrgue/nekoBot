module.exports = {
  common_names: ['serverinfo','si'],
  title: "Server Info",
  description: "It will display the info about the server.",
  example: "!serverinfo",
  handle: function(bot){
    var emoji_string = [""];
    var i=0;
    var emoji_size = 0;
    var emoji_anim_size = 0;
    bot.guild.emojis.forEach(function(value,key){
      if(!value.animated){
        if(emoji_string[i].length+value.identifier.length < 1010){
          emoji_string[i] += "<:"+value.identifier+">";
        }else{
          i++;
          emoji_string[i] = "<:"+value.identifier+">";
        }
        emoji_size++;
      }
      else{
        emoji_anim_size++;
      }
    });
    console.log(emoji_string.toString());
    //if(emoji_string.length>1024)emoji_string=emoji_string.substring(0,1024);
    console.log(emoji_string.length);
    if(bot.guild.available){
      var infoRE =[bot.guild.nameAcronym ,bot.guild.iconURL,'#ffffff',bot.guild.iconURL,,,,bot.guild.name];
      var field = [
        'Id',bot.guild.id,true,
        'Region',bot.guild.region,true,
        'Created at',bot.guild.createdAt,true,
        'Owner',bot.guild.owner,true,
        'Member count',bot.guild.memberCount,true,
        'Role count',bot.guild.roles.size,true,
        'Channel count',bot.guild.channels.size,true,
        'Main channel',bot.guild.systemChannel,true,
        'Default role',bot.guild.defaultRole,true,
        'Verification level',bot.guild.verificationLevel,true,
        'Prefix used',bot.guild_info.prefix,true,
        'Emoji count',emoji_size,true,
        "Animate Emoji Count",emoji_anim_size,true
      ];
      for(emoji in emoji_string){
        var index = emoji;
        index++;
        field.push("Emoji "+index+"/"+emoji_string.length,emoji_string[emoji],false);
      }
      var emb = bot.funct.richEmbed(infoRE,field);
      bot.message.channel.send({embed: emb});
    }
  }
}
