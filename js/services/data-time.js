

const date = new Date()

const configTime = {
  day: "numeric",    //Se establece formato de funcion Intl.DateTimeFormat
  month: "long",
  year: "numeric"
}

export function setFormatTime() {

  const formatTime = new Intl.DateTimeFormat("es-ES", configTime).format(date) //Intl.DateTimeFormat atrapa objeto de fecha formatiando datos
  return formatTime //retorna fecha modificada "Miércoles, 20 de Octubre"
}


export function getDateMonth(){
  return date.getDate()
}
export function getDateDay(){
  return date.getDay()
}
export function getDateTime(){
  const formatDate = setFormatTime().split("de")
  return formatDate.join("")
}
export function getDateTimeNumber(){

  configTime.month = "numeric"

  const formatDate = setFormatTime().split("/").reverse()

  configTime.month = "long"

  return formatDate.join("-")
}