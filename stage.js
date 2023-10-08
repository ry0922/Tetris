class Stage{
	constructor(id){
		//config.initialize();
		// キャンバスの設定
		this.next=new Next();
		this.mino=new Mino(this.next.nextBlock(),this);
		this.frame=0;//何フレーム数えたか
		this.clock=30;//何フレームで下に動くか
		this.moveFlag={down:false,left:false,right:false};
		this.rotateFlag={left:false,right:false}
		this.effectState = {flipFlop: 0, speed: 4, count: 0};


		this.mode=config.GAME;
		this.BLOCK_SIZE = config.BLOCK_SIZE;		// 1ブロックのサイズ
		this.BLOCK_RAWS = config.BLOCK_RAWS;	// ステージの高さ（20ライン分をステージとして使用し、上下1ラインはあたり判定とブロックコピー用に使用）
		this.BLOCK_COLS = config.BLOCK_COLS;	// ステージの幅
		this.canvas=document.getElementById(id);
		this.SCREEN_WIDTH = this.BLOCK_SIZE * this.BLOCK_COLS;	// キャンバスの幅
		this.SCREEN_HEIGHT = this.BLOCK_SIZE * this.BLOCK_RAWS;	// キャンバスの高さ
		canvas.width = this.SCREEN_WIDTH;
		canvas.height = this.SCREEN_HEIGHT;
		this.g = canvas.getContext("2d");
		this.stage=new Array();

		let UpSpace=new Array();
		for(let j=0;j<this.BLOCK_COLS+2;j++){
			UpSpace[j]=0;
		}
		this.stage[0]=UpSpace;
		for(let i=0;i<this.BLOCK_RAWS;i++){
			let line=new Array();
			line[0]=9;
			let j;
			for(j=0;j<this.BLOCK_COLS;j++){
				line[j+1]=0;
			}
			line[j+1]=9;
			this.stage=line;
		}
		let DownSpace=new Array();
		for(let j=0;j<this.BLOCK_COLS+2;j++){
			DownSpace[j]=0;
		}
		this.stage[this.stage.length]=DownSpace;
		/*
		this.stage=[
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],	// ←表示しない
			[9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9],
			[9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9],
			[9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9],
			[9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9],
			[9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9],
			[9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9],
			[9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9],
			[9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9],
			[9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9],
			[9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9],
			[9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9],
			[9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9],
			[9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9],
			[9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9],
			[9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9],
			[9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9],
			[9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9],
			[9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9],
			[9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9],
			[9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]];	// ←表示しない
		*/
/*
		this.field=[];
		let num=0;
		this.stage.forEach(element => {
			this.field[num++]=element;
		});
		console.table(this.field);
*/		
			this.field=[
				[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],	// ←表示しない
				[9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9],
				[9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9],
				[9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9],
				[9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9],
				[9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9],
				[9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9],
				[9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9],
				[9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9],
				[9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9],
				[9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9],
				[9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9],
				[9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9],
				[9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9],
				[9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9],
				[9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9],
				[9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9],
				[9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9],
				[9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9],
				[9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9],
				[9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
				[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]];	// ←表示しない
		console.table(this.field);
//		console.log("debug:"+this.BLOCK_RAWS+","+this.BLOCK_COLS);
	// ステージデータをコピーする
		this.bs = this.BLOCK_SIZE;
		
		
		this.score=new Score();

		this.level=new Level();
		this.setClock(this.level.levelNumber);
	}


/*
 * ゲーム画面クリア
 */
clearWindow(){
	this.g.fillStyle = config.BACK_COLOR;
	this.g.fillRect(0, 0, this.SCREEN_WIDTH, this.SCREEN_HEIGHT);
}

setStage(){
	// 表示するための配列
	this.field=new Array();
	// ステージデータをコピーする
	//console.log("debug"+this.BLOCK_RAWS+":"+this.BLOCK_COLS);
	for(let i=0; i<this.BLOCK_RAWS; i++){
		for(let j=0; j<this.BLOCK_COLS; j++){
			this.field[i][j] = this.stage[i][j];
		}
	}
}
/*

ライン消去など

*/
gameOver(){
	
	for(let i=0; i<config.BLOCK_RAWS; i++){
		for(let j=0; j<config.BLOCK_COLS; j++){
			if(this.field[i][j] && this.field[i][j] != config.WALL){	// ブロックのみ色を変える
				this.field[i][j]=config.GAMEOVER_BLOCK;
			}
		}
	}
	draw(stage);
	console.log("gameover")
}

lineCheck(){//そろったライン数を数える
	let count;
	let lineCount = 0;			// 何ライン揃ったか？
	let score=0;
	let clearLine=0;
	for(let i=1; i<this.BLOCK_RAWS-2; i++){
		count = 0;	// 1ライン上に揃ったブロックの数
		for(let j=0; j<this.BLOCK_COLS; j++){		// 右端からチェック
			if(this.field[i][j]!==config.NON_BLOCK) count++;
			else break;
		}
		if(count >= this.BLOCK_COLS){		// 1ライン揃った！
			lineCount++;
			clearLine++;
			for(let j=1; j<this.BLOCK_COLS-1; j++) this.field[i][j] = config.CLEAR_BLOCK;		// 消去ブロックにする
			
			console.log("lineCount = " + lineCount);
			console.log("clearLine = " + clearLine);

		}
	}
	score+=lineCount;
	if(score!=0)console.log(score);
	return score;		// score
	}

	deleteLine(){//	1列に並んでいるブロックを削除し、その上の段を下へ動かす

		for(let i=this.BLOCK_RAWS-1; i>=1; i--){		// 下のラインから消去する
			for(let j=1; j<this.BLOCK_COLS-1; j++){	// 右端からチェック
				if(this.field[i][j] == config.CLEAR_BLOCK){
					this.field[i][j] = this.field[i-1][j];			// 一段落とす
					for(let above=i-1; above>=1; above--){	// 	そこからまた上を一段ずつおとしていく
						this.field[above][j] = this.field[above-1][j];
					}
					i++;		// 落としたラインもまた、消去ラインだったときの対処
				}
			}
		}
	}
/*

ブロック関連

*/
	effect(){
		let colors = [ config.EFFECT_COLOR1, config.EFFECT_COLOR2 ];
	
		this.g.fillStyle = colors[this.effectState.flipFlop];
		for(let i=0; i<this.BLOCK_RAWS; i++){
			for(let j=0; j<this.BLOCK_COLS; j++){
				if(this.field[i][j] == config.CLEAR_BLOCK){		// 消去ブロックならエフェクト表示
					this.g.fillRect(j*this.bs, i*this.bs, this.bs-1, this.bs-1);
				}
			}
		}

		this.effectState.flipFlop = 1 - this.effectState.flipFlop;	// エフェクト色を交互に切り替え
		
		if(this.effectState.count > config.EFFECT_ANIMATION){
			this.mode = config.GAME;
			this.effectState.count = 0;
			this.effectState.flipFlop = 0;
			this.deleteLine();
			this.CreateMino();
		}
		
		this.effectState.count++;
	}



	hitCheck(){//	既に存在するブロックと重ならないか確認
		for(let i=0; i<4; i++){
			for(let j=0; j<4; j++){
				if(this.field[i+this.mino.y][j+this.mino.x] && this.mino.status[i][j])		return 1;
			}
		}
		return 0;
	}
	

	clearMino(){//持っているミノを盤面から削除
		for(let i=0; i<4; i++){
			for(let j=0; j<4; j++){
				if(this.mino.status[i][j]) this.field[i+this.mino.y][j+this.mino.x] = config.NON_BLOCK;
			}
		}
	}

	DownMino(){
		this.mino.moveDown();
	}
	moveMinoLeft(){
		this.mino.moveLeft();
	}
	moveMinoRight(){
		this.mino.moveRight();
	}
	RotateMinoLeft(){
		this.mino.rotateBlockReverse();
	}
	RotateMinoRight(){
		this.mino.rotateBlock();
	}

	CreateMino(){
		this.mino=new Mino(this.next.nextBlock(),this);
		if(this.hitCheck())return false;
		return true;
	}
	putMino(){//	ミノを配置(固定するわけではない)
		for(let i=0; i<4; i++){
			for(let j=0; j<4; j++){
				if(this.mino.status[i][j])	this.field[i+this.mino.y][j+this.mino.x] = this.mino.status[i][j];
			}
		}	
	}
	lockMino(){
		for(let i=0; i<4; i++){
			for(let j=0; j<4; j++){
				if(this.mino.status[i][j]) this.field[i+this.mino.y][j+this.mino.x] = config.LOCK_BLOCK;
			}
		}	
	}

	setClock(level){
		this.clock=30;
		this.clock-=3*(level-1);
		console.log("setclock="+this.clock);
	}

	move1Frame(){

		//1フレーム毎の操作
		if(this.mode==config.EFFECT){
			this.effect();
			return true;
		}

		if(this.frame>this.clock){//一定時間経過
			this.moveFlag.down=true;//ミノを下げる準備
			this.frame=0;
		}

		//console.log(this.downFlag);
		if(this.moveFlag.right){//右移動
			this.mino.moveRight();
			this.moveFlag.right=false;
		}

		if(this.moveFlag.left){//左移動
			this.mino.moveLeft();
			this.moveFlag.left=false;
		}
		if(this.rotateFlag.right){//右回転
			this.mino.rotateRight();
			this.rotateFlag.right=false;
		}
		if(this.rotateFlag.left){//左回転
			this.mino.rotateLeft();
			this.rotateFlag.left=false;
		}
		
		if(this.moveFlag.down){//下移動
			frame=0;
			if(!this.mino.moveDown()){//ミノを下に下げる
				
				//壁や他のミノとぶつかった場合
				this.lockMino();
				let score=this.lineCheck();
				if(score!=0){
					this.score.addScore(score);
					for(let i=score;this.level.levelNumber<config.MAX_LEVEL&&score>0;i--){
						this.level.levelUp();
					}
					this.mode=config.EFFECT;
					return true;
				}
				
				if(!this.CreateMino()){//新たなミノを作成
					//作れなかった場合
					this.putMino();
					this.gameOver();
					return false;
				}
			}
		}



		this.putMino();//新たな操作ミノの位置を決定
		draw(this);//ここで描画

		//setTimeout(this.move1Frame,1000/this.clock);
		this.moveFlag={down:false,left:false,right:false};//キー入力時のフラグをリセット
		this.rotateFlag={left:false,right:false};//キー入力時のフラグをリセット
		this.frame++;

		return true;
	}
	enterLeftKey(){
		this.moveFlag.left=true;
	}

	enterRightKey(){
		this.moveFlag.right=true;
	}

	enterRotateKey(){
		this.rotateFlag.right=true;
	}

	enterReverseRotateKey(){
		this.rotateFlag.left=true;
	}

	enterDownKey(){
		this.moveFlag.down=true;
	}

}
