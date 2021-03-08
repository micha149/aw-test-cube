/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import { useHistory } from 'react-router'

const LoadingPage = ({ className = "", forceLogoOnly, redirect = true, redirectPath = '/' }) => {
  const history = useHistory()
  const redirectEffect = () => { redirect && setTimeout(() => { history.replace(redirectPath) }, 4500) }
  React.useEffect(redirectEffect, [])

  return (
    <div className={`background-dark absolute vh-100 z-index-20 no-touch ${className}`} style={{width: '100%', maxWidth: '1920px'}}>
      <div className="absolute-center">
      </div>
    </div>
  )
}

export default React.memo(LoadingPage)
