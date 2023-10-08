class Timer{
    
    constructor(clock){
        this.clock=clock;
        this.content=document.getElementById("time")
        this.time=90*clock+1;
        this.timeCount()

    }

    timeCount(){
        this.time--;
        this.minute=Math.trunc((this.time/this.clock)/60)
        this.second=Math.trunc(((this.time)/this.clock)%60);
        this.content.innerHTML=this.minute.toString().padStart(2,'0')+":"+this.second.toString().padStart(2,'0');

        if(this.second<0)this.second=0
        
        if(this.minute===0&&this.second===30){
            this.content.style.color="yellow";
            this.showTimeCount(this.second);
        }
        if(this.minute===0&&this.second===0){
            this.content.style.color="red";
            return true;
        }
        else if(this.minute===0&&this.second<=10){
            this.content.style.color="red";
            this.showTimeCount(this.second);
        }
        else if(this.minute===0&&this.second<30) this.content.style.color="yellow"; 
        //else console.log(this.time);
        
        if(this.second>0)return false;

    }
    timeUp(){

        return this.second<=0&&this.minute<=0;
    }
    showTimeUp(){
        let canvas=document.getElementById("canvas");
        let g = canvas.getContext("2d");
        let point=config.bs*2+"pt Arial"
		g.font=point;
		g.lineWidth = 3;
		g.strokeStyle = "#802222";
		g.strokeText("Time Up",config.bs*1.5,config.bs*11,config.bs*9)
    }
    showTimeCount(){
        let canvas=document.getElementById("canvas");
        let g = canvas.getContext("2d");
        let point=config.bs*2+"pt Arial"
		g.font=point;
		g.lineWidth = 3;
        let alfa=(this.time%this.clock)/this.clock;
        let colorRGBA="rgba(96,34,34,"+alfa+")";
        if (this.second>=20)colorRGBA="rgba(255,255,96,"+alfa+")";
		g.strokeStyle = colorRGBA;
        g.font=config.bs*5+"px Arial"
        let xdraw=5
        if(this.second>=10)xdraw-=1.5;
		g.strokeText(this.second,config.bs*xdraw,config.bs*11,config.bs*20)
        
    }
}

