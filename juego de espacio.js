"uses strict";

class Game{
    constructor(canvas){
        this.canvas=canvas;
        this.ctx=canvas.getContent("2d");
        this.err=0;//Error, apis de canvas no copatible.
        if (!ctx){
            this.err=1;
            return;
        }
        
    }
}