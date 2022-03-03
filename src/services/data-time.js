const date = new Date()

function setFormatTime(configTime, configDate = date) {

  const formatTime = new Intl.DateTimeFormat("es-ES", configTime).format(configDate) //Intl.DateTimeFormat atrapa objeto de fecha formatiando datos
  return formatTime //retorna fecha modificada "Miércoles, 20 de Octubre"
}
// retorna nuevo objeto Date -> Fri Dec 03 2021 23:30:47 GMT-0500 (hora estándar de Colombia)
export function getDefaultData() {
  return new Date()
}
// retorna date() del dia de inicio del mes -> Wed Dec 01 2021 00:00:00 GMT-0500 (hora estándar de Colombia)
export function getConfigDate(value) {
  return new Date(date.getFullYear(), value, 1)
}

//retorna dias del mes -> Value: 0 (Mes Actual), 1 (Mes Siguiente), etc...
export function getAmounthMonth(value) {
  return new Date(date.getFullYear(), value + 1, 0).getDate()
}

export function getDateMonthFormat(configDate) {

  const configTime = {
    day: "numeric",    //Se establece formato de funcion Intl.DateTimeFormat
    month: "long",
    year: "numeric"
  }

  let formatDate = setFormatTime(configTime, configDate).split(" ")
  formatDate.shift()
  formatDate.shift()
  formatDate = formatDate.join(" ")
  formatDate = formatDate.replace(formatDate[0], formatDate[0].toUpperCase())
  return formatDate
}

export function getDateTimeNumberFormat(configDate) {

  const configTime = {
    day: "numeric",    //Se establece formato de funcion Intl.DateTimeFormat
    month: "numeric",
    year: "numeric"
  }

  const formatDate = setFormatTime(configTime, configDate).split("/").reverse()
  return formatDate.join("-")
}
export function getDateTimeFormat(configDate) {

  const configTime = {
    day: "numeric",    //Se establece formato de funcion Intl.DateTimeFormat
    month: "long",
    year: "numeric"
  }

  let formatDate = setFormatTime(configTime, configDate).split(" ")
  formatDate.shift()
  formatDate.shift()
  formatDate = formatDate.join(" ")
  formatDate = formatDate.replace(formatDate[0], formatDate[0].toUpperCase())
  return formatDate
}
