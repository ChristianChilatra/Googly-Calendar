import showSideBar from "./side-bar.js"
import { showCalendarDay } from "./calendar-day.js"
import { showCalendarWeek } from "./calendar-week.js"
import { getDefaultData, getConfigDate, getAmounthMonth, getDateTimeNumberFormat } from "./services/data-time.js";
import { setGridTimeWeek, setGridTimeDay } from "./calendar-time.js"
import { configMiniCalendar } from "./config-mini-calendar.js";

const $selectShowGrid = document.querySelector("#selectTime")//SELECCION GRID (DIA / SEMANA)
const $containerCalendar = document.querySelector(".calendarWeek")//CONTENEDOR PRINCIPAL CALENDARIO
const $containerDays = $containerCalendar.querySelector(".containerDays")//CONTENEDOR GRID DE DIAS
const $containerGrid = $containerCalendar.querySelector(".containerTime")//CONTENEDOR GRID DEL TIEMPO
const $evenButtonLastWeek = document.querySelector(".buttonPrevious")//CONTENEDOR BOTON "ANTERIOR"
const $evenButtonNextWeek = document.querySelector(".buttonFollowing")//CONTENEDOR BOTON "SIGUIENTE"
const $buttonCurrentDay = document.querySelector(".buttonCalendar")//CONTENEDOR BOTON "HOY"
const $sideBar = document.querySelector(".sideBar")//CONTENEDOR SIDEBAR
const $miniCalendar = $sideBar.querySelector(".days")//CONTENEDOR MINI CALENDAR
const $daysMiniCalendar = ($miniCalendar.children)//NODELIST DIAS DEL MES MINI CALENDAR
const $buttonShowMonthPrev = $sideBar.querySelector(".buttonPrevious")//CONTENEDOR BOTON "ANTERIOR" MINI CALENDAR
const $buttonShowMonthFoll = $sideBar.querySelector(".buttonFollowing")//CONTENEDOR BOTON "SIGUIENTE" MINI CALENDAR


const data = getDefaultData()//OBJETO DATA
let currentMonth = getConfigDate(data.getMonth()).getMonth() //MES ACTUAL
let amounthMonth = getAmounthMonth(currentMonth) //DIAS DEL MES ACTUAL
let currentDay = parseInt(getDateTimeNumberFormat().split("-")[2]) //NUMERO DE DIA ACTUAL
const $weekDays = document.querySelector(".containerDays") //CONTENEDOR DE DIAS DE LA SEMANA


showSideBar()
configMiniCalendar(currentDay, currentMonth)
loaderEventListenerMiniCalendar(currentMonth)
loaderEventListenerDay()
showCalendarDay(data, currentMonth, currentDay, $containerDays)
setGridTimeDay()

//CARGAMOS LOS EVENTOS DE ANTERIOR Y SIGUIENTE DIA PARA GRID "DIA"
function loaderEventListenerDay() {
  $evenButtonLastWeek.addEventListener('click', showDayLast)
  $evenButtonNextWeek.addEventListener('click', showDayNext)
  $buttonCurrentDay.addEventListener("click", showCurrentDay)
}
//CARGAMOS LOS EVENTOS DE ANTERIOR Y SIGUIENTE SEMANA PARA GRID "SEMANA"
function loaderEventListenerWeek() {
  $evenButtonLastWeek.addEventListener('click', showWeekLast)
  $evenButtonNextWeek.addEventListener('click', showWeekNext);
  $buttonCurrentDay.addEventListener("click", showCurrentGrid)
}

//ELIMINAMOS LOS EVENTOS DE ANTERIOR Y SIGUIENTE DIA PARA GRID "DIA" PARA NO GENERAR CONFLITO CON GRID DIFERENTE
function removeEventListenerDay() {
  $evenButtonLastWeek.removeEventListener('click', showDayLast)
  $evenButtonNextWeek.removeEventListener('click', showDayNext);
  $buttonCurrentDay.removeEventListener("click", showCurrentDay)
}

//ELIMINAMOS LOS EVENTOS DE ANTERIOR Y SIGUIENTE DIA PARA GRID "SEAMANA" PARA NO GENERAR CONFLITO CON GRID DIFERENTE
function removeEventListenerWeek() {
  $evenButtonLastWeek.removeEventListener('click', showWeekLast)
  $evenButtonNextWeek.removeEventListener('click', showWeekNext);
  $buttonCurrentDay.removeEventListener("click", showCurrentGrid)
}

//EVENT LISTENER AL CAMBIAR EL "SELECT"
$selectShowGrid.addEventListener("change", loaderGrid)

//EVENT LISTENER AL CAMBIAR MES EN MINI CALENDAR
$buttonShowMonthPrev.addEventListener("click", showMonthPrev)
$buttonShowMonthFoll.addEventListener("click", showMonthFoll)

//EVENT LISTENER AL SELECCIONAR DIA EN MINI CALENDAR
function loaderEventListenerMiniCalendar(currentMonth) {
  Array.from($daysMiniCalendar).forEach((el, index) => {
    el.addEventListener("click", () => {
      if (index < new Date(data.getFullYear(), currentMonth, 1).getDay()) { //OBTENEMOS DIA DE LA SEMANA DONDE INCIA EL MES Y LO ESTABLECEMOS COMO LIMITE DE MES ACTUAL
        currentMonth--
        $miniCalendar.innerHTML = ""
        configMiniCalendar(currentDay, currentMonth)
        loaderEventListenerMiniCalendar(currentMonth)
      } else if (index >= (new Date(data.getFullYear(), currentMonth + 1, 0).getDate() + new Date(data.getFullYear(), currentMonth, 1).getDay())) {
        currentMonth++
        $miniCalendar.innerHTML = ""
        configMiniCalendar(currentDay, currentMonth)
        loaderEventListenerMiniCalendar(currentMonth)
      }

      currentDay = parseInt(el.textContent)

      if ($selectShowGrid.selectedOptions[0].value === "dia") {
        removeEventListenerWeek()
        loaderEventListenerDay()
        $containerDays.innerHTML = ""
        $containerGrid.innerHTML = ""
        showCalendarDay(data, currentMonth, currentDay, $containerDays)
        setGridTimeDay()
        isShowLineHr()
      } else if ($selectShowGrid.selectedOptions[0].value === "mes") {
        removeEventListenerDay()
        loaderEventListenerWeek()
        $containerDays.innerHTML = ""
        $containerGrid.innerHTML = ""
        showCalendarWeek(data, currentMonth, currentDay, $containerDays)
        setGridTimeWeek()
        isShowLineHr()
      }
    })
  })
}

