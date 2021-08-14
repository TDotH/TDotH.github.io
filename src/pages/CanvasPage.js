import React, { useEffect, useRef } from 'react';
import { Scene, PerspectiveCamera, WebGLRenderer,
         BoxGeometry, MeshBasicMaterial, Mesh, 

} from 'three';
import '../styles/CanvasPage.scss';

function CanvasPage() {
    const mount = useRef(null);
    
    useEffect(() => {
        let { height, width } = getWindowDimensions();
        const scene = new Scene();
        const camera = new PerspectiveCamera( 75, width / height,
                                            0.1, 1000 );
        const renderer = new WebGLRenderer();

        renderer.setSize( width, height );
        const geometry = new BoxGeometry( 1, 1, 1 );
        const material = new MeshBasicMaterial({ color: 0xff00ff });
        let mesh = new Mesh( geometry, material );
        scene.add( mesh );
        renderer.setClearColor('#000000')
        camera.position.z = 4
        
        function render() {
            renderer.render(scene, camera);
        }

        function handleResize() {
            let { height, width } = getWindowDimensions();
            renderer.setSize(width, height);
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
            render();
        }

        function animate() {
            mesh.rotateX(0.01);
            mesh.rotateY(0.01);
            render();
            window.requestAnimationFrame(function() { animate(); });
        }

        function getWindowDimensions() {
            const { innerWidth: width, innerHeight: height } = window;
            return {
              width,
              height
            };
        }

        mount.current.appendChild( renderer.domElement )
        window.requestAnimationFrame(function() { animate(); });
        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize);
            mount.current.removeChild( renderer.domElement );
        }
        
    }, []);

    return (
        <div id='Canvas' ref={mount}/>
    );
}

export default CanvasPage;