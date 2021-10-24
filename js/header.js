import { getTimeFormat    ,   getTimeNumberFormat} from "./get-data.js"
      //dia Mes año//      //año/mes/dia//

const $header = document.querySelector("header")

export default function showDateHeader(){

  const $markerTime = $header.querySelector("time")

  $markerTime.setAttribute("datatime", getTimeNumberFormat())
  $markerTime.querySelector("h2").textContent = getTimeFormat()

}