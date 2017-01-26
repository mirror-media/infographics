/**
 *
 * Snow Box by Felix Turner
 * www.airtight.cc
 *
 * Three.js particles moving via perlin noise
 *
 */
var boxW, boxH;
var boxD = 1000;
var noiseScale = 114;
var container, camera, scene, renderer;
var particleSystem, particleGeometry;
var particles = [];
var perlin;
var mouse2D;
var windDir = 0;
var params;
var gui;
var box;

if(!Detector.webgl)
	Detector.addGetWebGLMessage({});

function ParticleParms() {
	this.particleCount = 1000;
	this.particleSize = 15;
	this.windSpeed = 0.5;
	this.gravity = 0.1;
	this.particleLifeSpan = 600;
	this.cameraZ = 800;
	this.colorize = true;
	this.showBox = false;

	this.randomizeParams = function() {
		this.particleCount = getRand(500, 20000, true);
		this.particleSize = getRand(10, 100, true);
		this.windSpeed = getRand(0, 10);
		this.gravity = getRand(0, 10);
		this.particleLifeSpan = getRand(0, 1200, true);
		this.cameraZ = getRand(0, 2000, true);
		this.colorize = Math.random() > .5;
		//this.showBox = Math.random() > .5;
		initParticles();
		windDir = Math.random() * Math.PI * 2;
		gui.listenAll();
	}
}

function init() {
	params = new ParticleParms();
	//create control panel
	// gui = new dat.GUI({ autoPlace: false });

	// var customContainer = document.getElementById('gui-container');
	// customContainer.appendChild(gui.domElement);

	// // Add Sliders with min + max
	// gui.add(params, 'particleCount', 500, 20000, 100).name('Particle Count').onChange(initParticles);
	// gui.add(params, 'particleSize', 10, 100, 10).name('Particle Size');
	// gui.add(params, 'windSpeed', 0, 10, .1).name('Wind Speed');
	// gui.add(params, 'gravity', 0, 10, .1).name('Gravity Strength');
	// gui.add(params, 'particleLifeSpan', 0, 1200, 20).name('Particle Lifespan');
	// gui.add(params, 'cameraZ', 0, 2000, 50).listen().name('Camera Distance');
	// gui.add(params, 'showBox').name('Show Box');
	// gui.add(params, 'colorize').name('Colorize');
	// // gui.add(params, 'randomizeParams').name('Randomize');

	// $(".guidat-controllers").css("height", "287px");

	// stop the user getting a text cursor
	document.onselectStart = function() {
		return false;
	};
	//set up 3D renderer
	container = document.getElementById('particles');
	// $('body').prepend(container);
	renderer = new THREE.WebGLRenderer({
		antialias : false,
		alpha: true,
		sortObjects : false,
		sortElements : false
	});

	renderer.setClearColor(0xffffff, 0.1);

	renderer.setSize(window.innerWidth, window.innerHeight);
	container.appendChild(renderer.domElement);
	camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 10000);

	camera.position.z = 550;
	scene = new THREE.Scene();
	scene.add( camera );
	boxW = window.innerWidth / 2;
	boxH = window.innerHeight / 2;

	//add box
	box = new THREE.Mesh(new THREE.CubeGeometry(boxW, boxH, boxD), new THREE.MeshBasicMaterial({
		color : 0xdddddd,
		wireframe : true
	}));
	scene.add(box);
	perlin = new ImprovedNoise();

	//create one shared particle material
	var sprite = THREE.ImageUtils.loadTexture("img/ball.png");
	material = new THREE.ParticleBasicMaterial({
		size : params.particleSize,
		map : sprite,
		blending : THREE.AdditiveBlending,
		depthTest : false,
		transparent : true,
		vertexColors : true, //allows 1 color per particle,
		opacity : .7
	});
	mouse2D = new THREE.Vector2(0, 0);

	// //add stats
	// stats = new Stats();
	// stats.domElement.style.position = 'absolute';
	// stats.domElement.style.top = '0px';
	// container.appendChild(stats.domElement);

	initParticles();

	animate();
}

