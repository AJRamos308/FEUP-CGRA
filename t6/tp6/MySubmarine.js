/**
 * MySubmarine
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function MySubmarine(scene,x,y,z) {
    CGFobject.call(this, scene);

    //variables to change in order to move
    this.x = x;
    this.y = y;
    this.z = z;
    this.speed = 1.00;

    //angle between sub and Z axis
    this.angle = 0;
    this.hAngle = 0;
    this.angInc = Math.PI/30;
    
    this.cylinder = new MyCylinder(this.scene, 26, 20);
    this.cylinderb = new MyCylinderWBases(this.scene, 26);
    this.scircle = new MyLamp(this.scene,26,5);
    this.triangle = new MyTriangle(this.scene);
    this.fin = new MyFin(this.scene);
    this.helix = new MyHelix(this.scene);

};

MySubmarine.prototype = Object.create(CGFobject.prototype);
MySubmarine.prototype.constructor = MySubmarine;

MySubmarine.prototype.display = function () {
    //Main Body
    this.scene.pushMatrix();
        this.scene.translate(0,0,-2.04);
        this.scene.scale(0.73,1,4.08);
        this.cylinderb.display();
    this.scene.popMatrix();
    //Body Ends
    this.scene.pushMatrix();
        this.scene.translate(0,0,-2.04);
        this.scene.translate(0,0,4.08);
        this.scene.scale(0.73,1,0.46);
        this.scene.rotate(Math.PI,0,0,1);
        this.scircle.display();
    this.scene.popMatrix();
    //Body Ends
    this.scene.pushMatrix();
        this.scene.translate(0,0,-2.04);
        this.scene.scale(0.73,1,0.46);
        this.scene.rotate(Math.PI,1,0,0);
        this.scircle.display();
    this.scene.popMatrix();
    //Top
    this.scene.pushMatrix();
        this.scene.rotate(-Math.PI/2,1,0,0);
        this.scene.scale(0.60,0.88,1.57);
        this.cylinderb.display();
    this.scene.popMatrix();
    //Vertical Peeking Tube
    this.scene.pushMatrix();
        this.scene.translate(0,1.57,0.4);
        this.scene.rotate(-Math.PI/2,1,0,0);
        this.scene.scale(0.1,0.1,1);
        this.cylinderb.display();
    this.scene.popMatrix();
    //Horizontal Peeking Tube
    this.scene.pushMatrix();
        this.scene.translate(0,2.57,0.4);
        this.scene.rotate(-Math.PI/2,0,0,0);
        this.scene.scale(0.1,0.1,0.3);
        this.cylinderb.display();
    this.scene.popMatrix();
    //Semi Circle Covering Cylinder connection
    this.scene.pushMatrix();
        this.scene.translate(0,2.57,0.4);
        this.scene.rotate(-3*Math.PI/4,1,0,0);
        this.scene.scale(0.1,0.1,0.1);
        this.scircle.display();
    this.scene.popMatrix();
    //Fins
    this.scene.pushMatrix(); //Right
        this.scene.translate(0.5,-0.1,-2.3);
        this.scene.scale(0.6,1,0.5);
        this.fin.display();
    this.scene.popMatrix();

    this.scene.pushMatrix(); //Left
        this.scene.rotate(Math.PI,0,0,1);
        this.scene.translate(0.5,-0.1,-2.3);
        this.scene.scale(0.6,1,0.5);      
        this.fin.display();
    this.scene.popMatrix();

    this.scene.pushMatrix(); //Top
        this.scene.rotate(Math.PI/2,0,0,1);
        this.scene.translate(0.7,-0.1,-2.3);
        this.scene.scale(0.6,1,0.5);
        this.fin.display();
    this.scene.popMatrix();

    this.scene.pushMatrix(); //Bottom
        this.scene.rotate(3*Math.PI/2,0,0,1);
        this.scene.translate(0.7,-0.1,-2.3);
        this.scene.scale(0.6,1,0.5);      
        this.fin.display();
    this.scene.popMatrix();

    this.scene.pushMatrix(); //Top Right
        this.scene.translate(0.4,1.2,0.25);
        this.scene.scale(0.6,1,0.5);
        this.scene.rotate(Math.PI,1,0,0);
        this.fin.display();
    this.scene.popMatrix();

    this.scene.pushMatrix(); //Top Left
        this.scene.translate(-0.4,1,0.25);
        this.scene.scale(0.6,1,0.5);
        this.scene.rotate(Math.PI,1,0,0);
        this.scene.rotate(Math.PI,0,0,1);
        this.fin.display();
    this.scene.popMatrix();
    //Helix
    this.scene.pushMatrix();
        this.scene.translate(1,-0.5,-2);
        this.scene.scale(0.4,0.4,0.6);
        this.cylinder.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
        this.scene.translate(-1,-0.5,-2);
        this.scene.scale(0.4,0.4,0.6);
        this.cylinder.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
        this.scene.translate(-1,-0.5,-1.8);
        this.scene.scale(0.1,0.1,0.1);
        this.scene.rotate(Math.PI,0,0,1);
        this.scircle.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
        this.scene.translate(1,-0.5,-1.8);
        this.scene.scale(0.1,0.1,0.1);
        this.scene.rotate(Math.PI,0,0,1);
        this.scircle.display();
    this.scene.popMatrix();

    this.helix.display();
};

MySubmarine.prototype.rotateSubLeft = function () {
	this.angle = this.angle + this.speed * (Math.PI / 180);
};

MySubmarine.prototype.rotateSubRight = function () {
	this.angle = this.angle - this.speed * (Math.PI / 180);
};

MySubmarine.prototype.incSpeed = function () {
    if (this.speed < 5)
	    this.speed += 0.1;
};

MySubmarine.prototype.decSpeed = function () {
    if (this.speed > -5)
	    this.speed -= 0.1;
};

MySubmarine.prototype.update=function(diffTime){
    this.hAngle += this.angInc*this.speed;
    this.helix.setAngle(this.hAngle);
    this.x = this.x - this.speed * (Math.sin(-this.angle) / 50);
	this.z = this.z + this.speed * (Math.cos(-this.angle) / 50);    
};