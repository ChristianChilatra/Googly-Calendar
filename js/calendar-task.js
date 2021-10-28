

const $windowTask = document.querySelector(".modalMeet")

export default function setTask() {

  const $containerTask = document.querySelectorAll(".containerTask")
  const $buttonCancelTask = document.querySelector("#cancel")

  $containerTask.forEach($element => {
    $element.addEventListener("click", showAddTask)
  })

  $buttonCancelTask.addEventListener("click", hiddenAddTask)

}

function showAddTask(event) {
  const $windowTaskWidth = $windowTask.getBoundingClientRect().width
  const $windowTaskHeight = $windowTask.getBoundingClientRect().height
  const $windowViewPortWidth = window.innerWidth
  const $windowViewPortHeight = window.innerHeight

  const positionCursorX = function (){
    if (event.clientX > ($windowViewPortWidth / 2)) {
      return event.clientX - $windowTaskHeight
    }else{
      return event.clientX
    }
  }
  const positionCursorY = function(){
    if ($windowViewPortHeight < 800){
      return ($windowTaskHeight*30)/100
    }else {
      if (event.clientY > ($windowViewPortHeight/2)) {
        return event.clientY - $windowTaskWidth
      }else{
        return event.clientY
      }
    } 
  }
  console.log("x: "+ positionCursorX());
  console.log("y: "+ positionCursorY());

  setPositionModal(positionCursorX(), positionCursorY())
}

function setPositionModal(positionCursorX, positionCursorY){

  $windowTask.style.cssText = `inset-inline-start: ${positionCursorX}px; inset-block-start:${positionCursorY}px`
  $windowTask.open = true
}

function hiddenAddTask(){
  $windowTask.open = false
}
