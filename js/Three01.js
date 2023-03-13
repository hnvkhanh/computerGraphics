function addRandomBox(event, scene) {                
    const geometry = new THREE.BoxGeometry( 1, 1, 1 );                
    const material = new THREE.MeshBasicMaterial( { color: 0x000000 } );
    const box = new THREE.Mesh( geometry, material );  
    const edges = new THREE.EdgesGeometry( geometry );
    const line = new THREE.LineSegments( edges, new THREE.LineBasicMaterial( { color: 0x808080 } ) );
    box.add( line ); 
    box.position.y = Math.random() * 10 * binary[Math.floor(Math.random() * 2)];     
    box.position.x = Math.random() * 25 * binary[Math.floor(Math.random() * 2)];          
    scene.add( box );                

    return scene, box
}

function boxAnimation(animatedBox, index, array){   
    var box = animatedBox.box;                                

    animatedBox.rotateBox();
    animatedBox.moveBox();                                      

    if (box.position.x >  29 || box.position.x < -29 ){                        
        animatedBox.direction.directX *= -1;                                                                     
        animatedBox.randomChangeVelocity();                                                              
    } 

    if (box.position.y >  14 || box.position.y < -14 ){    
        animatedBox.direction.directY *= -1;     
        animatedBox.randomChangeVelocity();                                                                                                                                                      
    } 

}

class animatedBox{
    constructor(box){
        this.box = box;
        this.direction = {
            directX : binary[Math.floor(Math.random() * 2)],
            directY : binary[Math.floor(Math.random() * 2)]
        }
        this.velocity = {
            velocX : 0.2,
            velocY : 0.2
        }
    }

    randomChangeVelocity(){
        this.velocity.velocY +=  binary[Math.floor(Math.random() * 2)] * 0.005;
        this.velocity.velocX +=  binary[Math.floor(Math.random() * 2)] * 0.005;       
    }

    rotateBox(){
        this.box.rotation.x += 0.02;
        this.box.rotation.y += 0.02;
        this.box.rotation.z += 0.02; 
    }

    moveBox(){
        this.box.position.x += this.velocity.velocX * this.direction.directX;    
        this.box.position.y += this.velocity.velocY * this.direction.directY;  
    }
}

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xE8D5C4);
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

camera.position.z = 20;

const boxList = [];            
const binary = [1, -1];                                      

document.addEventListener("keydown", (e) =>{      
    let box;                                       
    scene, box = addRandomBox(e, scene);                
    boxList.push(new animatedBox(box));                                   
});


function animate() {
    requestAnimationFrame( animate );				                                
    boxList.forEach(boxAnimation);                                                   
                         
    renderer.render( scene, camera );
}            
animate();