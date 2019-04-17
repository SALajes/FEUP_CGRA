/**
* MyScene
* @constructor
*/
class MyScene extends CGFscene {
    constructor() {
        super();
    }
    init(application) {
        super.init(application);
        this.initCameras();
        this.initLights();
        this.initMaterials();

        //Background color
        this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

        this.gl.clearDepth(100.0);
        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.enable(this.gl.CULL_FACE);
        this.gl.depthFunc(this.gl.LEQUAL);
        this.enableTextures(true);

        //Initialize scene objects
        this.axis = new CGFaxis(this);
        this.treeGroup1 = new MyTreeGroupPatch(this);
        this.treeGroup2 = new MyTreeGroupPatch(this);
        this.treeRow1 = new MyTreeRowPatch(this);
        this.treeRow2 = new MyTreeRowPatch(this);
        this.house = new MyHouse(this);
        this.panel = new MySolarPanel(this);
        this.hill5 = new MyVoxelHill(this, 5);
        this.hill7 = new MyVoxelHill(this, 7);
        this.hill10 = new MyVoxelHill(this, 10);
        this.map = new MyCubeMap(this);
        this.floor = new MyFloor(this);

        //Objects connected to MyInterface
        this.displayAxis = true;
        this.displayNormals = false;
        this.displayPrism = true;
        this.displayCyl = false;
        this.objectComplexity = 0.5;
        this.scaleFactor = 2.0;
    }
    initLights() {
        this.lights[0].setPosition(15, 2, 5, 1);
        this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.lights[0].enable();
        this.lights[0].update();
    }
    initCameras() {
        this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(15, 15, 15), vec3.fromValues(0, 0, 0));
    }
    initMaterials() {
        this.bottomTex = new CGFappearance(this);
        this.bottomTex.setAmbient(0.1, 0.1, 0.1, 1.0);
        this.bottomTex.setDiffuse(0.7, 0.7, 0.7, 1.0);
        this.bottomTex.setSpecular(0.5, 0.5, 0.5, 1.0);
        this.bottomTex.setShininess(1.0);
        this.bottomTex.loadTexture('textures/tree_trunk.png');
        this.bottomTex.setTextureWrap('REPEAT', 'REPEAT');
    }
    setDefaultAppearance() {
        this.setAmbient(0.2, 0.4, 0.8, 1.0);
        this.setDiffuse(0.2, 0.4, 0.8, 1.0);
        this.setSpecular(0.2, 0.4, 0.8, 1.0);
        this.setShininess(10.0);
    }
    updateObjectComplexity() {
        this.prism.updateBuffers(this.objectComplexity);
        // this.cylinder.updateBuffers(this.objectComplexity);
        // this.pyramid.updateBuffers(this.objectComplexity);
        // this.tree.updateBuffers(this.objectComplexity);
    }
    display() {
        // ---- BEGIN Background, camera and axis setup
        // Clear image and depth buffer everytime we update the scene
        this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
        // Initialize Model-View matrix as identity (no transformation
        this.updateProjectionMatrix();
        this.loadIdentity();
        // Apply transformations corresponding to the camera position relative to the origin
        this.applyViewMatrix();

        // Draw axis
        if(this.displayAxis)
            this.axis.display();
        
        //Apply default appearance
        this.setDefaultAppearance();

        this.pushMatrix();
        this.scale(this.scaleFactor, this.scaleFactor, this.scaleFactor);
        
        // ---- BEGIN Primitive drawing section

        this.pushMatrix();
        this.scale(3,3,3);
        this.house.display();
        this.popMatrix();

        this.pushMatrix();
        this.translate(-10,0,-25);
        this.treeRow2.display();
        this.popMatrix();

        this.pushMatrix();
        this.translate(-5,0,-15);
        this.treeRow1.display();
        this.popMatrix();

        this.pushMatrix();
        this.translate(-10,0,20);
        this.treeGroup2.display();
        this.popMatrix();

        this.pushMatrix();
        this.translate(-10,0,15);
        this.treeGroup1.display();
        this.popMatrix();

        this.pushMatrix();
        this.translate(20,0,10);
        this.scale(2,1,2);
        this.hill5.display();
        this.popMatrix();

        this.pushMatrix();
        this.translate(10,0,15);
        this.scale(1, 2, 1);
        this.hill7.display();
        this.popMatrix();

        this.pushMatrix();
        this.translate(20,0,20);
        this.scale(1.5, 1.5, 1.5);
        this.hill10.display();
        this.popMatrix();

        this.floor.display();

        this.map.display();
        
        // ---- END Primitive drawing section
    }
}