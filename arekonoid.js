var canvas = document.querySelector('canvas');
canvas.width=window.innerWidth-250;
canvas.height=window.innerHeight-25;

var ctx = canvas.getContext("2d");

var ball = new Ball(canvas.width/2, canvas.height-32 , 20, 4,5,"blue");
var ball2 = new Ball(canvas.width/2, canvas.height-32 , 20, 7,7,"red");
var paddale = new Paddale(canvas.width/2 -50 , canvas.height-12 , 100,10);
var brickArray = [];
var points =0 ;
var aKeyDown = false;
var dKeyDown = false;

var life = 3;

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
	ctx.fillStyle= this.color;
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
				this.x-=8;
			}
		}
		if(dKeyDown){
			if(paddale.x + this.len < canvas.width)
			{
				this.x+=8;
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

function bricksLayerpositioning(){
	
	var offset = 50;
		var padding = 50;
		var x=offset;
		var y=  offset+ 30;
	for(var i=0;i<3;i++)
	{
		x=offset;
		
		for(var j=0 ; j< 10 ; j++)
		{
			
			brickArray.push(new Bricks( x , y , 100,30));
			x= x + 100 + padding;
		}
		
		y= y+padding;
	}
}
		
bricksLayerpositioning();
function renderbricksLayer(){
	for(var i=0;i <brickArray.length; i++)
	{
		if(brickArray[i].bricklife ===true)
		brickArray[i].draw();
	}
}

function ball_brick_collision (){
	for(var i=0 ;i < brickArray.length; i++)
	{
		if(brickArray[i].bricklife ===true)
		{
			if(brickArray[i].x - ball.x < ball.radius && ball.x -(brickArray[i].x + brickArray[i].len) < ball.radius &&
					ball.y - (brickArray[i].y + brickArray[i].len) <ball.radius && ball.y - brickArray[i].y <ball.radius)
					{
						Lifeincrease(i);
						pointBonus(i);
						paddalebonusincrease(i);
						ballbonusfeature(i);
						brickArray[i].bricklife= false;
						ball.dy = -ball.dy;
						points = points + 10;
					
					}
					
			if(points === 320)
			{
				ctx.font="100px Comic Sans MS";
				ctx.fillStyle = "red";
				ctx.textAlign = "center";
				ctx.fillText("You Win!" , canvas.width/2 , canvas.height/2);
			}
		}
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
		life--;
		
		if(life)
		{
			resetGame();
			
		}
		
		else{
			console.log("Game Over");
			ctx.font="100px Comic Sans MS";
			ctx.fillStyle = "red";
			ctx.textAlign = "center";
			ctx.fillText("Game Over" , canvas.width/2 , canvas.height/2);
		}
		
			
	}
}

function msg(){
	ctx.font="45px Comic Sans MS";
	ctx.fillStyle = "red";
	ctx.textAlign = "center";
	ctx.fillText("Score : " , 100 , 60);
	ctx.fillText(points , 220,60);
	ctx.fillText("Life :" , canvas.width-200, 60);
	ctx.fillText(life , canvas.width-125, 60);

}
	

function resetGame(){
	ball.x= canvas.width/2;
	ball.y= canvas.height-32;

	paddale.x = canvas.width/2- paddale.len/2;
	paddale.y = canvas.height - 12;
}

//Bonus Features

 function randomIndex()
 {
	return Math.floor(Math.random() * brickArray.length);
	
}

//Increae Life
var lifeBonusbrickIndex = randomIndex();
function Lifeincrease(i)
{

	if (i === lifeBonusbrickIndex && life < 3)
	{
		
		life++;
	}
}
var pointBonusindex = randomIndex();
function pointBonus(i){
	
	if(i=== pointBonusindex )
	{
		points+=20;
	}
}

var paddalelengthindex = randomIndex();
var count =3;
function paddalebonusincrease(i)
{
	console.log("index");
	console.log(paddalelengthindex);
	
	if(i === paddalelengthindex )
	{
		paddale.len = (paddale.len)*2;
		console.log(paddale.len);
		count--;
		
	}

	if(count<3 && count>0)
	{
		count--;
	}
	else if(count===0)
	{
		count--;
		paddale.len = paddale.len/2;
	}
}

var ballbonusindex= randomIndex();
var ballbonusfeatureOn = false;

function ballbonusfeature(i){
	if(i=== ballbonusindex)
	{
		ballbonusfeatureOn =true;
	}
	
	
}
	
	
function animate(){
	
	requestAnimationFrame(animate);
	if(life && points < 320){
		
	ctx.clearRect(0,0,canvas.width,canvas.height);
	ball.moveball();
	if (ballbonusfeatureOn === true)
	{
		ball2.moveball();
	}
	paddale.update();
	ball_lowerbound_Collision();
	ball_paddale_Collision();
	renderbricksLayer();
	ball_brick_collision();
	msg();
	
	
	}
}

animate();
	
	
	
	

 



	