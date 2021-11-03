import { getDefaultData, getConfigDate, getAmounthMonth, getDateTimeNumberFormat } from "./services/data-time.js";
import { formatCurrentMonth, formatCalendarWeek } from "./utils/format-data.js"
import { createDOM } from "./utils/dom.js"
import { weekDaysList } from "./utils/dictionary.js"
import showDateHeader from "./header.js"

const data = getDefaultData()//OBJETO DATA
let currentMonth = getConfigDate(data.getMonth()).getMonth() //MES ACTUAL
let amounthMonth = getAmounthMonth(currentMonth) //DIAS DEL MES ACTUAL
let currentDay = parseInt(getDateTimeNumberFormat().split("-")[2]) //NUMERO DE DIA ACTUAL
const $weekDays = document.querySelector(".containerDays") //CONTENEDOR DE DIAS DE LA SEMANA




export function showCalendarDay() {

  $weekDays.style.cssText = `
  grid-template-columns: 5rem auto;
  grid-template-areas: ". DAY";
  justify-content: flex-start;`

  const weekCalendar = formatCurrentMonth(currentMonth)//ARRAY CON DIAS DEL MES + DIAS DEL MES ANTERIOR Y SIGUIENTE
  const calendarWeekFormat = formatCalendarWeek(weekCalendar) //ARRAY CON FORMATO CALENDARIO

  let weekCurrent = searchCurrentDay(calendarWeekFormat)//OBTENEMOS POSICION DEL ARRAY CON FORMATO CALENDARIO SEGUN DIA ACTUAL

  setDaysDom(calendarWeekFormat, $weekDays, weekCurrent)//INSERTAMOS EN DOM DIAS DE LA SEMANA ACTUAL

  positionWeek()//PERMITE NAVEGAR EN FECHAS POR SEMANAS

  showDateHeader(currentMonth)

}

function searchCurrentDay(calendarWeekFormat) {

  let statusSearch = true
  let count = 0

  while (statusSearch) {
    if (count === 0) {
      if (calendarWeekFormat[count].indexOf(currentDay, data.getDay()) != -1) {
        statusSearch = false
      } else {
        count++
      }
    } else if (calendarWeekFormat[count].indexOf(currentDay) != -1) {
      statusSearch = false
    } else {
      count++
    }
  }
  return count
}

function setDaysDom(calendarWeekFormat, $weekDays, weekCurrent) {

  const day = calendarWeekFormat[weekCurrent].indexOf(currentDay)
  $weekDays.append(createDOM(`
      <button class="day" id="day_${day}" style = 'grid-area: DAY'">
          <h3>${weekDaysList[day]}</h3>
          <p>${currentDay}</p>
        </button>
    `))
  if (day === data.getDay() && getConfigDate(data.getMonth()).getMonth() === currentMonth && parseInt(getDateTimeNumberFormat().split("-")[2]) === currentDay) {
    const $currentDayDOM = $weekDays.querySelector(`#day_${day}`)
      $currentDayDOM.querySelector("p").style.background = "var(--blue10)"
      $currentDayDOM.querySelector("p").style.color = "var(--white)"
      $currentDayDOM.querySelector("h3").style.color = "var(--blue10)"
    }
}

function positionWeek() {
  const $evenButtonLastWeek = document.querySelector(".buttonPrevious")
  const $evenButtonNextWeek = document.querySelector(".buttonFollowing")

  $evenButtonLastWeek.addEventListener('click', showWeekLast)
  $evenButtonNextWeek.addEventListener('click', showWeekNext);
}
export function removeEventListenerDay() {
  const $evenButtonLastWeek = document.querySelector(".buttonPrevious")
  const $evenButtonNextWeek = document.querySelector(".buttonFollowing")

  $evenButtonLastWeek.removeEventListener('click', showWeekLast)
  $evenButtonNextWeek.removeEventListener('click', showWeekNext);
}

function showWeekLast() {
  if (Math.sign(currentDay - 1) === 1) {
    currentDay--
    $weekDays.innerHTML = ""
    showCalendarDay()
  } else {
    currentMonth--
    amounthMonth = getAmounthMonth(currentMonth)
    currentDay = amounthMonth
    $weekDays.innerHTML = ""
    showCalendarDay()
  }


}
function showWeekNext() {
  if ((currentDay + 1) <= amounthMonth) {
    currentDay ++
    $weekDays.innerHTML = ""
    showCalendarDay()
  } else {
    currentMonth++
    currentDay = 1
    $weekDays.innerHTML = ""
    showCalendarDay()
  }
}
