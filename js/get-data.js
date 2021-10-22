import { getDateTime } from "./services/data-time.js"
import { getDateTimeNumber} from "./services/data-time.js"


export function setDatTime(){
  return getDateTime()
}
export function setDatTimeNumber(){
  return getDateTimeNumber()
}