function initParticles() {

	if(particleSystem)
		scene.removeObject(particleSystem);
	particles = [];
	particleGeometry = new THREE.Geometry();

	//init particle system
	particleSystem = new THREE.ParticleSystem(particleGeometry, material);
	particleSystem.sortParticles = false;
	scene.add(particleSystem);

	for( i = 0; i < params.particleCount; i++) {
		var p = new Particle(i / params.particleCount);
		particles.push(p);
	}
}

function animate() {

	// stats.update();

	camera.position.x += (mouse2D.x * 1.5 - camera.position.x) * 0.3;
	camera.position.y += (-mouse2D.y * 1.5 - camera.position.y) * 0.3;
	windDir += .005;

	//loop thru each particle
	for( i = 0; i < params.particleCount; i++) {
		particles[i].update();
	}

	particleGeometry.__dirtyVertices = true;
	particleGeometry.__dirtyColors = true;

	//TODO - only do on change
	material.size = params.particleSize;
	camera.position.z = params.cameraZ;
	box.visible = params.showBox;

	renderer.render(scene, camera);

	requestAnimationFrame(animate);
}


// $(window).mousemove(function(event) {
// 	//set cam X,Y position
// 	mouse2D.x = event.clientX - window.innerWidth / 2;
// 	mouse2D.y = event.clientY - window.innerHeight / 2;
// });

// $(window).mousewheel(function(event, delta) {
// 	//set camera Z
// 	params.cameraZ -= delta * 50;
// 	//limit
// 	params.cameraZ = Math.min(2000, params.cameraZ);
// 	params.cameraZ = Math.max(0, params.cameraZ);
// });

$(window).resize(function() {
	renderer.setSize(window.innerWidth, window.innerHeight);
	camera.aspect = window.innerWidth / window.innerHeight;
});

$(document).ready(function() {
	init();
});
////////////////////

/**
 * Particle Class handles movement of particles
 */
var Particle = function(id) {

	this.lifeSpan = 200;
	this.id = id;
	this.posn = new THREE.Vector3();
	this.screenPosn = new THREE.Vector3();
	particleGeometry.vertices.push(new THREE.Vertex(this.screenPosn));
	this.color = new THREE.Color();
	particleGeometry.colors.push(this.color);

	this.init = function() {

		//set random posn
		this.screenPosn.set(getRand(-boxW / 2, boxW / 2), getRand(-boxH / 2, boxH / 2), getRand(-boxD / 2, boxD / 2));

		this.posn.x = this.screenPosn.x + boxW / 2;
		this.posn.y = this.screenPosn.y + boxH / 2;

		//get color from Y posn
		var col = map(this.screenPosn.y, -boxH / 2, boxH / 2, 0, 1);
		// if(params.colorize)
		// 	this.color.setHSV(col, params.colorize ? 1 : 0, 1);
		// else
			this.color.setHex(0x000000);
		this.speed = getRand(params.windSpeed / 3, params.windSpeed);
		this.age = 0;
		this.lifespan = Math.random() * params.particleLifeSpan;
	}
	this.update = function() {

		this.id += 0.01;
		this.direction = perlin.noise(this.id, this.posn.x / noiseScale, this.posn.y / noiseScale);
		this.direction += windDir;

		this.posn.x += Math.cos(this.direction) * this.speed;
		this.posn.y += Math.sin(this.direction) * this.speed;
		//gravity
		this.posn.y -= params.gravity;

		if(this.posn.x < 0 || this.posn.y < 0) {
			this.init();
		}

		this.age++;
		if(this.age >= this.lifespan) {
			this.init();
		}

		this.screenPosn.x = this.posn.x - boxW / 2;
		this.screenPosn.y = this.posn.y - boxH / 2;

	}
	this.init();
}
////////////////////
//UTILS
////////////////////

function getRand(minVal, maxVal, round) {
	var r = minVal + (Math.random() * (maxVal - minVal));
	if(round) {
		r = Math.round(r);
	}
	return r;

}

function map(value, istart, istop, ostart, ostop) {
	return ostart + (ostop - ostart) * ((value - istart) / (istop - istart));
}