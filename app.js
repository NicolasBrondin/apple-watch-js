var App = function(){
    
    this.time_interval= 1;
    this.gravity= 1;
    this.gravity_center= {x:250, y:250};
    this.canvas;
    this.context;
    this.children= [];
    
    this.update = function() {
       for(item of this.children) {
            item.update();
        }
        
    }.bind(this);
 
    this.init = function() {
        for(i=0;i<20;i++) {
            var c = new CircleObject({index:1, parent:this, x: Math.random()*500,y:Math.random()*500,radius: 20});
            this.children.push(c);
        }
        setInterval(this.update,this.time_interval);
        
       
    };
};

var CircleObject = function(options){
    
    this.parent = options.parent;
    this.index = options.index;
    this.x = options.x;
    this.y = options.y;
    this.density = options.density || 1;
    //http://www.school-for-champions.com/science/gravity_equations_falling_velocity.htm#.V9z8kSuznNU
    //this.weight = this.radius * density;
    this.radius = options.radius;
    this.element = document.createElement("circle");
    document.body.appendChild(this.element); 
    this.element.style.width = this.radius*2+"px";
    this.element.style.height = this.radius*2+"px";
    
                    
    this.collide = function(c, newX, newY) {
        var collision = {x:false, y:false};
        collision.x = Math.sqrt(Math.pow(c.x-newX,2)) >= (c.radius+this.radius)*2 ? false : true ;
        collision.y = Math.sqrt(Math.pow(c.y-newY,2)) >= (c.radius+this.radius)*2 ? false : true ;
        console.log(collision);
        return collision;
    };
    
    this.update = function() {
        //console.log("circle("+this.index+") old position:"+this.x,this.y);
        var newX = this.x, newY = this.y;
        
        var vector = {x: this.parent.gravity_center.x - this.x, y:this.parent.gravity_center.y - this.y};
        var vector_length = Math.sqrt(Math.pow(200,2) + Math.pow(300,2));
        var vector_normalized = {x: vector.x/vector_length, y:vector.y/vector_length };
        newX = this.x+(vector_normalized.x*this.parent.gravity);
        newY = this.y+(vector_normalized.y*this.parent.gravity);
        
        var collision = false;
        for(c of this.parent.children) {
            if(c != this) {
                collision = this.collide(c, newX, newY);
                if(collision)
                    break;
            } else {
            }
        }
        //console.log("circle("+this.index+") collision:"+collision);
        if(!collision.x) 
            this.x = newX;
        if(!collision.y)
            this.y = newY;
            
        //console.log("circle("+this.index+") new position:"+this.x,this.y);
        this.element.style.left = this.x+"px";
        this.element.style.top = this.y+"px";
        
    };
};

var lol = new App();
lol.init();
/*
console.log(watch.children);*/