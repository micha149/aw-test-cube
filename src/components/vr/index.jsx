/* eslint-disable react-hooks/exhaustive-deps */

import * as THREE from 'three'
import React from 'react'
import { Canvas } from 'react-three-fiber'
import { VRCanvas, DefaultXRControllers } from '@react-three/xr'
import { VRButton } from 'three/examples/jsm/webxr/VRButton'
import { useHistory } from 'react-router'

import LoadingPage from '../../pages/loading'
import VRMain from './main'
import VRControls from './controls'
import VRHotspot from './hotspot'

const FOV = window.visualViewport.width < 600 ? 90 : 60

const VRComponent = ({ vr = false, panorama, previewPanorama, hotspots = [], model, initialPosition = [0, 0, 0], rotate }) => {
    const history = useHistory()
    const [loaded, setLoaded] = React.useState(false)
    const [loading, setLoading] = React.useState(true)
    const camera = new THREE.PerspectiveCamera(FOV, window.innerWidth / window.innerHeight, 0.1, 1500);


    const createVRCanvas = ({ gl }) => {
        if (!document.getElementById("VRButton")) document.body.appendChild(VRButton.createButton(gl))
        if (gl.xr?.enabled !== true) gl.xr.enabled = true;
        setTimeout(() => { if (document.getElementById("VRButton")) document.getElementById("VRButton").click(); }, 500)
    }

    if (window.controls) { if (window.controls.autoRotate !== rotate) { window.controls.autoRotate = rotate; camera.updateProjectionMatrix() } }

    React.useEffect(() => { if (vr === false && window.gl?.xr?.enabled === true) { window.gl.xr.enabled = false; window.location.reload() } }, [vr])

    React.useEffect(() => { camera.position.set(...initialPosition) }, [camera])
    React.useEffect(() => { camera.position.set(...initialPosition) }, [initialPosition])
    React.useEffect(() => { loaded && setLoaded(false); !loading && setLoading(true) }, [panorama])
    React.useEffect(() => { const t = setTimeout(() => loading && setLoading(false), 3000); return () => clearTimeout(t) }, [panorama])

    const opacityStyle = loading ? "opacity-05" : "preview-invisible"

    return (
        <div className="fullscreen">
            {<LoadingPage className={opacityStyle} forceLogoOnly redirect={false} />}
            {loading && <img className={`absolute-100 h-100 w-100 overflow-hidden zindex-10`} src={previewPanorama} alt="loading-screen" />}
            <div className="gradient-fullscreen" />
            {vr && (
                <VRCanvas onCreated={createVRCanvas} camera={camera} pixelRatio={window.devicePixelRatio}>
                    <VRControls initialPosition={initialPosition} />
                    <VRMain map={panorama} loaded={true} setLoaded={() => { }} />
                    <DefaultXRControllers />
                </VRCanvas>
            )}
            {!vr && (
                <Canvas camera={camera} pixelRatio={window.devicePixelRatio}>
                    <VRControls initialPosition={initialPosition} />
                    {hotspots?.filter(x => x.geometry === 'square').map((hotspot, i) => (<VRHotspot square history={history} hotspot={hotspot} key={i} />))}
                    {hotspots?.filter(x => x.geometry !== 'square').map((hotspot, i) => (<VRHotspot circle history={history} hotspot={hotspot} key={i} />))}
                    <VRMain map={panorama} loaded={loaded} setLoaded={setLoaded} />
                </Canvas>
            )}
        </div>
    )
}
export default React.memo(VRComponent)