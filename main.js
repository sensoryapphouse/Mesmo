// Buttons
// 1. Speed .1 - .6
// 2. Hue variation 0 - 1 (when 0 have different hue variations: 0, .15, .5, )
// 3. Density 0-1
// 4. Displacement 0.1, 0.5, 1
var showGUI = false;

var splash;
var button;
var button1;
var button2;
var button3;
var crosshairs;


window.onload = function () {
    //    if ('serviceWorker' in navigator) {
    //        navigator.serviceWorker
    //            .register('./sw.js');
    //    }

    crosshairs = document.querySelector('crosshairs');
    crosshairs.hidden = true;
    splash = document.querySelector('splash');
    splash.hidden = true;
    button = document.querySelector('button');
    button1 = document.querySelector('button1');
    button2 = document.querySelector('button2');
    button3 = document.querySelector('button3');
    button.onmousedown = function (e) {
        e.preventDefault();
        Action(1);
    }
    button1.onmousedown = function (e) {
        e.preventDefault();
        e.stopPropagation();
        Action(2);
    }
    button2.onmousedown = function (e) {
        e.preventDefault();
        e.stopPropagation();
        Action(3);
    }
    button3.onmousedown = function (e) {
        e.preventDefault();
        e.stopPropagation();
        Action(4);
    }
    button.ontouchstart = function (e) {
        e.preventDefault();
        e.stopPropagation();
        Action(1);
    }
    button1.ontouchstart = function (e) {
        e.preventDefault();
        e.stopPropagation();
        Action(2);
    }
    button2.ontouchstart = function (e) {
        e.preventDefault();
        e.stopPropagation();
        Action(3);
    }
    button3.ontouchstart = function (e) {
        e.preventDefault();
        e.stopPropagation();
        Action(4);
    }


    splash.onclick = function (e) {
        e.stopPropagation();
        start();
    }
    splash.ontouchstart = function (e) {
        e.stopPropagation();
        start();
    }
}

function start() {
    if (document.body.requestFullscreen) {
        document.body.requestFullscreen();
    } else if (document.body.msRequestFullscreen) {
        document.body.msRequestFullscreen();
    } else if (document.body.mozRequestFullScreen) {
        document.body.mozRequestFullScreen();
    } else if (document.body.webkitRequestFullscreen) {
        document.body.webkitRequestFullscreen();
    }
    splash.hidden = true;
}

var hueVal = 0;

function Action(i) {
    //let parameters = {
    //    speed: .2,
    //    hue: .5,
    //    hueVariation: 1,
    //    gradient: .3,
    //    density: .5,
    //    displacement: .66
    //};

    switch (i) {
        case 1: // speed
            switch (parameters.speed) {
                case .2:
                    parameters.speed = .4;
                    break;
                case .4:
                    parameters.speed = .6;
                    break;
                case .6:
                    parameters.speed = .1;
                    break;
                case .1:
                    parameters.speed = .2;
                    break;
            }
            PlaySound(1);
            break;
        case 2: // Hue variation 0 - 1 (when 0 have different hue variations: 0, .15, .5, )
            hueVal++;
            if (hueVal > 5)
                hueVal = 0;
            switch (hueVal) {
                case 0:
                    parameters.hue = .5;
                    parameters.hueVariation = 1;
                    break;
                case 1:
                    parameters.hue = 0.0;
                    parameters.hueVariation = .3;
                    break;
                case 2:
                    parameters.hue = .3;
                    parameters.hueVariation = .3;
                    break;
                case 3:
                    parameters.hue = .6; // .5 good
                    parameters.hueVariation = .3;
                    break;
                case 4:
                    parameters.hue = 1;
                    parameters.hueVariation = .33;
                    break;
                case 5:
                    parameters.hue = 1;
                    parameters.hueVariation = .55;
                    break;
            }
            PlaySound(2);
            break;
        case 3: // 3. Density 0-1
            switch (parameters.density) {
                case 0:
                    parameters.density = .5;
                    break;
                case .5:
                    parameters.density = 1.0;
                    break;
                case 1.0:
                    parameters.density = .0;
                    break;
            }
            PlaySound(3);
            break;
        case 4: //Displacement 0.1, 0.5, 1
            switch (parameters.displacement) {
                case .1:
                    parameters.displacement = .5;
                    break;
                case .5:
                    parameters.displacement = 1;
                    break;
                case 1:
                    parameters.displacement = .1;
                    break;

            }
            PlaySound(3);
            break;
    }
    updateParameters();
}

document.onkeypress = function (e) {
    //        e.preventDefault();
    if (e.repeat)
        return;
    switch (e.charCode) {
        case 32:
        case 49:
            Action(1);
            break;
        case 50:
            Action(2);
            break;
        case 51:
        case 13:
            Action(3);
            break;
        case 52:
            Action(4);
            break;
        case 53:
            toggleButtons();
            break;
    }
}

var player;
var player1;
var player2;