function loaderGrid() {
  switch ($selectShowGrid.selectedOptions[0].value) {
    case "dia":
      removeEventListenerWeek()
      loaderEventListenerDay()
      $containerDays.innerHTML = ""
      $containerGrid.innerHTML = ""
      showCalendarDay(data, currentMonth, currentDay, $containerDays)
      setGridTimeDay()
      isShowLineHr()
      break;
    case "mes":
      removeEventListenerDay()
      loaderEventListenerWeek()
      $containerDays.innerHTML = ""
      $containerGrid.innerHTML = ""
      showCalendarWeek(data, currentMonth, currentDay, $containerDays)
      setGridTimeWeek()
      isShowLineHr()
      break;
    case "año":
      break;
  }
}


function showDayLast() {
  if (Math.sign(currentDay - 1) === 1) {
    currentDay--
    $weekDays.innerHTML = ""
    showCalendarDay(data, currentMonth, currentDay, $containerDays)
  } else {
    currentMonth--
    amounthMonth = getAmounthMonth(currentMonth)
    currentDay = amounthMonth
    $weekDays.innerHTML = ""
    showCalendarDay(data, currentMonth, currentDay, $containerDays)
  }
  isShowLineHr()
}
function showDayNext() {
  if ((currentDay + 1) <= amounthMonth) {
    currentDay++
    $weekDays.innerHTML = ""
    showCalendarDay(data, currentMonth, currentDay, $containerDays)
  } else {
    currentMonth++
    currentDay = 1
    $weekDays.innerHTML = ""
    showCalendarDay(data, currentMonth, currentDay, $containerDays)
  }
  isShowLineHr()
}

function showWeekLast() {
  if (Math.sign(currentDay - 7) === 1) {
    currentDay = currentDay - 7
    $weekDays.innerHTML = ""
    showCalendarWeek(data, currentMonth, currentDay, $containerDays)
  } else {
    currentMonth--
    amounthMonth = getAmounthMonth(currentMonth)
    currentDay = (amounthMonth + (currentDay - 7))
    $weekDays.innerHTML = ""
    showCalendarWeek(data, currentMonth, currentDay, $containerDays)
  }
  isShowLineHr()
}
function showWeekNext() {
  if ((currentDay + 7) <= amounthMonth) {
    currentDay += 7
    $weekDays.innerHTML = ""
    showCalendarWeek(data, currentMonth, currentDay, $containerDays)
  } else {
    amounthMonth = getAmounthMonth(currentMonth)
    currentMonth++
    currentDay = ((currentDay + 7) - amounthMonth)
    $weekDays.innerHTML = ""
    showCalendarWeek(data, currentMonth, currentDay, $containerDays)
  }
  isShowLineHr()
}

function showCurrentDay() {
  currentDay = parseInt(getDateTimeNumberFormat().split("-")[2]) //NUMERO DE DIA ACTUAL
  currentMonth = getConfigDate(data.getMonth()).getMonth()
  amounthMonth = getAmounthMonth(currentMonth)
  $weekDays.innerHTML = ""
  showCalendarDay(data, currentMonth, currentDay, $containerDays)
  $miniCalendar.innerHTML = ""
  configMiniCalendar(currentDay, currentMonth)
  loaderEventListenerMiniCalendar(currentMonth)
  isShowLineHr()
}
function showCurrentGrid() {
  currentDay = parseInt(getDateTimeNumberFormat().split("-")[2]) //NUMERO DE DIA ACTUAL
  currentMonth = getConfigDate(data.getMonth()).getMonth()
  amounthMonth = getAmounthMonth(currentMonth)
  $weekDays.innerHTML = ""
  showCalendarWeek(data, currentMonth, currentDay, $containerDays)
  $miniCalendar.innerHTML = ""
  configMiniCalendar(currentDay, currentMonth)
  loaderEventListenerMiniCalendar(currentMonth)
  isShowLineHr()
}

function showMonthPrev() {
  currentMonth--
  $miniCalendar.innerHTML = ""
  configMiniCalendar(currentDay, currentMonth)
  loaderEventListenerMiniCalendar(currentMonth)
}
function showMonthFoll() {
  currentMonth++
  $miniCalendar.innerHTML = ""
  configMiniCalendar(currentDay, currentMonth)
  loaderEventListenerMiniCalendar(currentMonth)
}

function isShowLineHr(){
  //**Se Genera en calendar-time.js */
  const $lineCurrentHour = document.querySelector(".currentHour")//LINEA QUE REPRESENTA HR ACTUAL
  if (currentDay != parseInt(getDateTimeNumberFormat().split("-")[2])) {
    $lineCurrentHour.style.cssText = `visibility: hidden`
  } else if (currentDay === parseInt(getDateTimeNumberFormat().split("-")[2]) && currentMonth === getConfigDate(data.getMonth()).getMonth()){
    $lineCurrentHour.style.cssText = `visibility: visibility`
  }
}