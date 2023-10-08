class Score{
	
	constructor(){
		this.id=null;
		this.score=document.getElementById("score");
		this.scoreNumber=0;
		this.score.innerHTML="score:"+this.scoreNumber;
		console.log("score:ok")
	}

	addScore(score){
		this.scoreNumber+=score;
		this.score.innerHTML="score:"+this.scoreNumber;
	}

	getScore(){
		console.log("score:"+this.score);
		return this.score;
	}

}