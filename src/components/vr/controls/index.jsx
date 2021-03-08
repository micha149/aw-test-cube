import * as THREE from 'three'
import React, { useEffect } from 'react'
import { extend, useFrame, useThree } from 'react-three-fiber'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

const FOV = window.visualViewport.width < 600 ? 90 : 60
const SPEED = window.visualViewport.width < 600 ? -0.5 : -0.2
extend({ OrbitControls })

const VRControls = () => {
    const mounted = React.useRef()
    const orbitRef = React.useRef()
    const {
        camera,
        invalidate,
        gl
      } = useThree();
    
    useFrame(() => {
        if (orbitRef.current) {
          return orbitRef.current.update();
        }
        return false;
      });

      useEffect(() => {
        if (orbitRef.current) {
          orbitRef.current.addEventListener("change", invalidate);
        }
      }, [invalidate, camera]);

    if (orbitRef.current && mounted.current !== true) {
        window.controls = orbitRef.current;
        window.camera = camera;
        window.gl = gl;
        camera.fov = FOV;
        gl.setSize(window.innerWidth, window.innerHeight, false);
        mounted.current = true;
        camera.updateProjectionMatrix();
    }

    gl.setAnimationLoop(() => {
        const dir = new THREE.Vector3()
        const sph = new THREE.Spherical()
        camera.getWorldDirection(dir)
        sph.setFromVector3(dir)
        if (window.compass) window.compass.style.transform = `rotate(${THREE.Math.radToDeg(sph.theta) - 180}deg)`
    })

    return (<orbitControls
        ref={orbitRef}
        args={[camera, gl.domElement]}
        autoRotate={false}
        rotateSpeed={SPEED}
    />)
}

export default VRControls