export const isMobile = () => {
  return window.visualViewport.width < 811;
}

export const mobileClass = (string = "") => {
  return `${string}${isMobile() ? " mobile" : ""}`.trim()
}

export const Util = {

}