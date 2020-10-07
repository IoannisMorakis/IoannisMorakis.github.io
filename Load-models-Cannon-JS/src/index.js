//Dependencies Webpack  and threeJS, npm install webpack webpack-cli, npm install threeJS
// npm run-script build to compile, work on this file.
// dont change package.json


//Llamada de la librerias
const THREE = require('three');
//const CANNON = require('cannon');
// CommonJS:
const dat = require('dat.gui');
const Stats = require('stats.js');

//controles orbitales
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
//Model loaders
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';
//Basis Texture loader
import { BasisTextureLoader } from 'three/examples/jsm/loaders/BasisTextureLoader.js';

import * as CANNON from 'three/examples/js/libs/cannon.js';
import { threeToCannon } from '../threetocannon.js';

import CameraControls from 'camera-controls';


// CameraControls.install( { THREE: THREE } );
const canvas = document.getElementById('canvas');
const clock = new THREE.Clock();
 // Optional: Pre-fetch Draco WASM/JS module.
// dracoLoader.preload();
//Scene and render
var renderer, scene, bgScene, camera, cameraControls;
var GLTF_Objects=[];
//var bgMesh;

var world;
var dt = 1 / 60;
var meshes=[], bodies=[];

var boolCannon= false;


var controls;
var mixer, mixer2,mixerCap;
//Lights
var spotLight, light, hemisLight;
var spotLightHelper;

//Interface
var gui;
var obj;
var stats;

function init() 
{
	
	//DAT GUI
	gui = new dat.gui.GUI();
	obj = {
		explode: function () {
		alert('Bang!');
		},
	
		//spotlight
		posX: -25, 
		posY: 8, 
		posZ: 7,
		colorL: "#ffffff", // RGB array
		penunmbra: 0.2,
		helpSpot:true,
		intSpot:1,
		
		intAmbien:1,
		color0: "#443333", 
		intHemis:1,
		colorg: "#111122", 
		bCannon: boolCannon
	};
	
	renderer = new THREE.WebGLRenderer({ canvas });
	scene = new THREE.Scene();
    // scene.fog = new THREE.Fog( 0x443333, 1, 4 );

	const fov = 35;
	const aspect =  window.innerWidth/ window.innerHeight;  // the canvas default
	const near = 0.1;
	const far = 500;
	camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
	
	//Lights
	// spotLight = new THREE.SpotLight( 0xffff00 );
	light = new THREE.AmbientLight( obj.color0 ); // soft white light
	hemisLight = new THREE.HemisphereLight( obj.color0, obj.colorg, 1 );


            

	

	stats = new Stats();
}

function addLights() 
{
	
	//Hemisphere light
	scene.add( hemisLight );
	spotLight = new THREE.SpotLight();
    spotLight.angle = Math.PI / 16;
    spotLight.penumbra = 0.5;
    spotLight.castShadow = true;
    spotLight.position.set( obj.posX, obj.posY, obj.posZ );
	scene.add( spotLight );
	spotLightHelper = new THREE.SpotLightHelper( spotLight );
	scene.add( spotLightHelper );
	
}

function addGUI() 
{
	stats.showPanel( 0 ); // 0: fps, 1: ms, 2: mb, 3+: custom
	document.body.appendChild( stats.dom );

	var guiSL = gui.addFolder('SpotLight');
	guiSL.add(obj, 'helpSpot').onChange(function (val) {
		spotLightHelper.visible = val;
	});
	guiSL.add(obj, 'posX').onChange(function (val) {
		spotLight.position.x = val;
		spotLightHelper.update();
	});
	guiSL.add(obj, 'posY').onChange(function (val) {
		spotLight.position.y = val;
		spotLightHelper.update();

	});
	guiSL.add(obj, 'posZ').onChange(function (val) {
		spotLight.position.z = val;
		spotLightHelper.update();

	});
	//Ambient Light
	var guiAL = gui.addFolder('AmbientLight');
	guiAL.addColor(obj, 'color0').onChange(function (val) {
		light.color.set(val);
		hemisLight.color.set(val);
	});
	guiAL.add(obj, 'intAmbien').min(0).max(1).step(0.1).onChange(function (val) {
		light.intensity = val;
	}).name('Intensity');

	//Hemisphere Light
	var guiHL = gui.addFolder('HemisphereLight');
	guiHL.addColor(obj, 'colorg').onChange(function (val) {
		hemisLight.groundColor.set(val);
	});
	guiHL.add(obj, 'intHemis').min(0).max(1).step(0.1).onChange(function (val) {
		hemisLight.intensity = val;
	}).name('Intensity');

	var guiC = gui.addFolder('Cannon');
	guiC.add(obj, 'bCannon').onChange(function (val) {
		boolCannon= val;
	});
	
}

