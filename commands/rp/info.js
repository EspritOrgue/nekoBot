module.exports = {
  common_names: ['rpinfo','ri'],
  title: "RP Info",
  description: "It will display the info about your status.",
  example: "!rpinfo <optional:user tag>",
  handle: function(bot){
    if(bot.message.mentions.everyone){
      bot.message.reply("You mentionned everyone, I cannot get everyone's info at once. -_-''");
    }else{
      var member, fet;
      if(bot.message.mentions.users.size == 0){
        member = bot.message.member;
      }else{
        member = bot.message.mentions.members.array()[0]
      }

      var role = member.roles;
      /*role.forEach(function(value, key, map){
        if(discord.helper.hasColor(value)){
          fet += value.name+", ";
        }
      });*/

      var memberData = bot.memberManager.getMember(member.id);
      if(memberData != undefined && memberData.rpg!=undefined){
        var totalExp = 0;
        var infoRE = [(member.nickname != undefined)?member.nickname+" ("+member.user.tag+")":member.user.tag,member.user.avatarURL,member.displayHexColor,member.user.avatarURL];
        for(rpClass in memberData.rpg.classList){
          totalExp += memberData.rpg.classList[rpClass].exp;
        }
        var field = [
          "Current class", memberData.rpg.current, true,
          "Current level", ((memberData.rpg.classList[memberData.rpg.current]!=undefined)?memberData.rpg.classList[current].level:"-∞"),true,
          "Current experience", ((memberData.rpg.classList[memberData.rpg.current]!=undefined)?memberData.rpg.classList[current].experience:"-∞"),true,
          "Total experience", totalExp,true,
          "Gold", memberData.rpg.gold, true
        ];
      }
      // console.log(fet);
      // var field = [
      // "Rank",member.hoistRole,true,
      // "Color",member.colorRole,true,
      // "Joined LPFG",(memberData!=undefined)?(memberData.joinDate!="")?memberData.joinDate.split("+")[0]:"unknown":"unknown",true,
      // "Joined the server",member.joinedAt.toUTCString(), true,
      // "Registered since",member.user.createdAt.toUTCString(), true,
      // "Member for",(D!=undefined)?Math.floor(D)+" days":"unkown",true,
      // "Next Veteran Rank",(Y!=undefined)?"Veteran "+Math.ceil(Y):"unkown",true,
      // "Next Veteran Rank in",(remD!=undefined)?(Math.floor(remD)+1)+" days":"unkown",true,
      // "Fetishes",(fet == "undefined")?"None":fet, true
      // ];

      var emb = bot.funct.richEmbed(infoRE,field);
      bot.message.channel.send({embed: emb});
    }
  }
}
