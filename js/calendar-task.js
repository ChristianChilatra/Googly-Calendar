

const $windowTask = document.querySelector(".modalMeet")
const $styleWindowTask = window.getComputedStyle($windowTask)

const $paddinWidthWidowTask = parseInt($styleWindowTask.paddingInlineStart) + parseInt($styleWindowTask.paddingInlineEnd)
const $WidthWidowTask = parseInt($styleWindowTask.width)

const $paddinHeigthWidowTask = parseInt($styleWindowTask.paddingBlockStart) + parseInt($styleWindowTask.paddingBlockEnd)
const $heigthWidowTask = parseInt($styleWindowTask.height)


export default function setTask() {

  const $containerTask = document.querySelectorAll(".containerTask")
  const $buttonCancelTask = document.querySelector("#cancel")

  $containerTask.forEach($element => {
    $element.addEventListener("click", showAddTask)
  })
  window.addEventListener("click", validationView)
  $buttonCancelTask.addEventListener("click", hiddenAddTask)

}

function showAddTask(event) {
  const $windowViewPortWidth = window.innerWidth
  const $windowViewPortHeight = window.innerHeight

  const positionCursorX = function () {
    if (event.clientX > ($windowViewPortWidth / 2)) {
      return event.clientX - ($WidthWidowTask + $paddinWidthWidowTask)
    } else {
      return event.clientX
    }
  }
  const positionCursorY = function () {
    if ($windowViewPortHeight < 800) {
      return ($windowViewPortHeight * 30) / 100
    } else {
      if (event.clientY > ($windowViewPortHeight / 2)) {
        return (event.clientY - ($heigthWidowTask + $paddinHeigthWidowTask))
      } else {
        return event.clientY
      }
    }
  }

  if ($windowTask.open) {
    hiddenAddTask()
  } else {
    $windowTask.open = true
    setPositionModal(positionCursorX(), positionCursorY())
  }

}

function setPositionModal(positionCursorX, positionCursorY) {
  $windowTask.style.cssText = `inset-inline-start: ${positionCursorX}px; inset-block-start:${positionCursorY}px`
}

function hiddenAddTask() {
  $windowTask.open = false
}

function validationView(event) {
  if (event.target.className != "containerTask" && searchPath(event.path)) {
    hiddenAddTask()
  }
}

function searchPath(list) {
  if (list.indexOf("dialog.modalMeet")!= -1) {
    return true
  }else{
    return false
  }
}