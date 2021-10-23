

const date = new Date()

function setFormatTime(configTime, configDate = date) {

  const formatTime = new Intl.DateTimeFormat("es-ES", configTime).format(configDate) //Intl.DateTimeFormat atrapa objeto de fecha formatiando datos
  return formatTime //retorna fecha modificada "Miércoles, 20 de Octubre"
}


export function getDateMonth(){
  return date.getMonth()
}
export function getDateMonthAmount(value){
  const newDate = new Date(date.getFullYear(),value + 1,0).getDate()
  return newDate
}
export function getDateMonthFormat(configTime, monthCurrent){
  const newDate = new Date()
  newDate.setMonth(monthCurrent)
  let formatDate = setFormatTime(configTime, newDate).split(" ")[2]
  formatDate = formatDate.replace(formatDate[0],formatDate[0].toUpperCase())
  return formatDate
}
export function getDateDay(){
  return date.getDay()
}
export function getDateTimeFormat(configTime){
  const formatDate = setFormatTime(configTime).split("de")
  return formatDate.join("")
}
export function getDateTimeNumberFormat(configTime){
  const formatDate = setFormatTime(configTime).split("/").reverse()
  return formatDate.join("-")
}