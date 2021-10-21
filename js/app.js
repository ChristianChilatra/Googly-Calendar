const configState = {
  open : true
}

const $buttonSideBar = document.querySelector(".iconSidebar")
const $elementSideBar = document.querySelector(".sideBar")
const $elementCalendar = document.querySelector(".calendar")
const $inlineSizeSideBar = $elementSideBar.getBoundingClientRect().width

console.log($inlineSizeSideBar)
$buttonSideBar.addEventListener("click", showSideBar)



function showSideBar(event) {
  $elementSideBar.style.transition = "inset-inline-start .3s"
  if(configState.open){
    $elementSideBar.style.insetInlineStart = `-${$inlineSizeSideBar}px`
    $elementCalendar.style.insetInlineStart = `${$inlineSizeSideBar}px`
    configState.open = false
  }else{
    $elementSideBar.style.insetInlineStart = `0px`
    $elementCalendar.style.insetInlineStart = `${0}px`
    configState.open = true
  }
}