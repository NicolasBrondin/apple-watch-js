var App = function(){
    
    this.time_interval= 10;
    this.gravity= 5;
    this.gravity_center= {x:250, y:250};
    this.canvas;
    this.context;
    this.children= [];
    
    this.update = function() {
        this.context.clearRect(0,0,500,500);
       for(item of this.children) {
            item.update();
           //console.log(item);
        }
        
    }.bind(this);
 
    this.init = function() {
        this.canvas = document.getElementById("universe");
        this.context = this.canvas.getContext('2d');
        this.children.push(new CircleObject({index:1, parent: this, x:25, y:25, radius:25}));
        this.children.push(new CircleObject({index:2,parent: this, x:400, y:400, radius:25}));
        this.children.push(new CircleObject({index:3,parent: this, x:200, y:400, radius:25}));
        this.children.push(new CircleObject({index:4,parent: this, x:400, y:40, radius:25}));
        this.children.push(new CircleObject({index:5,parent: this, x:40, y:400, radius:25}));
        setInterval(this.update,this.time_interval);
        
       
    };
};

      
      
      
      


var CircleObject = function(options){
    
    this.parent = options.parent;
    this.index = options.index;
    this.x = options.x;
    this.y = options.y;
    this.radius = options.radius;
    this.element = "<circle>"+this.index+"</circle>";
    
                    
    this.collide = function(c, newX, newY) {
        var distance = Math.sqrt(Math.pow(c.x-newX,2)+Math.pow(c.y-newY,2));
        console.log("circle("+this.index+") distance:"+distance);
        if(distance<=(c.radius+this.radius))
            return true;
        else
            return false;
    };
    
    this.update = function() {
        console.log("circle("+this.index+") old position:"+this.x,this.y);
        var newX = this.x, newY = this.y;
        if(this.x<this.parent.gravity_center.x) {
            newX = this.x + this.parent.gravity;
        } else if(this.x>this.parent.gravity_center.x) {
            newX = this.x - this.parent.gravity;
        }
        //y
        if(this.y<this.parent.gravity_center.y) {
            newY = this.y + this.parent.gravity;
        } else if(this.y>this.parent.gravity_center.y) {
            newY = this.y - this.parent.gravity;
        }
        
        var collision = false;
        for(c of this.parent.children) {
            if(c != this) {
                collision = this.collide(c, newX, newY);
                if(collision)
                    break;
            } else {
            }
        }
        console.log("circle("+this.index+") collision:"+collision);
        if(!collision) {
            this.x = newX;
            this.y = newY;
        }
        console.log("circle("+this.index+") new position:"+this.x,this.y);
        
        this.parent.context.beginPath();
        this.parent.context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
        this.parent.context.fillStyle = 'green';
        this.parent.context.fill();
        
    };
};

var lol = new App();
lol.init();
/*
console.log(watch.children);*/