import { getDateDay, getDateMonth, getDateMonthAmount, getDateTimeFormat, getDateTimeNumberFormat, getDateMonthFormat} from "./services/data-time.js"


export function getDay() {
  return getDateDay()
}

export function getMonth() {
  return getDateMonth()
}

export function getMonthAmount(value) {
  return getDateMonthAmount(value)
}

export function getTimeFormat(){
  const configTime = {
    day: "numeric",    //Se establece formato de funcion Intl.DateTimeFormat
    month: "long",
    year: "numeric"
  }
  return getDateTimeFormat(configTime)
}
export function getTimeNumberFormat(){
  const configTime = {
    day: "numeric",    //Se establece formato de funcion Intl.DateTimeFormat
    month: "numeric",
    year: "numeric"
  }
  return getDateTimeNumberFormat(configTime)
}
export function getMonthFormat(monthCurrent){
  const configTime = {
    day: "numeric",    //Se establece formato de funcion Intl.DateTimeFormat
    month: "long",
    year: "numeric"
  }
  return getDateMonthFormat(configTime, monthCurrent)
}