function main() {

	
	//Renderer
	renderer.setClearColor(0x222222);
	renderer.autoClearColor = false;
    renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.outputEncoding = THREE.sRGBEncoding;
	renderer.gammaOutput = true;
    renderer.gammaFactor = 2.2;
    renderer.shadowMap.enabled = true;
	renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap
	
	//Camera
	camera.position.x = 14;
	camera.position.y = 2;
	camera.position.z = 6;
	camera.lookAt( 0, 0.1, 0 );
    controls = new OrbitControls( camera, renderer.domElement );

	addLights();

	var plane = new THREE.Mesh(
        new THREE.PlaneBufferGeometry( 80, 80 ),
		new THREE.MeshPhongMaterial( { color: 0x999999, specular: 0x101010 } )
		);
    plane.rotation.x = - Math.PI / 2;
    plane.receiveShadow = true;
	scene.add( plane );


	//Cube
	var cubeGeo = new THREE.BoxGeometry( 1, 1, 1, 10, 10 );
    var cubeMaterial = new THREE.MeshPhongMaterial( { color: 0x00FF00 } );
    var cubeMesh = new THREE.Mesh(cubeGeo, cubeMaterial);
	cubeMesh.castShadow = true;
	cubeMesh.position.set(0,6,0);;
	
	meshes.push(cubeMesh);
    scene.add(cubeMesh);





	//Models
	// loadDraco('model/draco/alocasia_s.drc');
	// loadGLTF('model/glb/Flamingo.glb', [-2, 2, 1], [0.01, 0.01, 0.01]);
	
	loadGLTF('model/gltf/Duck.gltf', [3,2.25,0], [1, 1, 1]);  //[5, 0, 0]

	loadGLTF('model/gltf/capoeira/Capoeira.gltf', [0, 0, 0], [0.01, 0.01, 0.01]).then(function(gltf){
		
		//[1, 0, 0]
		//console.log('termine gltf!');
		mixerCap = new THREE.AnimationMixer( gltf.scene );
		var action = mixerCap.clipAction( gltf.animations[ 0 ] );
		action.play();
		
	}).catch(function (err) {
		console.log(err);
		
	});

	
	
	loadGLTF('model/gltf/Holanda/Holanda.gltf', [0, 5, -10], [0.1, 0.1, 0.1]).then(function(gltf){
		//'model/gltf/capoeira/Capoeira.gltf
		//[1, 0, 0]
		//console.log('termine gltf!');
		mixerCap = new THREE.AnimationMixer( gltf.scene );
		var action = mixerCap.clipAction( gltf.animations[ 0 ] );
		action.play();
		
	}).catch(function (err) {
		console.log(err);
		
	});
	

	//

	loadGLTF('model/gltf/Portugal/ScenePortugal.gltf', [0, 3, -5], [0.01, 0.01, 0.01]).then(function(gltf){
		//'model/gltf/capoeira/Capoeira.gltf
		//[1, 0, 0]
		//console.log('termine gltf!');
		mixerCap = new THREE.AnimationMixer( gltf.scene );
		var action = mixerCap.clipAction( gltf.animations[ 0 ] );
		action.play();
		
	}).catch(function (err) {
		console.log(err);
		
	});

	/*
	loadGLTF('model/gltf/basis/AgiHqSmall.gltf', [5, 10, -5], [0.1, 0.1, 0.1]).then(function(gltf){
		//'model/gltf/capoeira/Capoeira.gltf
		//[1, 0, 0]
		//console.log('termine gltf!');
		mixerCap = new THREE.AnimationMixer( gltf.scene );
		var action = mixerCap.clipAction( gltf.animations[ 0 ] );
		action.play();
		
	}).catch(function (err) {
		console.log(err);
		
	});
	*/



	/*loadFBX('model/fbx/avatar1.fbx', [2, 0, -1], [0.01, 0.01, 0.01]).then(function(obj1){
		// console.log('termine!');
		mixer = new THREE.AnimationMixer( obj1 );
		var action = mixer.clipAction( obj1.animations[ 0 ] );
		action.play();
		
	});*/



	
	
    
	addGUI();
}

function loadFBX(path,pos,scale) {
	const promise = new Promise(function (resolve, reject) {
		var loader = new FBXLoader();
		loader.load( path, function ( object ) {
	
			//console.log(object);
			object.scale.set(scale[0], scale[1], scale[2]);
			object.position.set(pos[0], pos[1], pos[2]);
				
			object.traverse( function ( child ) {
				if ( child.isMesh ) {
					child.castShadow = true;
					child.receiveShadow = true;
				}
			} );
			scene.add( object );
			//console.log(object);
			if (object == null) {
				reject();
			}else{
				resolve(object);
			}
	
		} );
		
	})
	return promise;
}

