import { getDefaultData, getConfigDate, getAmounthMonth, getDateTimeNumberFormat, getDateMonthFormat} from "./services/data-time.js"
import { createDOM } from "./utils/dom.js"
import { formatCurrentMonth } from "./utils/format-data.js"

//---// Mini Calendar //---//
//-------------------// Variables iniciales DOM //-------------------//

const $sideBar = document.querySelector(".sideBar")//---// DOM Side Bar //---//
const $miniCalendar = $sideBar.querySelector(".days") //---// DOM Container Dias Calendario //---//
//---// la variables "currentMonth" nos permitira ejecutar consulta y
//visualizacion del mes deseado con datos formateados //---//

//-------------------// Configuracion MIni Calendar //-------------------//
export function configMiniCalendar(currentDay, currentMonth) {

  //---// Mostramos Mes Mini Calendar //---//
  setMonthCalendar(currentMonth)
  //---// Calendario con Formato 7*6 //---//
  const calendarAmount = formatCurrentMonth(currentMonth) //---//Almacena los dias segun mes
  //---// Agrega Dias al Mini Calendar //---//
  setDaysDom(calendarAmount, $miniCalendar)
  //---// Agrega estilo a NO dias del mes actual //---//
  setDayStyle($miniCalendar, calendarAmount, getAmounthMonth(currentMonth))
  setStyleCurrentDay(currentDay,currentMonth)
}

//---// Mostramos Mes Mini Calendar //---//
function setMonthCalendar(currentMonth) {
  const $monthTime = $sideBar.querySelector("time")

  $monthTime.setAttribute("datatime", getDateTimeNumberFormat(getConfigDate(currentMonth)))
  $monthTime.querySelector("h2").textContent = getDateMonthFormat(getConfigDate(currentMonth))
}

//---// Agrega Dias al Mini Calendar //---//
function setDaysDom(calendarAmount, $miniCalendar) {
  calendarAmount.forEach(element => {
    $miniCalendar.append(createDOM(`
      <a class="dayMini-calendar">${element}</a>
    `))
  })
}

//---// Agrega estilo a NO dias del mes actual //---//
function setDayStyle($miniCalendar, calendarAmount, monthAmount) {
  const $daysMiniCalendar = $miniCalendar.querySelectorAll(".dayMini-calendar")

  $daysMiniCalendar.forEach(($element, index) => {
    if (index < calendarAmount.indexOf(1)) {
      $element.style.color = "var(--gray20)"
    }
    if (index > calendarAmount.lastIndexOf(monthAmount)) {
      $element.style.color = "var(--gray20)"
    }
  })
}

//---// Agrega estilo al dia actual //---//
function setStyleCurrentDay(currentDay, currentMonth){
  const $daysMiniCalendar = $miniCalendar.querySelectorAll(".dayMini-calendar")
  const elementInitial = new Date(getDefaultData().getFullYear(), getDefaultData().getMonth(),1)
  const elementFinal = new Date(getDefaultData().getFullYear(), getDefaultData().getMonth()+1,0)

  for (let index = elementInitial.getDay(); index < elementFinal.getDate(); index++) {
    if (parseInt($daysMiniCalendar[index].textContent) === currentDay && currentMonth === getDefaultData().getMonth()){
      $daysMiniCalendar[index].style.background = "var(--blue10)"
      $daysMiniCalendar[index].style.color = "var(--white)"
    }
  }
}