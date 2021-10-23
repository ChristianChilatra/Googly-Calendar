import {configSideBar} from "./configSideBar.js";

const statusSideBar = {
  open: true
}

const $buttonSideBar = document.querySelector(".iconSidebar")
const $sideBar = document.querySelector(".sideBar")
const $widthSideBar = $sideBar.getBoundingClientRect().width
const $buttonPlus = document.querySelector(".buttonCalendar.isPlus")

export default function showSideBar(){

  statusSideBar.open ? open($widthSideBar) : close(0)


  $buttonSideBar.addEventListener("click", widthSidebar)

  configSideBar()

  function widthSidebar(){
    if (statusSideBar.open){
      close(0)
    }else{
      open($widthSideBar)
    }
  }

  function open(value){
    statusSideBar.open = true
    setInlineSize(value)
    visualButtomOpen()
  }
  function close(value){
    statusSideBar.open = false
    setInlineSize(value)
    visualButtomClose()
  }

  function setInlineSize(value){
    $sideBar.style.inlineSize = `${value}px`
  }

  function visualButtomOpen(){
    $buttonPlus.style.cssText = `border-radius: $buttonPlusStyle.borderRadius; inline-size: $buttonPlusStyle.inlineSize`
    $buttonPlus.querySelector("p").style.display = "block"
  }
  function visualButtomClose(){
    $buttonPlus.style.cssText = "border-radius: 50%; inline-size: 2rem"
    $buttonPlus.querySelector("p").style.display = "none"
  }
}