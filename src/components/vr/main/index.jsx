import React from 'react'
import { useCubeTexture } from '@react-three/drei';
import { BackSide, ShaderLib, UniformsUtils } from 'three';

const VRMain = React.memo(({ path }) => {
    const envMap = useCubeTexture(['px.png', 'nx.png', 'py.png', 'ny.png', 'pz.png', 'nz.png'], { path })

    return (
        <mesh onClick={(e) => console.log('canvas', [e.point])}>
            <boxBufferGeometry args={[500, 500, 500]} />
            <shaderMaterial
                fragmentShader={ShaderLib.cube.fragmentShader}
                vertexShader={ShaderLib.cube.vertexShader}
                uniforms={UniformsUtils.clone(ShaderLib.cube.uniforms)}
                uniforms-envMap-value={envMap}
                envMap={envMap}
                side={BackSide}
            />
        </mesh>
    )

})

export default VRMain
