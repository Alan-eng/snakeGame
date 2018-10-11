$(document).ready(function() {
	let canvas = $("#canvas")[0];
	let ctx = canvas.getContext("2d");
	let w = $("#canvas").width();
	let h = $("#canvas").height();
 
	let cw = 10;
	let d;
	let food;
	let score;
 
	let snake_array; 
 
	function init()	{
		d = "right";
		create_snake();
		create_food();
		score = 0;
 
		if (typeof game_loop != "undefined") clearInterval(game_loop);
		game_loop = setInterval(paint, 60);
	}
	init();
 
	function create_snake()	{
		let length = 4;
		snake_array = []; 
		for(let i = length-1; i>=0; i--) {
			snake_array.push({x: i, y:20});
		}
	}
 
	function create_food() {
		food = {
			x: Math.round(Math.random()*(w-cw)/cw), 
			y: Math.round(Math.random()*(h-cw)/cw), 
		};
	}
 
	function paint() {
		ctx.fillStyle = "white";
		ctx.fillRect(0, 0, w, h);
		ctx.strokeStyle = "black";
		ctx.strokeRect(0, 0, w, h);
 
		let nx = snake_array[0].x;
		let ny = snake_array[0].y;
 
		if(d == "right") nx++;
		else if(d == "left") nx--;
		else if(d == "up") ny--;
		else if(d == "down") ny++;
 
		if(nx == -1 || nx == w/cw || ny == -1 || ny == h/cw || check_collision(nx, ny, snake_array)) {
			init();
			return;
		}
 
		if (nx == food.x && ny == food.y) {
			let tail = {x: nx, y: ny};
			score++;
			create_food();
		} else {
			tail = snake_array.pop();
			tail.x = nx; tail.y = ny;
		}
 
		snake_array.unshift(tail); 
 
		for(let i = 0; i < snake_array.length; i++) {
			let c = snake_array[i];
 
			paint_cell(c.x, c.y);
		}
 
		paint_cell(food.x, food.y);
		let score_text = "Счет: " + score;
		ctx.fillText(score_text, 5, h-5);
	}
 
	function paint_cell(x, y) {
		ctx.fillStyle = "#29A5FF";
		ctx.fillRect(x*cw, y*cw, cw, cw);
		ctx.strokeStyle = "white";
		ctx.strokeRect(x*cw, y*cw, cw, cw);
	}
 
	function check_collision(x, y, array) {
		for (let i = 0; i < array.length; i++) {
			if (array[i].x == x && array[i].y == y)
			 return true;
		}
		return false;
	}
 
	$(document).keydown(function(e){
		let key = e.which;
 
		if(key == "37" && d != "right") d = "left";
		else if(key == "38" && d != "down") d = "up";
		else if(key == "39" && d != "left") d = "right";
		else if(key == "40" && d != "up") d = "down";
	})
 
})