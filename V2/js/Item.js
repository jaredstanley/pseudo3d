function Item(pos){
	this.pos = pos;	
	this.x = 0;
	this.y = 0;
	this.radians = 0;
	this.degrees = 0;
	this.scale=1;
	this.distFromMouse = 0;
}

Item.prototype.move = function(){
	this.x++;
}