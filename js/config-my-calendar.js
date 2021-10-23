

const $sideBar = document.querySelector(".sideBar")//---// DOM Side Bar //---//
const $myCalendar = $sideBar.querySelector(".myCalendar") //---// DOM container Summer My Calendar //---//
const $summaryCalendar = $myCalendar.querySelector("summary") //---// DOM Summer My Calendar //---//
const $checkCalendar = $myCalendar.querySelectorAll("input[type='checkbox']") //---// DOM Input My Calendar //---//


const statusMyCalendar = {
  open: true
}

export function configMyCalendar(){

  const $statusSummary = $myCalendar.querySelector("details").open

  $statusSummary ? openSummary() : closeSummary()

  $summaryCalendar.addEventListener("click", rotateImageRow)
  $checkCalendar.forEach(($element, index)=>{
    $element.addEventListener("click", (event)=>{
      if (event.target.checked) {
        console.log("True")

      } else {
        console.log("False")
      }
    })
  })
  function rotateImageRow(){
    if (statusMyCalendar.open){
      closeSummary()
    }else{
      openSummary()
    }
  }

  function openSummary(){
    statusMyCalendar.open = true
    $summaryCalendar.style.setProperty("--img-row-rotate", "rotate(180deg)")
  }
  function closeSummary(){
    statusMyCalendar.open = false
    $summaryCalendar.style.setProperty("--img-row-rotate", "rotate(0deg)")
  }

}