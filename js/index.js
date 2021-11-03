import showSideBar from "./side-bar.js"
import { showCalendarDay, removeEventListenerDay} from "./calendar-day.js"
import { showCalendarWeek, removeEventListenerWeek} from "./calendar-week.js"
import { setGridTimeWeek, setGridTimeDay} from "./calendar-time.js"
import setTask from "./calendar-task.js"

const $selectShowGrid = document.querySelector("#selectTime")
const $containerCalendar = document.querySelector(".calendarWeek")
const $containerDays = $containerCalendar.querySelector(".containerDays")
const $containerGrid = $containerCalendar.querySelector(".containerTime")


$selectShowGrid.addEventListener("change", loaderGrid)

showSideBar()
showCalendarDay()
setGridTimeDay()
setTask()

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

