module.exports= {
  common_names: ['votecolor','vc'],
  description: "Vote for a color for the voted role.",
  title: "Vote color",
  example: "!vc <hexadecimal color>",
  max_count: 0,
  handle: function(bot){
    if(this.max_count < bot.funct.returnRole(bot.guild_info.voterole).members.size/2)this.max_count = Math.ceil(bot.funct.returnRole(bot.guild_info.voterole).members.size/2);
    if(bot.guild_info.votecount==undefined)bot.guild_info.votecount=0;
    if(bot.guild_info.votescore==undefined)bot.guild_info.votescore=0;
    if(bot.args[0] != undefined){
      if(bot.message.member.roles.find("id",bot.guild_info.voterole)){
        if(bot.guild_info.voterole != undefined){
          if(bot.guild_info.votecolor == undefined){
            if((/^#.[0-9a-fA-F]+$/.test(bot.args[0]) && bot.args[0].length == 7) || (/^[0-9a-fA-F]+$/.test(bot.args[0]) && bot.args[0].length == 6)){
              bot.message.reply("This color will be set for the role when enough score will be high enough.");
              bot.guild_info.votecolor = bot.args[0];
              bot.guild_info.votecount++;
              bot.guild_info.votescore++;
            }else{
              bot.message.reply("The argument you entered seems to be invalid.");
            }
          }else{
            if(bot.args[0] == "accept"){
              bot.guild_info.votecount++;
              bot.guild_info.votescore++;
              bot.message.reply("Vote for "+bot.guild_info.votecolor+" currently at "+bot.guild_info.votecount+" with a score of "+bot.guild_info.votescore+"/"+this.max_count);
            }else if(bot.args[0] == "decline"){
              bot.guild_info.votecount++;
              bot.guild_info.votescore--;
              bot.message.reply("Vote for "+bot.guild_info.votecolor+" currently at "+bot.guild_info.votecount+" with a score of "+bot.guild_info.votescore+"/"+this.max_count);
            }else{
              bot.message.reply("A color is currently under vote, please use (prefix)vc accept or decline");
            }
          }
          if(bot.guild_info.votescore == this.max_count){
            bot.message.channel.send("There is enough vote for the color to be set.");
            var color=bot.funct.returnRole(bot.guild_info.voterole);
            color.setColor(bot.guild_info.votecolor);
            bot.guild_info.votecolor = undefined;
            bot.guild_info.votecount = 0;
            bot.guild_info.votescore = 0;
          }else if(bot.guild_info.votescore == 0){
            bot.message.channel.send("The score is low enough for the vote to be null.");
            bot.guild_info.votecolor = undefined;
            bot.guild_info.votecount = 0;
            bot.guild_info.votescore = 0;
          }
        }else{
          bot.message.reply("No voted role were set.");
        }
      }else{
        bot.message.channel.send("You do not have the role to vote, please add it via setcolor.");
      }
    }else{
      bot.message.channel.send("The current vote is for: "+bot.guild_info.votecolor+"\nThere is currently "+bot.guild_info.votecount+" vote(s) for this color with a score of "+bot.guild_info.votescore+" (need "+this.max_count+")");
    }
  }
}
