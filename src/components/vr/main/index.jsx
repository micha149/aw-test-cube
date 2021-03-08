import * as THREE from 'three'
import React from 'react'

const VRMain = React.memo(({ loaded, map, setLoaded }) => {
    if (!map) return <mesh />
    const geometry = new THREE.SphereBufferGeometry(500, 60, 40);
    const texture = new THREE.TextureLoader().load(map, () => setLoaded && setLoaded(true))
    texture.minFilter = THREE.LinearFilter
    texture.magFilter = THREE.LinearFilter
    const debugXYZ = false
    return (
        <mesh geometry={geometry} position={[0, 0, 0]} scale={[1, 1, -1]} onPointerMove={(e) => debugXYZ}>
            <meshBasicMaterial visible={loaded} map={texture} side={THREE.BackSide} opacity={1} transparent={false} precision='highp' needsUpdate={false} />
        </mesh>)
})

export default VRMain