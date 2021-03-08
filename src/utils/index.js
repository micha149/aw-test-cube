export const PRODUCTION_ASSETS = 'https://aw-test-cube-assets.s3.eu-west-2.amazonaws.com'
export const DEVELOP_ASSETS = 'https://aw-test-cube-assets.s3.eu-west-2.amazonaws.com'

export const ASSETS_FOLDER = process.env.REACT_APP_ENVIRONMENT === 'production' ? PRODUCTION_ASSETS: DEVELOP_ASSETS;

export const isMobile = () => {
  return window.visualViewport.width < 811;
}

export const mobileClass = (string = "") => {
  return `${string}${isMobile() ? " mobile" : ""}`.trim()
}

export const Util = {

}