function loadGLTF(path, pos,scale) {
	return new Promise((resolve, reject)=>{

		// Instantiate a loader
		var loader = new GLTFLoader();
	
		// Optional: Provide a DRACOLoader instance to decode compressed mesh data
		var dracoLoader = new DRACOLoader();
		// dracoLoader.setDecoderPath( '/examples/js/libs/draco/' );
		dracoLoader.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/');
		loader.setDRACOLoader( dracoLoader );
	
		// Load a glTF resource
		loader.load(
			// resource URL
			path,
			// called when the resource is loaded
			function ( gltf ) {
				//Transformations
				gltf.scene.scale.set(scale[0], scale[1], scale[2]);
				gltf.scene.position.set(pos[0], pos[1], pos[2]);
				gltf.scene.castShadow = true;
				gltf.scene.receiveShadow = true;
				gltf.scene.traverse( function ( child ) {
					if ( child.isMesh ) {
						child.castShadow = true;
						child.receiveShadow = true;
					}
				} );
				scene.add( gltf.scene );
				//console.log(gltf);
				
				gltf.animations; // Array<THREE.AnimationClip>
				gltf.scene; // THREE.Group
				gltf.scenes; // Array<THREE.Group>
				gltf.cameras; // Array<THREE.Camera>
				gltf.asset; // Object

				GLTF_Objects.push(gltf.scene);
				//console.log(D_Object);
				resolve(gltf)
	
			},
			// called while loading is progressing
			function ( xhr ) {
	
				console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
	
			},
			// called when loading has errors
			function ( error ) {
	
				console.log( 'An error happened' );
				reject(error);
			});	
	});
}

function loadDraco(path) {
	var dracoLoader = new DRACOLoader();
	// It is recommended to always pull your Draco JavaScript and WASM decoders
	// from this URL. Users will benefit from having the Draco decoder in cache
	// as more sites start using the static URL.
	dracoLoader.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/');
	
	dracoLoader.setDecoderConfig( { type: 'js' } );

	dracoLoader.load( path, function ( geometry ) {

		geometry.computeVertexNormals();

		var material = new THREE.MeshStandardMaterial( { color: 0x606060 } );
		var mesh = new THREE.Mesh( geometry, material );
		mesh.castShadow = true;
		mesh.receiveShadow = true;
		// mesh.position.y = 0.3;
		scene.add( mesh );

		// Release decoder resources.
		dracoLoader.dispose();

	} );
}

function loadBasisTexture(path){
	return new Promise((resolve, reject)=>{
		var material = new THREE.MeshStandardMaterial();
		var loader = new BasisTextureLoader();
		loader.setTranscoderPath( 'js/libs/basis/' );
		loader.detectSupport( renderer );
		loader.load( path, function ( texture ) {
	
			texture.encoding = THREE.sRGBEncoding;
			material.map = texture;
			material.needsUpdate = true;
			resolve (material);
	
		}, undefined, function ( error ) {
			console.error( error );
			reject (error);
		} );
		
	})

}

function displayWindowSize(){
	// Get width and height of the window excluding scrollbars
	var w = document.documentElement.clientWidth;
	var h = document.documentElement.clientHeight;
	
	// Display result inside a div element
	// console.log("Width: " + w + ", " + "Height: " + h);
	renderer.setSize(w, h);
	// camera.fov = Math.atan(window.innerHeight / 2 / camera.position.z) * 2 * THREE.Math.RAD2DEG;
	camera.aspect = w / h;
	camera.updateProjectionMatrix();
}

// Attaching the event listener function to window's resize event
window.addEventListener("resize", displayWindowSize);
// document.addEventListener( 'keydown', onKeyDown, false );
// document.addEventListener( 'keyup', onKeyUp, false );


