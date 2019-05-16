class MyTriangle extends CGFobject {
  constructor(scene) {
    super(scene);
    this.initBuffers();
  }
  initBuffers() {

    this.vertices = [
      -1, 1, 0, //0
      1, -1, 0, //1
      -1, -1, 0 //2
    ];

    this.indices = [
      2, 1, 0,
      0, 1, 2
    ];

    this.normals = [
			0, 0, 1,
			0, 0, 1,
			0, 0, 1,
		];

    this.texCoords = [
			0, 1,
			1, 1,
			0, 0,
			1, 0
    ]
    
    this.primitiveType = this.scene.gl.TRIANGLES;
    this.initGLBuffers();
  }
}