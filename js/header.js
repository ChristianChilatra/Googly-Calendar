import { getConfigDate, getDateTimeFormat, getDateTimeNumberFormat } from "./services/data-time.js"

//dia Mes año//      //año/mes/dia//

const $header = document.querySelector("header")

export default function showDateHeader(currentMonth) {

  const $markerTime = $header.querySelector("time")

  const data = getConfigDate(currentMonth)

  $markerTime.setAttribute("datatime", getDateTimeNumberFormat(data))
  $markerTime.querySelector("h2").textContent = getDateTimeFormat(data)

}
