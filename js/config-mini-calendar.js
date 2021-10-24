import { getTimeNumberFormat, getMonthFormat, getMonthAmount, getMonth } from "./get-data.js"
import { createDOM } from "./utils/dom.js"
import { formatCurrentMonth } from "./utils/format-data.js"

//---// Mini Calendar //---//
//-------------------// Variables iniciales DOM //-------------------//

const $sideBar = document.querySelector(".sideBar")//---// DOM Side Bar //---//
const $miniCalendar = $sideBar.querySelector(".days") //---// DOM Container Dias Calendario //---//
//---// la variables "monthCurrent" nos permitira ejecutar consulta y
//visualizacion del mes deseado con datos formateados //---//
let monthCurrent = getMonth()


//-------------------// Configuracion MIni Calendar //-------------------//
export function configMiniCalendar($sideBar) {

  //---// numero dias del mes actual//---//
  const monthAmount = getMonthAmount(monthCurrent)

  //---// Mostramos Mes Mini Calendar //---//
  setMonthCalendar()

  //---// Calendario + Dias del Mes Anterior + Dias del Mes Siguiente //---//

  const calendarAmount = formatCurrentMonth(monthCurrent, monthAmount) //---//Almacena los dias segun mes

  //---// Agrega Dias al Mini Calendar //---//

  setDaysDom(calendarAmount, $miniCalendar)

  //---// Agrega estilo a NO dias del mes actual //---//

  setDayStyle($miniCalendar, calendarAmount, monthAmount)

}


//---// Render Date Mini Calendar //---//
eventSetMonth($sideBar, $miniCalendar)
function eventSetMonth($sideBar, $miniCalendar) {
  const $buttonShowMonthPrev = $sideBar.querySelector(".buttonPrevious")
  const $buttonShowMonthFoll = $sideBar.querySelector(".buttonFollowing")

  $buttonShowMonthPrev.addEventListener("click", showMonthPrev)
  $buttonShowMonthFoll.addEventListener("click", showMonthFoll)

  function showMonthPrev() {
    monthCurrent--
    $miniCalendar.innerHTML = ""
    configMiniCalendar()
  }
  function showMonthFoll() {
    monthCurrent++
    $miniCalendar.innerHTML = ""
    configMiniCalendar()
  }
}
//---// Mostramos Mes Mini Calendar //---//
function setMonthCalendar() {
  const $monthTime = $sideBar.querySelector("time")

  $monthTime.setAttribute("datatime", getTimeNumberFormat())
  $monthTime.querySelector("h2").textContent = getMonthFormat(monthCurrent)
}

//---// Agrega Dias al Mini Calendar //---//

function setDaysDom(calendarAmount, $miniCalendar) {

  calendarAmount.forEach(element => {
    $miniCalendar.append(createDOM(`
      <a href="#" class="dayMini-calendar">${element}</a>
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