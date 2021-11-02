import { getConfigDate, getAmounthMonth } from "../services/data-time.js"


export function formatCurrentMonth(month) {

  const lastMonth = []
  const currentMonth = []
  const nextMonth = []

  const date = getConfigDate(month)
  const firstDay = date.getDay();
  const amounthMonthCurrent = getAmounthMonth(month);
  //-------------------------------------------------------------------------------------//
  //------------------------------//Creacion Array de MES//------------------------------//
  //-------------------------------------------------------------------------------------//

  //Obtenemos Array con dias del mes Anterior
  for (let index = 0; index < getAmounthMonth(date.getMonth()-1); index++) {
    lastMonth.push(index + 1)
  }
  //Obtenemos Array con dias del mes Actual
  for (let index = 0; index < amounthMonthCurrent; index++) {

    currentMonth.push(index + 1)
  }
  //Obtenemos Array con dias del mes Siguiente
  for (let index = 0; index < getAmounthMonth(date.getMonth() +1); index++) {
    nextMonth.push(index + 1)
  }

  //-------------------------------------------------------------------------------------//
  //--------------/*Calendario + Dias Mes Anterior + Dias Mes Siguiente*/----------------//
  //-------------------------------------------------------------------------------------//

  const calendarWeek = []

  let count = lastMonth.length - 1

  calendarWeek.push(...currentMonth)

  for (let index = 0; index < firstDay; index++) {
    calendarWeek.unshift(lastMonth[count])
    count--
  }

  for (let index = 0; calendarWeek.length < 42; index++) {
    calendarWeek.push(nextMonth[index])
  }

  return calendarWeek
}

export function formatCalendarWeek(calendarWeek){
  //-------------------------------------------------------------------------------------//
  //--------------------------//Calendario con Formato 7*6//-----------------------------//
  //-------------------------------------------------------------------------------------//

  const formatCalendarWeek = []
  let arrayUtil = []

  calendarWeek.forEach((element, index) => {
    if (((index + 1) % 7) === 0) {
      arrayUtil.push(element)
      formatCalendarWeek.push(arrayUtil)
      arrayUtil = []
    } else {
      arrayUtil.push(element)
    }
  })
  return formatCalendarWeek
}
