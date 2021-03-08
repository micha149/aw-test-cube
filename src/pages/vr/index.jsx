import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import { connect } from 'react-redux';
import { VR } from './../../components'
import { updateCurrentAct } from './../../effects/actions'
const enviroments = require('./../../assets/mock-data/enviroment.json')
const acts = require('./../../assets/mock-data/act.json')

function usePrevious(value) { const ref = React.useRef(); React.useEffect(() => { ref.current = value }); return ref.current; }

const VRPage = ({ updateCurrentAct }) => {
  const params = useParams();
  const model = params.model ?? 'lobby'
  const pano = params.pano ?? 1
  const [currentModel, setCurrentModel] = useState()
  const [currentPanorama, setCurrentPanorama] = useState()
  const [rotate, setRotate] = useState(false)
  const [vr, setVR] = useState(false)

  const searchModel = (id) => (enviroments[0].model.find((x) => x.id === id))
  const searchPanorama = (model, pano) => (model?.panoramas.find((x) => String(x.id) === String(pano)))

  useEffect(() => {
    const _model = searchModel(model)
    setCurrentModel(_model)
    setCurrentPanorama(searchPanorama(_model, pano))
  }, [pano, model])

  useEffect(() => {
    if (currentModel && currentModel.act !== undefined) {
      let act = acts.find(x => x.act === currentModel.act)
      updateCurrentAct(act)

    }
  }, [currentModel, updateCurrentAct])

  const path = (currentPanorama && currentModel && enviroments) && require(`./../../${enviroments[0].folder}/${currentModel.id}/${currentPanorama.name}`)
  const previewPath = (currentPanorama && currentModel && enviroments) && require(`./../../${enviroments[0].folder}/${currentModel.id}/${currentPanorama.previewName}`)
  const prevPath = usePrevious(path)

  return (
    <div>
      <VR
        vr={vr}
        setVR={setVR}
        key={path}
        rotate={rotate}
        panorama={path}
        previewPanorama={previewPath}
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
