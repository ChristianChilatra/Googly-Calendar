

const $windowTask = document.querySelector(".modalMeet")

export default function setTask() {

  const $containerTask = document.querySelectorAll(".containerTask")
  const $buttonCancelTask = document.querySelector("#cancel")

    console.log($buttonCancelTask);
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
  let positionCursorX = event.clientX
  let positionCursorY = event.clientY

  if (positionCursorX > ($windowViewPortWidth / 2)) {
    positionCursorX -= $windowTaskWidth
    setPositionModal(positionCursorX, positionCursorY)
  }
  if (positionCursorY > ($windowViewPortHeight / 2)) {
    positionCursorY -= $windowTaskHeight
    setPositionModal(positionCursorX, positionCursorY)
  }
  if ($windowViewPortHeight < 800){
    positionCursorY = ($windowTaskHeight*25)/100
    setPositionModal(positionCursorX, positionCursorY)
  }

}

function setPositionModal(positionCursorX, positionCursorY){
  $windowTask.style.cssText = `inset-inline-start: ${positionCursorX}px; inset-block-start:${positionCursorY}px`
  $windowTask.open = true
}

function hiddenAddTask(){
  $windowTask.open = false
  console.log("ok");
}
