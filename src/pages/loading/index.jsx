/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import { useHistory } from 'react-router'

const LoadingPage = ({ className = "", forceLogoOnly, redirect = true, redirectPath = '/' }) => {
  const history = useHistory()
  const redirectEffect = () => { redirect && setTimeout(() => { history.replace(redirectPath) }, 4500) }
  React.useEffect(redirectEffect, [])

  return (
    <div className={`loading-page relative vh-100 d-flex justify-content-center align-items-center z-index-20 no-touch ${className}`} style={{width: '100%', maxWidth: '1920px'}}>
      <div className="absolute-center">
        Loading
      </div>
    </div>
  )
}

export default React.memo(LoadingPage)
