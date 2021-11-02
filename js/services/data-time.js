const date = new Date()

function setFormatTime(configTime, configDate = date) {

  const formatTime = new Intl.DateTimeFormat("es-ES", configTime).format(configDate) //Intl.DateTimeFormat atrapa objeto de fecha formatiando datos
  return formatTime //retorna fecha modificada "Miércoles, 20 de Octubre"
}

export function getDefaultData() {
  return new Date()
}
export function getConfigDate(value) {
  return new Date(date.getFullYear(), value, 1)
}

export function getAmounthMonth(value) {
  return new Date(date.getFullYear(), value + 1, 0).getDate()
}

export function getDateMonthFormat(data) {

  const configTime = {
    day: "numeric",    //Se establece formato de funcion Intl.DateTimeFormat
    month: "long",
    year: "numeric"
  }

  let formatDate = setFormatTime(configTime, data).split(" ")
  formatDate.shift()
  formatDate.shift()
  formatDate = formatDate.join(" ")
  formatDate = formatDate.replace(formatDate[0], formatDate[0].toUpperCase())
  return formatDate
}

export function getDateTimeNumberFormat(data) {

  const configTime = {
    day: "numeric",    //Se establece formato de funcion Intl.DateTimeFormat
    month: "numeric",
    year: "numeric"
  }

  const formatDate = setFormatTime(configTime, data).split("/").reverse()
  return formatDate.join("-")
}
export function getDateTimeFormat() {

  const configTime = {
    day: "numeric",    //Se establece formato de funcion Intl.DateTimeFormat
    month: "long",
    year: "numeric"
  }

  let formatDate = setFormatTime(configTime).split(" ")
  formatDate.shift()
  formatDate.shift()
  formatDate = formatDate.join(" ")
  formatDate = formatDate.replace(formatDate[0], formatDate[0].toUpperCase())
  return formatDate
}


// export function getDateTimeZone() {
//   return date.getTimezoneOffset() / 60
// }
// export function getDateDay() {

//   return date.getDay()
// }
// export function getDateMonth() {
//   return date.getMonth()
// }
// export function getDateMonthAmount(value) {
//   const newDate = new Date(date.getFullYear(), value + 1, 0).getDate()
//   return newDate
// }
// export function getDateMonthFormat(configTime, monthCurrent) {
//   const newDate = new Date()
//   newDate.setMonth(monthCurrent)
//   let formatDate = setFormatTime(configTime, newDate).split(" ")
//   formatDate.shift()
//   formatDate.shift()
//   formatDate = formatDate.join(" ")
//   formatDate = formatDate.replace(formatDate[0], formatDate[0].toUpperCase())

//   return formatDate
// }
// export function getDateTimeFormat(configTime) {
//   let formatDate = setFormatTime(configTime).split(" ")
//   formatDate.shift()
//   formatDate.shift()
//   formatDate = formatDate.join(" ")
//   formatDate = formatDate.replace(formatDate[0], formatDate[0].toUpperCase())
//   return formatDate
// }