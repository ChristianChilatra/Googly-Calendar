import {configMyCalendar} from "./config-my-calendar.js";

const statusSideBar = {
  open: false
}

//----------//Estado Inicial y SideBar Dropdown//----------//

const $buttonSideBar = document.querySelector(".iconSidebar")
const $sideBar = document.querySelector(".sideBar")
const $header = document.querySelector("header")
const widthSideBar = 16
const $buttonPlus = document.querySelector(".buttonCalendar.isPlus")

export default function showSideBar(){


  statusSideBar.open ? open(widthSideBar) : close(0)


  $buttonSideBar.addEventListener("click", widthSidebar)
  setBlockSize()
  configMyCalendar()

  function widthSidebar(){
    if (statusSideBar.open){
      close(0)
    }else{
      open(widthSideBar)
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
    console.log(value);
    $sideBar.style.inlineSize = `${value}rem`
  }

  function setBlockSize(){
    const $blockSizeheader = $header.getBoundingClientRect().height
    blockSizeSideBar($blockSizeheader)
  }

  function visualButtomOpen(){
    $buttonPlus.style.cssText = `border-radius: $buttonPlusStyle.borderRadius; inline-size: $buttonPlusStyle.inlineSize`
    $buttonPlus.querySelector("p").style.display = "block"
  }
  function visualButtomClose(){
    $buttonPlus.style.cssText = "border-radius: 50%; inline-size: 2rem; "
    $buttonPlus.querySelector("p").style.display = "none"
  }
  function blockSizeSideBar(value){
    $sideBar.style.blockSize = `${window.innerHeight - value}px`
  }
  window.addEventListener("resize", () => {
    setBlockSize()
  });
}