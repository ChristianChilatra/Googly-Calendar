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




export function showCalendarWeek() {

  $weekDays.style.cssText = `
  grid-template-columns: 5rem repeat(7, 1fr);
  grid-template-areas: ". DOM LUN MAR MIE JUE VIE SAB";`

  const weekCalendar = formatCurrentMonth(currentMonth)//ARRAY CON DIAS DEL MES + DIAS DEL MES ANTERIOR Y SIGUIENTE
  const calendarWeekFormat = formatCalendarWeek(weekCalendar) //ARRAY CON FORMATO CALENDARIO

  let weekCurrent = searchCurrentDay(calendarWeekFormat)//OBTENEMOS POSICION DEL ARRAY CON FORMATO CALENDARIO SEGUN DIA ACTUAL

  setDaysDom(calendarWeekFormat, $weekDays, weekCurrent)//INSERTAMOS EN DOM DIAS DE LA SEMANA ACTUAL

  positionWeek()//PERMITE NAVEGAR EN FECHAS POR SEMANAS
  returnCurrentDay()

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
export function removeEventListenerWeek() {
  const $evenButtonLastWeek = document.querySelector(".buttonPrevious")
  const $evenButtonNextWeek = document.querySelector(".buttonFollowing")
  const $buttonCurrentWeek = document.querySelector(".buttonCalendar")

  $evenButtonLastWeek.removeEventListener('click', showWeekLast)
  $evenButtonNextWeek.removeEventListener('click', showWeekNext);
  $buttonCurrentWeek.removeEventListener("click", showCurrentWeek)
}

function showWeekLast() {
  if (Math.sign(currentDay - 7) === 1) {
    currentDay = currentDay - 7
    $weekDays.innerHTML = ""
    showCalendarWeek()
  } else {
    currentMonth--
    amounthMonth = getAmounthMonth(currentMonth)
    currentDay = (amounthMonth + (currentDay - 7))
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
    amounthMonth = getAmounthMonth(currentMonth)
    currentMonth++
    currentDay = ((currentDay + 7) - amounthMonth)
    $weekDays.innerHTML = ""
    showCalendarWeek()
  }
}

function returnCurrentDay() {
  const $buttonCurrentWeek = document.querySelector(".buttonCalendar")
  $buttonCurrentWeek.addEventListener("click", showCurrentWeek)
}


function showCurrentWeek() {
  currentDay = parseInt(getDateTimeNumberFormat().split("-")[2]) //NUMERO DE DIA ACTUAL
  currentMonth = getConfigDate(data.getMonth()).getMonth()
  amounthMonth = getAmounthMonth(currentMonth)
  $weekDays.innerHTML = ""
  showCalendarWeek()
}