function initCannon(){
	// Setup our world
	world = new CANNON.World();
	world.quatNormalizeSkip = 0;
	world.quatNormalizeFast = false;

	world.gravity.set(0,-10,0);
	world.broadphase = new CANNON.NaiveBroadphase();

	
	// Create a plane
	var groundShape = new CANNON.Plane();
	var groundBody = new CANNON.Body({ mass: 0 });
	groundBody.addShape(groundShape);
	groundBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1,0,0),-Math.PI/2);
	world.add(groundBody);


	// Create boxes
	var mass = 0.5;
	//radius1 = 1.3
	var boxShape = new CANNON.Box(new CANNON.Vec3(0.5,0.5,0.5)); //(0.05,0.005,0.05)
	
	var boxBody = new CANNON.Body({ mass: mass });
	boxBody.addShape(boxShape);
	boxBody.position.set(0,6,0);
	
	//boxBody.collisionResponse = 0; // no impact on other bodys
	//boxBody.addEventListener("collide", function(e){ console.log("collided"); } );


	world.add(boxBody);
	bodies.push(boxBody);

	//Creatr Mesh1 
	var mass1 = 0.5 ;
	//console.log(D_Objects[0]);
	meshes.push(GLTF_Objects[0]);
	//var meshShape1 = threeToCannon(GLTF_Objects[0]);
	//console.log("done");
	//console.log(meshShape1);
	var meshBody1 = new CANNON.Body({ mass: mass1 });
	var boxShape1 = new CANNON.Box(new CANNON.Vec3(0.75,0.75,0.75));
	//meshBody2.addShape(meshShape1); 
	meshBody1.addShape(boxShape1); //meshShape1
	meshBody1.position.set(3,3,0);
	world.add(meshBody1);
	bodies.push(meshBody1);

	
	//Creatr Mesh2 
	var mass2 = 0.5 ;
	meshes.push(GLTF_Objects[1]);
	//var meshShape2 = threeToCannon(GLTF_Objects[1]);
	var meshBody2 = new CANNON.Body({ mass: mass2 });
	var boxShape2 = new CANNON.Box(new CANNON.Vec3(0.75,0.75,0.75));
	//meshBody2.addShape(meshShape2); 
	meshBody2.addShape(boxShape2); //meshShape2
	meshBody2.position.set(0, 0.75, 0); //(0, 0.75, 0)
	world.add(meshBody2);
	bodies.push(meshBody2);

	//Creatr Mesh3
	var mass3 = 0.5 ;
	meshes.push(GLTF_Objects[2]);
	//var meshShape3 = threeToCannon(GLTF_Objects[1]);
	var meshBody3 = new CANNON.Body({ mass: mass3 });
	var boxShape3 = new CANNON.Box(new CANNON.Vec3(0.75,0.75,0.75));
	meshBody3.addShape(boxShape3);//meshShape3
	meshBody3.position.set(0, 5, -10); //(0, 0.75, 0)
	world.add(meshBody3);
	bodies.push(meshBody3);

	//Creatr Mesh4 
	var mass4 = 0.5 ;
	meshes.push(GLTF_Objects[3]);
	//var meshShape4 = threeToCannon(GLTF_Objects[1]);
	var meshBody4 = new CANNON.Body({ mass: mass4});
	var boxShape4 = new CANNON.Box(new CANNON.Vec3(2.5,1.5,0.75));
	meshBody4.addShape(boxShape4);//meshShape5
	meshBody4.position.set(0, 3, -5); //(0, 0.75, 0)
	world.add(meshBody4);
	bodies.push(meshBody4);

	/*
	//Creatr Mesh5 
	var mass5 = 0.5 ;
	meshes.push(GLTF_Objects[4]);
	//var meshShape5 = threeToCannon(GLTF_Objects[1]);
	var meshBody5 = new CANNON.Body({ mass: mass5 });
	var boxShape5 = new CANNON.Box(new CANNON.Vec3(0.75,0.75,0.75));
	meshBody5.addShape(boxShape5);
	meshBody5.position.set(5, 10, 0); //(0, 0.75, 0)
	world.add(meshBody5);
	bodies.push(meshBody5);
	*/
	
	

}

function updatePhysics(){
	world.step(dt);
	meshes[0].position.copy(bodies[0].position); //
	meshes[0].quaternion.copy(bodies[0].quaternion);
	for(var i=1; i !== meshes.length; i++){
		var res;
		res=bodies[i].position.vsub(new CANNON.Vec3(0,0.75,0));
		//console.log(bodies[i].position);
		//console.log(res);
		meshes[i].position.copy(res); //(bodies[i].position)
		meshes[i].quaternion.copy(bodies[i].quaternion);
	}
}



function animate() 
{
	// const hasControlsUpdated = cameraControls.update( delta );
	requestAnimationFrame(animate);
	render();

	if(boolCannon){
		updatePhysics();//
	}
		
	stats.update();	
	controls.update();
	renderer.render(scene, camera);
}



function render() 
{
	const delta = clock.getDelta();
	//Para la animacion
	if ( mixer ) mixer.update( delta );
	if ( mixer2 ) mixer2.update( delta );
	if ( mixerCap ) mixerCap.update( delta );
	
	
}


init();
main();
setTimeout(initCannon, 3000);//
setTimeout(animate, 3000);// 
//initCannon();
//animate();
