class Level{
	constructor(){

		this.level=1;
		this.element=document.getElementById("level");
		this.debug_level();

	}

	levelUp(){

		this.level++;
		this.debug_level();

	}

	debug_level(){
		console.log(this.level);
		this.element.innerHTML="level:"+this.level+",=調整中";

	}	

	getLevel(){
		console.log("level:"+this.level);
		return this.level;
	}

}