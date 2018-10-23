var canvas = document.querySelector('canvas');
canvas.width=1200;
canvas.height=window.innerHeight;

var ctx = canvas.getContext("2d");

var ball = new Ball(canvas.width/2, canvas.height-32 , 20, 5,5);
var paddale = new Paddale(canvas.width/2 -50 , canvas.height-12 , 100,10);
var brickArray = [];

var aKeyDown = false;
var dKeyDown = false;

var life = 1;

function Ball(x,y,radius,dx,dy,color){
	this.x=x;
	this.y=y;
	this.radius = radius;
	this.dx = dx;
	this.dy	= dy;
	this.color = color;
	
	this.draw = function(){

	ctx.beginPath();
	ctx.arc(this.x, this.y ,this.radius,0,Math.PI * 2, false);
	ctx.fillStyle= "blue";
	ctx.fill();
	ctx.closePath();
}
	
	this.moveball = function(){
		
		if(this.x + this.radius > canvas.width || this.x - this.radius < 0)
		{
		this.dx = -this.dx;
		
		}
		
		if(this.y + this.radius > canvas.height || this.y - this.radius <0)
		{
		 this.dy = -this.dy;
		}
		
		this.x+=this.dx;
		this.y+=this.dy;
		this.draw();
	}
	
	
	
}
	
	
function Paddale(x, y, len, breadth){
	this.x=x;
	this.y=y;
	this.len = len;
	this.breadth = breadth;
	
	this.draw = function (){
		ctx.beginPath();
		ctx.rect(this.x, this.y, this.len, this.breadth);
		ctx.fillStyle = "blue";
		ctx.fill();
		ctx.closePath();
	}
	
	this.update= function(){
		if(aKeyDown){
			if(paddale.x > 0)
			{
				this.x-=5;
			}
		}
		if(dKeyDown){
			if(paddale.x + this.len < canvas.width)
			{
				this.x+=5;
			}
		}
		this.draw();
	}
		
		
}

function Bricks(x, y, len, breadth){
	this.x=x;
	this.y=y;
	this.len = len;
	this.breadth = breadth;
	this.bricklife = true;
	
	this.draw = function (){
		ctx.beginPath();
		ctx.rect(this.x, this.y, this.len, this.breadth);
		ctx.fillStyle = "blue";
		ctx.fill();
		ctx.closePath();
	}
}

function bricksLayer(){
	
	var offset = 100;
		var padding = 50;
		var x=offset;
		var y=  offset;
	for(var i=0;i<3,  i++)
	{
		x=offset;
		
		for(var j=0 ; j< 5 ; j++)
		{
			
			brickArray.push(new Bricks( x , y , 30,30);
			x= x + 30 + padding;
		}
		
		y= y+padding+30;
	}
}
		

		function renderbricksLayer()
		{
			for(var i=0;i <brickArray.length; i++)
			{
				brickArray[i].draw();
			}
		}



document.onkeydown = function(e){
	if(e.keyCode === 65 )
	{
		aKeyDown = true;
	}
	
	if(e.keyCode === 68)
	{
		dKeyDown = true;
	}
	
}

document.onkeyup = function(e){
		if(e.keyCode === 65)
		{
			aKeyDown = false;
		}
		
		if(e.keyCode ===68)
		{
			dKeyDown = false;
		}
		
}


function ball_paddale_Collision()
{
if(ball.x > paddale.x -ball.radius && ball.x < paddale.x + paddale.len + ball.radius && paddale.y-ball.y < ball.radius) 
	ball.dy = -ball.dy;
}

function ball_lowerbound_Collision()
{
	if(canvas.height-ball.radius < ball.y)
	{
		
		if(life)
		{
			resetGame();
			life--;
		}
		
		else
		{
			document.getElementById("demo").innerHTML = "GameOver";
		}
			
	}
}

function resetGame(){
	ball.x= canvas.width/2;
	ball.y= canvas.height-32;
	ball.dx = 3;
	ball.dy	= 3;
	paddale.x = canvas.width/2- paddale.len/2;
	paddale.y = canvas.height - 12;
}
	
	
	

function animate(){
	
	
	requestAnimationFrame(animate);
	if(life){
	ctx.clearRect(0,0,canvas.width,canvas.height);
	ball.moveball();
	paddale.update();
	ball_paddale_Collision();
	ball_lowerbound_Collision();
	bricksLayer();
	}
}

animate();
	
	
	
	

 



	