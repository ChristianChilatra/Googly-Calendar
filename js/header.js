import { getDateTimeFormat, getDateTimeNumberFormat} from "./services/data-time.js"
      //dia Mes año//      //año/mes/dia//

const $header = document.querySelector("header")

export default function showDateHeader(){

  const $markerTime = $header.querySelector("time")

  $markerTime.setAttribute("datatime", getDateTimeNumberFormat())
  $markerTime.querySelector("h2").textContent = getDateTimeFormat()

}