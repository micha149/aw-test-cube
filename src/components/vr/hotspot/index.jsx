import * as THREE from 'three'
import React from 'react'
import { Walkspot } from '../../../assets'


const VRHotspot = React.memo(({ square, circle, history, hotspot }) => {
    const [hovered, setHover] = React.useState(false)
    const onClickHotspot = (() => hotspot.to && history && history.push(hotspot.to, history.location.pathname))
    const scale = hovered ? hotspot.hoverSize : (hotspot.size ?? [-50, 50])
    const position = hotspot.position ?? [0, 0, 0]
    const rotation = hotspot.rotation ?? [0, 0, 0]

    if (hotspot.type === "panorama-spot") return (
        <mesh
            key={hotspot.name}
            className="canvas-hover"
            onPointerOver={(e) => { !hovered && setHover(true) }}
            onPointerOut={(e) => { hovered && setHover(false) }}
            onPointerDown={onClickHotspot}
            position={position}
            rotation={rotation}
            scale={scale}
        >
            {square && <planeBufferGeometry attach="geometry" args={[1, 1]} />}
            {circle && <circleGeometry attach="geometry" args={[0.5, 50]} />}
            <meshBasicMaterial map={new THREE.TextureLoader().load(Walkspot)} side={THREE.DoubleSide} blending={THREE.AdditiveBlending} opacity={hovered ? 1 : 0.4} transparent={true} needsUpdate={false} />
        </mesh>
    )
})

export default VRHotspot