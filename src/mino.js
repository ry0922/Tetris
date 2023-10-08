class Mino{
	//status;
	//x;
	//y;
	//blockNumber
	//spinNumber
	constructor(number,stage){
		this.x=Math.floor(config.BLOCK_COLS/3);//操作ミノのx座標を登録
		this.y=0;//操作ミノのy座標を登録
		this.blockNumber=number;//操作ミノの種類を保持
		this.status=getMino(this.blockNumber);//操作ミノの形状を保持
		this.stage=stage;//自身がを持つステージ情報を持つ//もうちょっとよくできそう
		this.rotateFlag=false;
		this.spinNumber=0;//superRotation実装時に使用
	}
	

	
	moveDown(){
			this.nowDown=true;
			this.stage.clearMino();
			let sy=this.y;
			this.y++;
			if(this.stage.hitCheck()){
				//console.log("hit");
				this.y = sy;
				this.stage.putMino();
				return false;
			}
			//console.log("down");
			this.nowDown=false;	
			return true;
	}
	moveLeft(){
			this.stage.clearMino();
			let sx=this.x;
			this.x--;
			if(this.stage.hitCheck()){
				this.x = sx;
				this.stage.putMino();
				return false;
			}
			//console.log("left");
			this.stage.putMino();
			return true;
	}
	moveRight(){
			this.stage.clearMino();
			let sx=this.x;
			this.x++;
			if(this.stage.hitCheck()){
				this.x = sx;
				this.stage.putMino();
				return false;
			}
			//console.log("right");
			this.stage.putMino();

			return true;
	}

	rotateRight(){
		if(this.rotateFlag)return;
		this.rotateFlag=true;
		this.stage.clearMino();
		// 回転ブロック退避の配列
		let tBlock = [	
					[0,0,0,0],
					[0,0,0,0],
					[0,0,0,0],
					[0,0,0,0]
					];
		// ブロックを退避
		for(let i=0; i<4; i++){
			for(let j=0; j<4; j++){
				tBlock[i][j] = this.status[i][j];
			}
		}
		//console.log(tBlock);
				// ブロックを回転
		if(blockTypeToChar(this.blockNumber)===("O"))return;//Oミノの場合
		if(blockTypeToChar(this.blockNumber)===("I")){//Iミノの場合
			for(let i=0; i<4; i++){
				for(let j=0; j<4; j++){
					this.status[i][j] = tBlock[3-j][i];
				}
			}
		}else{//それ以外のミノの場合
			for(let i=0; i<3; i++){
				for(let j=0; j<3; j++){
					this.status[i][j] = tBlock[2-j][i];
				}
			}
		}

		//console.log(this.status);
		if(this.stage.hitCheck(this)){//重なった場合
			// 元に戻す
			for(let i=0; i<4; i++){
				for(let j=0; j<4; j++){
					this.status[i][j] = tBlock[i][j];
				}
			}
		}
		this.stage.putMino();
		this.rotateFlag=false;
		return;
	}

	
	rotateLeft(){
		if(this.rotateFlag)return;
		this.rotateFlag=true;
		this.stage.clearMino();
		// 回転ブロック退避の配列
		let tBlock = [	
					[0,0,0,0],
					[0,0,0,0],
					[0,0,0,0],
					[0,0,0,0]
				];
		// ブロックを退避
		for(let i=0; i<4; i++){
			for(let j=0; j<4; j++){
				tBlock[i][j] = this.status[i][j];
			}
		}
		//console.log(tBlock);
		// ブロックを回転
		if(blockTypeToChar(this.blockNumber)===("O")||blockTypeToChar(this.blockNumber)===("I")){
			//OミノかIミノの場合
			for(let i=0; i<4; i++){
				for(let j=0; j<4; j++){
					this.status[i][j] = tBlock[j][3-i];
				}
			}
		}else{
			//それ以外の場合
			for(let i=0; i<3; i++){
				for(let j=0; j<3; j++){
					this.status[i][j] = tBlock[j][2-i];
				}
			}
		}
		
		this.spinNumber=(this.spinNumber-1)%4;

		if(this.stage.hitCheck(this)){//重なった場合
			
				// 元に戻す
				for(let i=0; i<4; i++){
					for(let j=0; j<4; j++){
						this.status[i][j] = tBlock[i][j];
					}
				}
				this.spinNumber=(this.spinNumber+1)%4;
		}
		this.stage.putMino();
		this.rotateFlag=false;
		return;
	}



	/*未実装 */
	#SuperRotation_Reverse(){
		//return false;//debug

		switch(this.spinNumber){
			case 0:
				this.x++;
				if(this.stage.hitCheck(this)){
					return true;
				}

				this.y++;

				if(this.stage.hitCheck(this)){
					return true;
				}

				this.x--;this.y--;//いったん元に戻す
				this.y=this.y-2;

				if(this.stage.hitCheck(this)){
					return true;
				}

				this.x++;
				if(this.stage.hitCheck(this)){
					return true;
				}

				//元に戻す処理
				this.x--;
				this.y++;this.y++;				
				return false;//superRotation失敗
				
				
				
			
			case 1:

				break;

			case 2:

				break;
			
			case 3:

				break;
		}
		return false;//ここに来たら失敗
	}
	
	#superRotation(){

	}
	/*未実装ここまで */
}
