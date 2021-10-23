import { getTimeNumberFormat, getMonthFormat, getMonthAmount, getMonth } from "./get-data.js"
import { createDOM } from "./utils/dom.js"

//-------------------// Mini Calendar //-------------------//


const $sideBar = document.querySelector(".sideBar")
const $miniCalendar = $sideBar.querySelector(".days") //---// Dias Mini Calendario //---//

let monthCurrent = getMonth() //---// mes actual //---//

export function configSideBar() {

  const monthAmount = getMonthAmount(monthCurrent) //---// numero dias del mes actual//---//

  //-------------------// Mes Mini Calendar //-------------------//

  setMonthCalendar()

  //-------------------// Calendario + Dias del Mes Anterior + Dias del Mes Siguiente //-------------------//

  const calendarAmount = setDaysCalendar(monthAmount) //---//Almacena los dias segun mes
  console.log(calendarAmount)

  //-------------------// Agrega Dias al Mini Calendar //-------------------//

  setDaysDom(calendarAmount, $miniCalendar)

  //-------------------// Agrega estilo a NO dias del mes actual //-------------------//

  setDayStyle($miniCalendar, calendarAmount, monthAmount)

}



//-------------------// Render Date Mini Calendar //-------------------//
eventSetMonth($sideBar, $miniCalendar)
function eventSetMonth($sideBar, $miniCalendar) {
  const $buttonShowMonthPrev = $sideBar.querySelector(".buttonPrevious")
  const $buttonShowMonthFoll = $sideBar.querySelector(".buttonFollowing")

  $buttonShowMonthPrev.addEventListener("click", showMonthPrev)
  $buttonShowMonthFoll.addEventListener("click", showMonthFoll)

  function showMonthPrev() {
    monthCurrent--
    console.log(monthCurrent)
    $miniCalendar.innerHTML = ""
    configSideBar()
  }
  function showMonthFoll() {
    monthCurrent++
    console.log(monthCurrent)
    $miniCalendar.innerHTML = ""
    configSideBar()
  }
}

function setMonthCalendar() {
  const $monthTime = $sideBar.querySelector("time")

  $monthTime.setAttribute("datatime", getTimeNumberFormat())
  $monthTime.querySelector("h2").textContent = getMonthFormat(monthCurrent)
}

function setDaysCalendar(monthAmount) {

  const calendarAmount = []

  for (let index = 1; index < monthAmount + 1; index++) { //---// Agrega Dias del Mes Actual //---//
    calendarAmount.push(index)
  }

  let numberLast = getMonthAmount(monthCurrent - 1)
  let numberNext = 1

  while (calendarAmount.length < 42) { //---// Agrega al array los dias del mes anterior
    if (calendarAmount.length < 42) {       // + dias del sigueinte mes //---//
      calendarAmount.unshift(numberLast)
      numberLast--
    } else { break }
    if (calendarAmount.length < 42) {
      calendarAmount.push(numberNext)
      numberNext++
    } else { break }
  }

  return calendarAmount
}
function setDaysDom(calendarAmount, $miniCalendar) {

  calendarAmount.forEach(element => {
    $miniCalendar.append(createDOM(`
      <a href="#" class="dayMini-calendar">${element}</a>
    `))
  })
}
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