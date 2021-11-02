import { getDefaultData, getConfigDate, getAmounthMonth, getDateTimeNumberFormat} from "./services/data-time.js";
import { formatCurrentMonth, formatCalendarWeek } from "./utils/format-data.js"
import { createDOM } from "./utils/dom.js"
import { weekDaysList } from "./utils/dictionary.js"

const data = getDefaultData()
let currentMonth = getConfigDate(data.getMonth()).getMonth() //MES ACTUAL
let amounthMonth = getAmounthMonth(currentMonth) //DIAS DEL MES ACTUAL
let currentDay = parseInt(getDateTimeNumberFormat().split("-")[2]) //NUMERO DE DIA ACTUAL
const $weekDays = document.querySelector(".containerDays") //CONTENEDOR DE DIAS DE LA SEMANA




export default function showCalendarWeek() {

  const weekCalendar = formatCurrentMonth(currentMonth)
  const calendarWeekFormat = formatCalendarWeek(weekCalendar) //ARRAY CON FORMATO CALENDARIO

  let weekCurrent = searchCurrentDay(calendarWeekFormat)

  setDaysDom(calendarWeekFormat, $weekDays, weekCurrent)

  positionWeek()

}

function searchCurrentDay(calendarWeekFormat){

  let statusSearch = true
  let count = 0

  while (statusSearch){
    if(count === 0){
      if (calendarWeekFormat[count].indexOf(currentDay, data.getDay()) != -1){
        statusSearch = false
      }else{
        count++
      }
    } else if(calendarWeekFormat[count].indexOf(currentDay) != -1){
      statusSearch = false
    }else {
      count++
    }
  }
  return count
}

function setDaysDom(calendarWeekFormat, $weekDays, weekCurrent) {

  calendarWeekFormat[weekCurrent].forEach((element, index) => {
    $weekDays.append(createDOM(`
      <button class="day" id="day_${index}" style = 'grid-area: ${weekDaysList[index]}'">
          <h3>${weekDaysList[index]}</h3>
          <p>${element}</p>
        </button>
    `))
    if (index === data.getDay() && getConfigDate(data.getMonth()).getMonth() === currentMonth && parseInt(getDateTimeNumberFormat().split("-")[2]) === currentDay) {
      const $currentDayDOM = $weekDays.querySelector(`#day_${index}`)
      $currentDayDOM.querySelector("p").style.background = "var(--blue10)"
      $currentDayDOM.querySelector("p").style.color = "var(--white)"
      $currentDayDOM.querySelector("h3").style.color = "var(--blue10)"
    }
  })
}

function positionWeek() {
  const $evenButtonLastWeek = document.querySelector(".buttonPrevious")
  const $evenButtonNextWeek = document.querySelector(".buttonFollowing")

  $evenButtonLastWeek.addEventListener('click', showWeekLast)
  $evenButtonNextWeek.addEventListener('click', showWeekNext);
}

function showWeekLast() {
  if (Math.sign(currentDay - 7) === 1) {
    currentDay = currentDay - 7
    $weekDays.innerHTML = ""
    showCalendarWeek()
  }else{
    currentMonth--
    getAmounthMonth(currentMonth)
    currentDay = 30
    $weekDays.innerHTML = ""
    showCalendarWeek()
  }


}
function showWeekNext() {
  if ((currentDay + 7) <= amounthMonth) {
    currentDay += 7
    $weekDays.innerHTML = ""
    showCalendarWeek()
  } else {
    currentMonth++
    getAmounthMonth(currentMonth)
    currentDay = 1
    $weekDays.innerHTML = ""
    showCalendarWeek()
  }
}
