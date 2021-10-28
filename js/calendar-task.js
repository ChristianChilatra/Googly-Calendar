

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
  let positionCursorX = function (){
    if (event.clientX > ($windowViewPortWidth / 2)) {
      return (event.clientX - $windowTaskWidth)
    }
  }
  let positionCursorY = function(){
    if (event.clientY > ($windowViewPortHeight / 2)) {
      return event.clientY -$windowTaskHeight
    } else if ($windowViewPortHeight < 800){
      return ($windowTaskHeight*25)/100
    }
  }

  setPositionModal(positionCursorX(), positionCursorY())
}

function setPositionModal(positionCursorX, positionCursorY){
  $windowTask.style.cssText = `inset-inline-start: ${positionCursorX}px; inset-block-start:${positionCursorY}px`
  $windowTask.open = true
}

function hiddenAddTask(){
  $windowTask.open = false
}
