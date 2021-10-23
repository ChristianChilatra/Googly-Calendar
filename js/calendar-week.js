

const $sideBar = document.querySelector(".sideBar")
const $widthSideBar = $sideBar.getBoundingClientRect().width
const $calendarWeek = document.querySelector(".calendarWeek")


export default function showCalendarWeek(){
  $calendarWeek.style.inlineSize = `calc(100% - ${$widthSideBar}px)`
}