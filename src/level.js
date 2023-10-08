class Level{
	
	constructor(){
		this.id=null;
		this.level=document.getElementById("level");
		this.levelNumber=this.setLevel();
		this.level.innerHTML="Level:"+this.levelNumber;
		console.log("level:ok")
	}

    levelUp(){
        this.levelNumber++;
        if(this.levelNumber>=8){
            this.level.innerHTML=this.levelNumber+"(MAX)";
            return;
        }
        this.level.innerHTML=this.levelNumber;
    }

    setLevel(){
		// URLを取得
		const url = new URL(window.location.href);
		// URLSearchParamsオブジェクトを取得
		const params = url.searchParams;
		// パラメータから「setLevel」を取得
		const level= params.get("setLevel");
        if(level===null){
            return 1;
        }
        return parseInt(level);
	}

}