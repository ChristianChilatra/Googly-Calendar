import { getConfigDate, getDateTimeFormat, getDateTimeNumberFormat } from "./services/data-time.js"
import { showCalendarDay, removeEventListenerDay} from "./calendar-day.js"
import { showCalendarWeek, removeEventListenerWeek} from "./calendar-week.js"
import { setGridTimeWeek, setGridTimeDay} from "./calendar-time.js"

import setTask from "./calendar-task.js"
//dia Mes año//      //año/mes/dia//

const $selectShowGrid = document.querySelector("#selectTime")
const $containerCalendar = document.querySelector(".calendarWeek")
const $containerDays = $containerCalendar.querySelector(".containerDays")
const $containerGrid = $containerCalendar.querySelector(".containerTime")

const $header = document.querySelector("header")

export default function showDateHeader(currentMonth) {

  const $markerTime = $header.querySelector("time")

  const data = getConfigDate(currentMonth)

  $markerTime.setAttribute("datatime", getDateTimeNumberFormat(data))
  $markerTime.querySelector("h2").textContent = getDateTimeFormat(data)

}

$selectShowGrid.addEventListener("change", loaderGrid)


function loaderGrid(){
  switch ($selectShowGrid.selectedOptions[0].value) {
    case "dia":
      removeEventListenerDay()
      $containerDays.innerHTML = ""
      $containerGrid.innerHTML = ""
      showCalendarDay()
      setGridTimeDay()
      setTask()
      break;
    case "mes":
      removeEventListenerWeek()      
      $containerDays.innerHTML = ""
      $containerGrid.innerHTML = ""
      showCalendarWeek()
      setGridTimeWeek()
      setTask()
      break;
    case "año":
      break;
  }
}