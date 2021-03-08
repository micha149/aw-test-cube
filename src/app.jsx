import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { LoadingPage, VRPage } from './pages'
const whyDidYouRender = require('@welldone-software/why-did-you-render')
whyDidYouRender(React, { trackAllPureComponents: false, logOnDifferentValues: true })

const CustomRoute = (props) => {
  return <Route {...props} />
}
const App = () => (
  <Router>
    <React.Suspense fallback={<LoadingPage redirect={false} />}>
      <Switch>
        <CustomRoute exact component={VRPage} path="/vr/:model/:pano" useChat={true} />
        <CustomRoute exact component={LoadingPage} path="/" />
      </Switch>
    </React.Suspense>
  </Router>
)
export default React.memo(App)
