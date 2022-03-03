import {  getConfigDate, getDateTimeNumberFormat } from "../services/data-time.js";
import { formatCurrentMonth, formatCalendarWeek } from "../utils/format-data.js"
import { createDOM } from "../utils/dom.js"
import { weekDaysList } from "../utils/dictionary.js"
import showDateHeader from "./header.js"


export function showCalendarDay(data, currentMonth, currentDay, $containerDays) {

  $containerDays.style.cssText = `
  grid-template-columns: 5rem auto;
  grid-template-areas: ". DAY";
  justify-content: flex-start;`

  const weekCalendar = formatCurrentMonth(currentMonth)//ARRAY CON DIAS DEL MES + DIAS DEL MES ANTERIOR Y SIGUIENTE
  const calendarWeekFormat = formatCalendarWeek(weekCalendar) //ARRAY CON FORMATO CALENDARIO

  let weekCurrent = searchCurrentDay(data, calendarWeekFormat, currentDay)//OBTENEMOS POSICION DEL ARRAY CON FORMATO CALENDARIO SEGUN DIA ACTUAL

  setDaysDom(data, calendarWeekFormat, $containerDays, weekCurrent, currentDay, currentMonth)//INSERTAMOS EN DOM DIAS DE LA SEMANA ACTUAL


  showDateHeader(currentMonth)
}

function searchCurrentDay(data, calendarWeekFormat, currentDay) {

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

function setDaysDom(data, calendarWeekFormat, $weekDays, weekCurrent, currentDay, currentMonth) {

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

