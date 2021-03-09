import React from 'react'
import { Html } from '@react-three/drei'
import { HotspotOutdoorIcon } from '../../icons'


const VRHotspot = React.memo(({ 
    history, hotspot, locale
}) => {
    const [hovered, setHover] = React.useState(false)
    const onOverHotspot = (() => hotspot.hover && setHover(false))
    const onOutHotspot = (() => hotspot.hover && setHover(false))
    const onClickHotspot = (() => {
        hotspot.to && history && history.push(hotspot.to, history.location.pathname)
    })
    const scale = hovered ? hotspot.hoverSize : (hotspot.size ?? [-50, 50])
    const position = hotspot.position ?? [0, 0, 0]
    const rotation = hotspot.rotation ?? [0, 0, 0]

    if(hovered){
        document.getElementsByTagName('body')[0].className = "pointesr"
    }else{
        document.getElementsByTagName('body')[0].className = ""
    }

    return (
        <mesh
            key={hotspot.name}
            onPointerOver={onOverHotspot}
            onPointerOut={onOutHotspot}
            className={`canvas-hover`}
            position={position}
            rotation={rotation}
            scale={scale}
        >
            <Html scaleFactor={hotspot.scale || 1000} zIndexRange={!hovered ? [3,0] : [3,0]} center={true}>
                {(hotspot.type === "panorama-spot") && (
                    <div 
                        className={`info-icon ${hovered ? 'hovered': ''}`} 
                        onClick={() => {
                            onClickHotspot()
                            hotspot.hover && setHover(!hovered)
                        }}
                        onPointerOver={(e) => { !hovered && setHover(true) }}
                        onPointerOut={(e) => { hovered && setHover(false) }}
                    >
                        <HotspotOutdoorIcon />
                    </div>
                )}

            
            </Html>
        </mesh>
    )

})

export default VRHotspot