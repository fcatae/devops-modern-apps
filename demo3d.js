var cameraPos = new BABYLON.Vector3(0,0,0);
var lightPos = new BABYLON.Vector3(1,-1,1);

var engine = new BABYLON.Engine(canvas, true);
var scene = new BABYLON.Scene(engine);

var camera = new BABYLON.ArcRotateCamera("camera", 0, 0, 4, cameraPos, scene);
var light  = new BABYLON.DirectionalLight("light", lightPos, scene);

var sphere = BABYLON.Mesh.CreateSphere("sphere", 16	, 2, scene);

sphere.material = new BABYLON.StandardMaterial("mat", scene);
sphere.material.diffuseTexture = new BABYLON.Texture("wood.jpg", scene);
sphere.material.bumpTexture = new BABYLON.Texture("bump.jpg", scene);
	
engine.runRenderLoop(function() {
	scene.render();
});

camera.attachControl(canvas);
