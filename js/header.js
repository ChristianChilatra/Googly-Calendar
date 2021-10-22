import {setDatTime} from "./get-data.js"
import {setDatTimeNumber} from "./get-data.js"

export default function showDateHeader(){

  const $markerTime = document.querySelector("time")

  $markerTime.setAttribute("datatime", setDatTimeNumber())
  console.log(setDatTime())
  $markerTime.querySelector("h2").textContent = setDatTime()


}