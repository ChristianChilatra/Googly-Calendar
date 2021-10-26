import { getDay, getMonth, getTimeNumberFormat, getMonthAmount } from "./get-data.js";
import { formatCurrentMonth, formatCurrentWeek, formatCurrentWeekJust } from "./utils/format-data.js"
import { createDOM } from "./utils/dom.js"
import {weekDaysList} from "./utils/dictionary.js"

let monthCurrent = getMonth()
let currentDay = parseInt(getTimeNumberFormat().split("-")[2])
const monthAmount = getMonthAmount(monthCurrent)
const $weekDays = document.querySelector(".containerDays")

showWeekDiff()

export default function showCalendarWeek() {

  const monthDays = formatCurrentMonth(monthCurrent, monthAmount)
  const weekDays = formatCurrentWeek(monthDays)
  let weekCurrent = 0

  const newArrayWeekDays = formatCurrentWeekJust(weekDays, monthAmount)

  newArrayWeekDays.forEach((element, index) => {
    if (element === 0){
      if (element.indexOf(currentDay, 5) != -1) {
        weekCurrent = index
      }
    } else{
      if (element.indexOf(currentDay) != -1) {
        weekCurrent = index
      }
    }
  })

  setDaysDom(weekDays, $weekDays, weekCurrent, currentDay)

}

function setDaysDom(weekDays, $weekDays, weekCurrent, currentDay) {

  weekDays[weekCurrent].forEach((element, index)=> {
    $weekDays.append(createDOM(`
      <button class="day" id="day_${index}" style = 'grid-area: ${weekDaysList[index]}'">
          <h3>${weekDaysList[index]}</h3>
          <p>${element}</p>
        </button>
    `))
    if (index === getDay() && currentDay === parseInt(getTimeNumberFormat().split("-")[2])){
      const $currentDayDOM = $weekDays.querySelector(`#day_${index}`)
      $currentDayDOM.querySelector("p").style.background = "var(--blue10)"
      $currentDayDOM.querySelector("p").style.color = "var(--white)"
      $currentDayDOM.querySelector("h3").style.color = "var(--blue10)"
    }
  })
}

function showWeekDiff(){
  const $evenButtonLastWeek = document.querySelector(".buttonPrevious")
  const $evenButtonNextWeek = document.querySelector(".buttonFollowing")

  $evenButtonLastWeek.addEventListener('click',showWeekLast)
  $evenButtonNextWeek.addEventListener('click', showWeekNext);
}

function showWeekLast(){
  if (Math.sign(currentDay - 7) === 1 ){
    currentDay = currentDay - 7
    $weekDays.innerHTML = ""
    showCalendarWeek()
  }

}
function showWeekNext(){
  if ((currentDay + 7) <= monthAmount) {
    currentDay += 7
    $weekDays.innerHTML = ""
    showCalendarWeek()
  }

}
