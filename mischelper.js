function mischelper(Discord,bot){
    this.Discord = Discord;
    this.bot = bot;
}

mischelper.prototype.toArray = function(string){
	var res = string.replace(/,/g,"").split(' ');
	var r = new Array();
	for(var i=0;i<res.length;i++){
		r[i]=res[i];
  	if(res[i].startsWith('"')){
  		for(var j=i+1;j<res.length+1;j++){
    		var sl = res.slice(i,j).toString().replace(/,,/g,"  ").replace(/,/g," ").replace(/  /g,", ");
      	if(sl.indexOf('"')==0&&sl.indexOf('"',1)==sl.length-1){
        	r[i] = sl.replace(/"/g,'');
        	i=j-1;
        	j=res.length;
      	}
    	}
   	}
	}
  console.log(r);
  return r.filter(function(value){if(value!=""){return value;}});
}

module.exports = mischelper;