function PlaySound(i) {
    try {
        switch (i) {
            case 1:
                if (player == undefined) {
                    player = document.getElementById('audio');
                    player.loop = false;
                }
                player.load();
                player.play();
                break;
            case 2:
                if (player1 == undefined) {
                    player1 = document.getElementById('audio1');
                }
                player1.load();
                player1.play();
                break;
            case 3:
                if (player2 == undefined) {
                    player2 = document.getElementById('audio2');
                }
                player2.load();
                player2.play();
                break;
        }
    } catch (e) {};
}

function toggleButtons() {
    button.hidden = !button.hidden;
    button1.hidden = !button1.hidden;
    button2.hidden = !button2.hidden;
    button3.hidden = !button3.hidden;
}


class World {
    constructor(width, height) {

        this.renderer = new THREE.WebGLRenderer({
            alpha: true,
            antialias: true
        });

        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(width, height);
        this.container = document.getElementsByClassName("world")[0];
        this.scene = new THREE.Scene();
        this.width = width;
        this.height = height;
        this.aspectRatio = width / height;
        this.fieldOfView = 50;
        var nearPlane = .1;
        var farPlane = 20000;
        this.camera = new THREE.PerspectiveCamera(this.fieldOfView, this.aspectRatio, nearPlane, farPlane);
        this.camera.position.z = 200;
        this.container.appendChild(this.renderer.domElement);
        this.timer = 0;
        this.mousePos = {
            x: 0,
            y: 0
        };
        this.targetMousePos = {
            x: 0,
            y: 0
        };
        this.createPlane();
        this.render();
    }

    createPlane() {
        this.material = new THREE.RawShaderMaterial({
            vertexShader: document.getElementById('vertexShader').textContent,
            fragmentShader: document.getElementById('fragmentShader').textContent,

            uniforms: {
                uTime: {
                    type: 'f',
                    value: 0
                },
                uHue: {
                    type: 'f',
                    value: .5
                },
                uHueVariation: {
                    type: 'f',
                    value: 1
                },
                uGradient: {
                    type: 'f',
                    value: 1
                },
                uDensity: {
                    type: 'f',
                    value: 1
                },
                uDisplacement: {
                    type: 'f',
                    value: 1
                },
                uMousePosition: {
                    type: 'v2',
                    value: new THREE.Vector2(0.5, 0.5)
                }
            }
        });


        this.planeGeometry = new THREE.PlaneGeometry(2, 2, 1, 1);

        this.plane = new THREE.Mesh(this.planeGeometry, this.material);
        this.scene.add(this.plane);
    }

    render() {
        this.timer += parameters.speed;
        this.plane.material.uniforms.uTime.value = this.timer;

        this.mousePos.x += (this.targetMousePos.x - this.mousePos.x) * .1;
        this.mousePos.y += (this.targetMousePos.y - this.mousePos.y) * .1;

        if (this.plane) {
            this.plane.material.uniforms.uMousePosition.value = new THREE.Vector2(1.0 - this.mousePos.x, 1.0 - this.mousePos.y);
        }

        this.renderer.render(this.scene, this.camera);
    }

    loop() {
        this.render();
        requestAnimationFrame(this.loop.bind(this));
    }

    updateSize(w, h) {
        this.renderer.setSize(w, h);
        this.camera.aspect = w / h;
        this.camera.updateProjectionMatrix();
    }
    mouseMove(mousePos) {
        mousePos.px = mousePos.x / window.innerWidth;
        mousePos.py = 1.0 - mousePos.y / window.innerHeight;
        this.targetMousePos.x = mousePos.px;
        this.targetMousePos.y = mousePos.py;
    }
};

document.addEventListener("DOMContentLoaded", domIsReady);
let mousePos = {
    x: 0,
    y: 0,
    px: 0,
    py: 0
};
let world;

let parameters = {
    speed: .2,
    hue: .5,
    hueVariation: 1,
    gradient: .3,
    density: .5,
    displacement: .5 // PB .66
};



function domIsReady() {
    world = new World(this.container, this.renderer, window.innerWidth, window.innerHeight);
    window.addEventListener('resize', handleWindowResize, false);
    document.addEventListener("mousemove", handleMouseMove, false);
    document.addEventListener('touchend', onDocumentTouchMove, false);
    document.addEventListener('touchmove', onDocumentTouchMove, false);
    document.addEventListener('touchstart', onDocumentTouchMove, false);

    function onDocumentTouchMove(event) {
        event.preventDefault();
        handleMouseMove(event.changedTouches[0]);
    }

    handleWindowResize();
    world.loop();
    if (showGUI)
        initGui();
}

