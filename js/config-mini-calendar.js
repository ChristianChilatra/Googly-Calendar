import { getDefaultData, getConfigDate, getAmounthMonth, getDateTimeNumberFormat, getDateMonthFormat} from "./services/data-time.js"
import { createDOM } from "./utils/dom.js"
import { formatCurrentMonth } from "./utils/format-data.js"

//---// Mini Calendar //---//
//-------------------// Variables iniciales DOM //-------------------//

const $sideBar = document.querySelector(".sideBar")//---// DOM Side Bar //---//
const $miniCalendar = $sideBar.querySelector(".days") //---// DOM Container Dias Calendario //---//
//---// la variables "monthCurrent" nos permitira ejecutar consulta y
//visualizacion del mes deseado con datos formateados //---//
// let monthCurrent = getMonth()

//---// Mes actual//---//
let monthCurrent = getDefaultData().getMonth()

//-------------------// Configuracion MIni Calendar //-------------------//
export function configMiniCalendar() {

  //---// Mostramos Mes Mini Calendar //---//
  setMonthCalendar()

  //---// Calendario con Formato 7*6 //---//

  const calendarAmount = formatCurrentMonth(monthCurrent) //---//Almacena los dias segun mes

  //---// Agrega Dias al Mini Calendar //---//

  setDaysDom(calendarAmount, $miniCalendar)

  //---// Agrega estilo a NO dias del mes actual //---//

  setDayStyle($miniCalendar, calendarAmount, getAmounthMonth(monthCurrent))

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

  $monthTime.setAttribute("datatime", getDateTimeNumberFormat(getConfigDate(monthCurrent)))
  $monthTime.querySelector("h2").textContent = getDateMonthFormat(getConfigDate(monthCurrent))
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