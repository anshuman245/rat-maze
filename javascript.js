var canvas;
var ctx;
var WIDTH=1000;
var HEIGHT=500;
tileH=45;
tileW=45;
//input
titleRC=5;
titleCC=4;

boundx=0;
boundy=0;
var output;
var tiles=[];//matrix
for(c=0;c<titleCC;c++){
    tiles[c]=[];
    for(r=0;r<titleRC;r++){
        tiles[c][r]={x: c*(tileW+3), y: r*(tileH+3), state:'e'};
    
    }
}
tiles[0][0].state='s';
tiles[titleCC-1][titleRC-1].state='f';

function rect(x,y,w,h,state){//colour in box 
    if(state=='s'){
        ctx.fillStyle='#228B22';//starting green
    }
    else if(state=='f'){
        ctx.fillStyle='#ff0000'; //red ending
    }
    else if(state=='e'){
        ctx.fillStyle='#FFFF00';
    }
    else if(state=='w'){
        ctx.fillStyle='#000000'; //black wall block
    }
    else if(state=='x'){
        ctx.fillStyle='#00ff00'; //green soln
    }
    else{
        ctx.fillStyle='#ff8000';//visited node 
    }
    ctx.beginPath();
    ctx.rect(x,y,w,h);
    ctx.closePath();
    ctx.fill();
}


function clear(){
ctx.clearRect(0,0,WIDTH,HEIGHT);
}


function draw(){
    clear();
    
    
    for(c=0;c<titleCC;c++){
        for(r=0;r<titleRC;r++){
            rect(tiles[c][r].x,tiles[c][r].y, tileW, tileH, tiles[c][r].state);
        }
    }
}

function solveMaze(){//solution for path
    var xqueue=[0];//start 0.0
    var yqueue=[0]; 
    var pathFound=false;

    var xloc;
    var yloc;

    while(xqueue.length > 0 && !pathFound){
        xloc=xqueue.shift();
        yloc=yqueue.shift();

        if(xloc>0){
            if(tiles[xloc-1][yloc].state=='f'){
                pathFound=true;
            }
        }

        if(xloc<titleCC-1){
            if(tiles[xloc+1][yloc].state=='f'){
                pathFound=true;
            }
        }

        if(yloc>0){
            if(tiles[xloc][yloc-1].state=='f'){
                pathFound=true;
            }
        }
        if(yloc<titleRC-1){
            if(tiles[xloc][yloc+1].state=='f'){
                pathFound=true;
            }
        }
//////
        if(xloc>0){
            if(tiles[xloc-1][yloc].state=='e'){
                xqueue.push(xloc-1);
                yqueue.push(yloc);
                tiles[xloc-1][yloc].state=tiles[xloc][yloc].state+'l';
            }
        }
        if(xloc<titleCC-1){
            if(tiles[xloc+1][yloc].state=='e'){
                xqueue.push(xloc+1);
                yqueue.push(yloc);
                tiles[xloc+1][yloc].state=tiles[xloc][yloc].state+'r';
            }
        }
        if(yloc>0){
            if(tiles[xloc][yloc-1].state=='e'){
                xqueue.push(xloc-1);
                yqueue.push(yloc);
                tiles[xloc][yloc-1].state=tiles[xloc][yloc].state+'u';
            }
        }
        if(yloc<titleRC-1){
            if(tiles[xloc][yloc+1].state=='e'){
                xqueue.push(xloc);
                yqueue.push(yloc+1);
                tiles[xloc][yloc+1].state=tiles[xloc][yloc].state+'d';
            }
        }
         
    }

    if(!pathFound){
        output.innerHTML='Cant reach destination';
    }
    else{
        output.innerHTML='Solution Path Exist';
        var path=tiles[xloc][yloc].state;
        var pathLength=path.length;
        var currx=0;
        var curry=0;
           for(var i=0;i<pathLength-1;i++){
              if(path.charAt(i+1)=='u'){
                   curry-=1;
              }
              if(path.charAt(i+1)=='d'){
                curry+=1;
              }
              if(path.charAt(i+1)=='r'){
                currx+=1;
              }
             if(path.charAt(i+1)=='l'){
                currx-=1;
              }
              tiles[currx][curry].state='x';

           }
    }
    
}


function reset(){//reset function
    for(c=0;c<titleCC;c++){
        tiles[c]=[];
        for(r=0;r<titleRC;r++){
            tiles[c][r]={x: c*(tileW+3), y: r*(tileH+3), state:'e'};
        
        }
    }
    tiles[0][0].state='s';
    tiles[titleCC-1][titleRC-1].state='f';

    output.innerHTML='';//save output
}

function init(){
    canvas=document.getElementById("myCanvas");
    ctx=canvas.getContext("2d");
    output=document.getElementById("outcome");
   return setInterval(draw,10);
}

function myMove(e){//mouse
    x=e.pageX-canvas.offsetLeft;
    y=e.pageY-canvas.offsetTop;
    for(c=0;c<titleCC;c++){
     for(r=0;r<titleRC;r++){
        if(c*(tileW+3) < x && x < c*(tileW+3)+tileW && r*(tileH+3) < y && y < r*(tileH+3)+tileH){
            if(tiles[c][r].state=='e' && (c!=boundx || r!=boundy)){
                tiles[c][r].state='w';
                boundx=c;
                boundy=r;
            }
            else if(tiles[c][r].state=='w'){
                tiles[c][r].state='e';
                boundx=c;
                boundy=r;
            }
        }
     }
   }
}
function myDown(e){//mouse
    canvas.onmousemove=myMove;
    x=e.pageX-canvas.offsetLeft;
    y=e.pageY-canvas.offsetTop;
    for(c=0;c<titleCC;c++){
     for(r=0;r<titleRC;r++){
        if(c*(tileW+3) < x && x < c*(tileW+3)+tileW && r*(tileH+3) < y && y < r*(tileH+3)+tileH){
            if(tiles[c][r].state=='e'){
                tiles[c][r].state='w';
                boundx=c;
                boundy=r;
            }
            else if(tiles[c][r].state=='w'){
                tiles[c][r].state='e';
                boundx=c;
                boundy=r;
            }
        }
     }
   }
}
function myUp(){
    canvas.onmousemove=null;
}
init()
canvas.onmousedown=myDown;
canvas.onmouseup=myUp;