var guiHue;
try {
    if (showGUI) {
        let gui = new dat.GUI();


        function initGui() {
            gui.width = 250;
            guiSpeed = gui.add(parameters, 'speed').min(.1).max(1).step(.01).name('speed');
            guiHue = gui.add(parameters, 'hue').min(0).max(1).step(.01).name('hue');
            guiVariation = gui.add(parameters, 'hueVariation').min(0).max(1).step(.01).name('hue variation');
            //guiGradient = gui.add(parameters, 'gradient').min(0).max(1).step(.01).name('inner gradient');
            guiDensity = gui.add(parameters, 'density').min(0).max(1).step(.01).name('density');
            guiDisp = gui.add(parameters, 'displacement').min(0).max(1).step(.01).name('displacement');

            guiHue.onChange(function (value) {
                updateParameters();
            });

            guiVariation.onChange(function (value) {
                updateParameters();
            });
            /*
            guiGradient.onChange( function(value) {
            	updateParameters();
            });
            */
            guiDensity.onChange(function (value) {
                updateParameters();
            });

            guiDisp.onChange(function (value) {
                updateParameters();
            });
            updateParameters();
        }
    }
} catch (e) {};

function updateParameters() {
    world.plane.material.uniforms.uHue.value = parameters.hue;
    world.plane.material.uniforms.uHueVariation.value = parameters.hueVariation;
    //world.plane.material.uniforms.uGradient.value = parameters.gradient;
    world.plane.material.uniforms.uDensity.value = parameters.density;
    world.plane.material.uniforms.uDisplacement.value = parameters.displacement;
}

function handleWindowResize() {
    world.updateSize(window.innerWidth, window.innerHeight);
}

function handleMouseMove(e) {
    mousePos.x = e.clientX;
    mousePos.y = e.clientY;
    world.mouseMove(mousePos);
}

var gpad;

function getAxes() {
    //        console.log('Axis', gpad.getAxis(0), gpad.getAxis(1), gpad.getButton(14).value);

    if (splash.hidden) {
        JoystickMoveTo(gpad.getAxis(1), gpad.getAxis(0));
        JoystickMoveTo(gpad.getAxis(3), gpad.getAxis(2));
    }
    setTimeout(function () {
        getAxes();
    }, 50);
}

gamepads.addEventListener('connect', e => {
    console.log('Gamepad connected:');
    console.log(e.gamepad);
    gpad = e.gamepad;
    e.gamepad.addEventListener('buttonpress', e => showPressedButton(e.index));
    e.gamepad.addEventListener('buttonrelease', e => removePressedButton(e.index));
    setTimeout(function () {
        getAxes();
    }, 50);
});


gamepads.addEventListener('disconnect', e => {
    console.log('Gamepad disconnected:');
    console.log(e.gamepad);
});

gamepads.start();

var mouseX, mouseY;

function MoveMouse(xm, ym) {
    crosshairs.hidden = false;
    try {
        mouseX = crosshairs.offsetLeft + (crosshairs.offsetWidth) / 2;
        mouseY = crosshairs.offsetTop + (crosshairs.offsetHeight) / 2;
        mouseX += xm;
        mouseY += ym;
        if (mouseX < 10)
            mouseX = 10;
        if (mouseY < 10)
            mouseY = 10;
        if (mouseX >= window.innerWidth - 10)
            mouseX = window.innerWidth - 10;
        if (mouseY >= window.innerHeight - 10)
            mouseY = window.innerHeight - 10;
        crosshairs.style.left = mouseX - crosshairs.offsetWidth / 2 + "px";
        crosshairs.style.top = mouseY - crosshairs.offsetHeight / 2 + "px";
        var mousepos = {
            clientX: mouseX,
            clientY: mouseY
        };
        handleMouseMove(mousepos);
        console.log("Xtarget: ", mouseX, mouseY);
    } catch {}
}

function JoystickMoveTo(jy, jx) {
    if (splash.hidden) {
        if (Math.abs(jx) < .1 && Math.abs(jy) < .1) {
            try {
                if (gpad.getButton(14).value > 0) // dpad left
                    MoveMouse(-3, 0);
                if (gpad.getButton(12).value > 0) // dup
                    MoveMouse(0, -2);
                if (gpad.getButton(13).value > 0) // ddown
                    MoveMouse(0, 2);
                if (gpad.getButton(15).value > 0) // dright
                    MoveMouse(3, 0);
            } catch {}
            return;
        }
        if (Math.abs(jx) < .1)
            jx = 0;
        if (Math.abs(jy) < .1)
            jy = 0;
        if (jx == 0 && jy == 0)
            return;
        MoveMouse(jx * 10, jy * 10);
    }
}

function showPressedButton(index) {
    console.log("Press: ", index);
    if (!splash.hidden) {
        splash.hidden = true;
    } else switch (index) {
        case 0: // A click
            Action(1);
            break;
        case 1: // B
            Action(2);
            break;
        case 2: // Y
            Action(3);
            break;
        case 4:
            Action(4);
            break;
        case 8:
            toggleButtons();
            break;
        case 5:
        case 6:
        case 7:
        case 9:
        case 11:
        case 16:
            break;
        case 10: // XBox
            showMenu();
            break;
        default:
    }
}

function removePressedButton(index) {
    console.log("Releasd: ", index);
}
