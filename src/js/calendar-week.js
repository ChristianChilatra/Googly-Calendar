import { getConfigDate, getDateTimeNumberFormat } from "../services/data-time.js";
import { formatCurrentMonth, formatCalendarWeek } from "../utils/format-data.js"
import { createDOM } from "../utils/dom.js"
import { weekDaysList } from "../utils/dictionary.js"
import showDateHeader from "./header.js"


export function showCalendarWeek(data, currentMonth, currentDay, $containerDays) {


  $containerDays.style.cssText = `
  grid-template-columns: 5rem repeat(7, 1fr);
  grid-template-areas: ". DOM LUN MAR MIE JUE VIE SAB";`

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

function setDaysDom(data, calendarWeekFormat, $containerDays, weekCurrent, currentDay,  currentMonth) {

  calendarWeekFormat[weekCurrent].forEach((element, index) => {
    $containerDays.append(createDOM(`
      <button class="day" id="day_${index}" style = 'grid-area: ${weekDaysList[index]}'">
          <h3>${weekDaysList[index]}</h3>
          <p>${element}</p>
        </button>
    `))
    if (index === data.getDay() && getConfigDate(data.getMonth()).getMonth() === currentMonth && parseInt(getDateTimeNumberFormat().split("-")[2]) === currentDay) {
      const $currentDayDOM = $containerDays.querySelector(`#day_${index}`)
      $currentDayDOM.querySelector("p").style.background = "var(--blue10)"
      $currentDayDOM.querySelector("p").style.color = "var(--white)"
      $currentDayDOM.querySelector("h3").style.color = "var(--blue10)"
    }
  })
}
