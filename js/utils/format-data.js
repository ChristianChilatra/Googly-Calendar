import {getMonthAmount } from "../get-data.js"


export function formatCurrentMonth(monthCurrent, monthAmount){
  const calendarAmount = []

  for (let index = 1; index <= monthAmount; index++) { //---// Agrega Dias del Mes Actual //---//
    calendarAmount.push(index)
  }

  let numberLast = getMonthAmount(monthCurrent - 1)
  let numberNext = 1

  while (calendarAmount.length < 42) { //---// Agrega al array los dias del mes anterior
    if (calendarAmount.length < 42) {
      calendarAmount.push(numberNext)
      numberNext++
    } else { break }
    if (calendarAmount.length < 42) {       // + dias del sigueinte mes //---//
      calendarAmount.unshift(numberLast)
      numberLast--
    } else { break }
  }
  return calendarAmount
}
export function formatCurrentWeek(currentMonthDays){

  const newArray = []
  let arrayTemp = []

  currentMonthDays.forEach((element)=>{
    arrayTemp.push(element)
    if (arrayTemp.length > 6){
      newArray.push(arrayTemp)
      arrayTemp = []
    }
  })

  return newArray

}

export function formatCurrentWeekJust(weekDays, monthAmount){

  let newArrayWeekDays = weekDays

  const numberIteratorInitial = newArrayWeekDays[0].indexOf(1)
  const numberIteratorFinish = newArrayWeekDays[newArrayWeekDays.length - 1].indexOf(monthAmount)


  for (let index = 0; index < numberIteratorInitial; index++) {
    newArrayWeekDays[0].shift()
  }

  for (let index = newArrayWeekDays[newArrayWeekDays.length - 1].length - 1; index > numberIteratorFinish; index--) {
    newArrayWeekDays[newArrayWeekDays.length - 1].pop()
  }

  return newArrayWeekDays
}