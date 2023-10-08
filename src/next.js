class Next{
	constructor(){
		this.nextStr=document.getElementById("nextDebug");
		this.next1=getUniqueArray();
		this.next2=getUniqueArray();
		//this.next1=getDebugArray();
	}

	nextBlock(){
		let number=this.next1[0];//next1の先頭を取り出す
		for(let i=0;i<this.next1.length-1;i++){//1つずつ左へずらす
			this.next1[i]=this.next1[i+1];
		}
		this.next1[this.next1.length-1]=this.next2[0];//next1末尾にnext2先頭を格納
		for(let i=0;i<this.next2.length-1;i++){
			this.next2[i]=this.next2[i+1];
		}
		if(this.next2[0]==this.next2[1]){//すべて取り出したら
			this.next2=getUniqueArray();//next2を更新
		}
		//debugNext();
		//this.printNext_debug()
		this.printNext();
		return number;
	}

	printNext_debug(){
		if(this.nextStr===null)return;
		let str="next:";
		this.next1.forEach(next=>(str+=blockTypeToChar(next)+" "));
		this.nextStr.innerHTML=str;
		this.printNext();
		//console.log(str);
	}



	printNext(){
		this.canvas=document.getElementById("nextCanvas")
		let g = this.canvas.getContext("2d");
		console.log("config.bs:"+config.bs);
		this.canvas.width = config.bs*4;
		this.canvas.height = (config.bs*4)*5;

		g.fillStyle=config.BACK_COLOR;
		g.fillRect(0,0,this.canvas.width,this.canvas.height);
		for(let i=0;i<6;i++){
			let nextNumber=this.next1[i];
			let nextBlock=getMino(nextNumber);//操作ミノの形状を保持
			g.fillStyle="#000000"
			for(let j=0;j<4;j++){
				for(let k=0;k<4;k++){
					if(nextBlock[j][k])g.fillRect(config.bs*k,i*(config.bs*4)+config.bs*j,config.bs-1,config.bs-1)
				}
			}
		}
	}

}

function getUniqueArray(){
	let marking=new Array(0,0,0,0,0,0,0);//			選択済みか否か
	
	let array=new Array(-1,-1,-1,-1,-1,-1,-1);//	ここに情報を格納して値を返す
	
	 //array=new Array(1,1,1,1,1,1,1);return array;
	for(let index=0;index<array.length;index++){
		let num=Math.floor(Math.random()*7);//0~6のうちランダムに1つ表示
		//console.log(num);
		if(marking[num]===0){//	未選択である
			marking[num]=1;//	マーキングする
			array[index]=num;//	データ格納
		}else{
			index--;//			添え字を動かさないようにする
		}
	}
	return array;
}

function getDebugArray(){

	return [1,0,2,3,4,5,6];
}
