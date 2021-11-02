import showDateHeader from "./header.js"
import showSideBar from "./side-bar.js"
import showCalendarWeek from "./calendar-week.js"
import setGridTime from "./calendar-time-week.js"
import setTask from "./calendar-task.js"

const $selectShowGrid = document.querySelector("#selectTime")
const $containerCalendar = document.querySelector(".calendarWeek")
const $containerDays = $containerCalendar.querySelector(".containerDays")
const $containerGrid = $containerCalendar.querySelector(".containerTime")

$selectShowGrid.addEventListener("change", loaderGrid)

showDateHeader()
showSideBar()
showCalendarWeek()
setGridTime()
setTask()

function loaderGrid(){
  switch ($selectShowGrid.selectedOptions[0].value) {
    case "dia":
      $containerDays.innerHTML = ""
      $containerGrid.innerHTML = ""
      showCalendarWeek("dia")

      break;
    case "mes":
      $containerDays.innerHTML = ""
      $containerGrid.innerHTML = ""
      showCalendarWeek("mes")
      break;
    case "año":
      break;
  }
}

