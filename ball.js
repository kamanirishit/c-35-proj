class Ball{
    constructor(){
      this.x=18;
     this.y=200;
     this.width=20;
     this.height=20;
    }
    display(){
      push();
      noFill();
      noStroke();
      rect(this.x,this.y,this.width,this.height);
      pop();
    }
    move(){
      this.x=this.x-1;
    }
    }