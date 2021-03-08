import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import { connect } from 'react-redux';
import { VR } from './../../components'
import { updateCurrentAct } from './../../effects/actions'
import { ASSETS_FOLDER } from '../../utils';
const enviroments = require('./../../assets/mock-data/enviroment.json')

function usePrevious(value) { const ref = React.useRef(); React.useEffect(() => { ref.current = value }); return ref.current; }

const VRPage = ({ updateCurrentAct }) => {
  const params = useParams();
  const model = params.model ?? 'lobby'
  const pano = params.pano ?? 1
  const [currentModel, setCurrentModel] = useState()
  const [currentPanorama, setCurrentPanorama] = useState()
  const [vr, setVR] = useState(false)

  console.log("enviroments", enviroments)
  const searchModel = (id) => (enviroments && enviroments.model.find((x) => x.id === id))
  const searchPanorama = (model, pano) => (model?.panoramas.find((x) => String(x.id) === String(pano)))

  useEffect(() => {
    const _model = searchModel(model)
    setCurrentModel(_model)
    setCurrentPanorama(searchPanorama(_model, pano))
  }, [pano, model])

  const path = (currentPanorama && currentModel && enviroments) && `${ASSETS_FOLDER}/${enviroments.folder}/${currentModel.id}/${currentPanorama.name}/`
  const prevPath = usePrevious(path)

  return (
    <div>
      <VR
        vr={vr}
        setVR={setVR}
        key={path}
        rotate={false}
        panorama={path}
        previewPanorama={null}
        prevPath={prevPath}
        model={currentModel}
        hotspots={currentPanorama?.hotspots}
        initialPosition={currentPanorama?.initialPosition}
      />
    </div>
  )
}
export default connect(null, {
  updateCurrentAct
})(React.memo(VRPage))
