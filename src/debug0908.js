setBlockSize()
let stage=new Stage("canvas");
let clock=30;
this.time=new Timer(clock);
draw(stage);
let fps=config.FPS;
console.log(fps);
let frame=0;

let flag=true;

let leftFlag=false;
let rightFlag=false;
let downFlag=false;
let rotateFlag=false;
let reverseRotateFlag=false;
let listener=addEventListener("keydown",(e)=>{
	console.log(e.keyCode);
	switch(e.keyCode){
		case 16://shift
			stage.enterReverseRotateKey();
		break;
		case 37://←
			stage.enterLeftKey();
		break;
		case 87://↑
		case 65:
			stage.enterRotateKey();
		break;
		//case 68://→
		case 39:
			stage.enterRightKey();
		break;
		case 83://↓
		case 40:
			stage.enterDownKey();
			break;
		case 68:
			stage.enterReverseRotateKey();
		break;
	}
	
});

let continuer=setTimeout(loop2,1000/clock);


function loop2(){
	if(stage.move1Frame()){

		let continuer=setTimeout(loop2,1000/clock);
		time.timeCount();
		if(time.timeUp()){
			time.showTimeUp();
			clearTimeout(continuer);	
		};
		
	}else{
		clearTimeout(continuer);
	}

}
