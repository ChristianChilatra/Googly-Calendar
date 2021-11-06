import { createDOM } from "./utils/dom.js";
import { hoursDay } from "./utils/dictionary.js";
import { getDefaultData } from "./services/data-time.js";


const data = getDefaultData()

const $containerGridTime = document.querySelector(".containerTime")

const $containerHeader = document.querySelector("header")
const $containerHeaderHeight = $containerHeader.getBoundingClientRect().height
const $containerCalendarWeek = document.querySelector(".containerDays")
const $containerCalendarWeekHeight = $containerCalendarWeek.getBoundingClientRect().height

export function setGridTimeWeek() {

    $containerGridTime.innerHTML = ""

    let count = 0

    $containerGridTime.style.cssText = `
    grid-template-columns: 5rem repeat(7, 1fr);`

    for (let index = 0; index < 25; index++) {
        $containerGridTime.append(createDOM(`
        <div class="hour"><span>${hoursDay[index]}</span><hr></div>
            `))
        for (let index = 0; index < 7; index++) {
            $containerGridTime.append(createDOM(`
            <div class="containerTask" id="${count}-${index}"></div>
            `))
        }
        count++
    }

    $containerGridTime.style.blockSize = `calc(100vh - (${$containerHeaderHeight}px + ${$containerCalendarWeekHeight}px))`

    const $selectGrid = $containerGridTime.querySelectorAll("div")
    const $selectFirstGrid = []


    for (let index = 0; index < 8; index++) {
        $selectFirstGrid.push($selectGrid[index]);
    }

    $selectFirstGrid.forEach(($element, index) => {
        if (index === 0) {
            $element.querySelector("span").setAttribute("id", "firstChild")
            $element.querySelector("span").textContent = `GMT-0${getDefaultData().getTimezoneOffset() / 60}`
        }
        $element.style.cssText = "position: sticky; inset-block-start: 0; background: var(--white)"
    })

    setCurrentHourWeek()
}
export function setGridTimeDay() {

    $containerGridTime.innerHTML = ""


    $containerGridTime.style.cssText = `
    grid-template-columns: 5rem auto;`

    let count = -1

    for (let index = 0; index < 25; index++) {
        $containerGridTime.append(createDOM(`
        <div class="hour"><span>${hoursDay[index]}</span><hr></div>
            `))
        for (let index = 0; index < 1; index++) {
            $containerGridTime.append(createDOM(`
            <div class="containerTask" id="${count}"></div>
            `))
            count++
        }
    }

    $containerGridTime.style.blockSize = `calc(100vh - (${$containerHeaderHeight}px + ${$containerCalendarWeekHeight}px))`

    const $selectGrid = $containerGridTime.querySelectorAll("div")
    const $selectFirstGrid = []


    for (let index = 0; index < 2; index++) {
        $selectFirstGrid.push($selectGrid[index]);
    }

    $selectFirstGrid.forEach(($element, index) => {
        if (index === 0) {
            $element.querySelector("span").setAttribute("id", "firstChild")
            $element.querySelector("span").textContent = `GMT-0${getDefaultData().getTimezoneOffset() / 60}`
        }
        $element.style.cssText = "position: sticky; inset-block-start: 0; background: var(--white)"
    })
    setCurrentHourDay()
}

function setCurrentHourDay() {

    const $containerTask = document.querySelectorAll(".containerTask")
    $containerTask.forEach($element => {
        if (parseInt($element.id) === data.getHours()) {
            $element.scrollIntoView()
            $element.append(createDOM(`
        <div class="currentHour" tabindex="1"></div>
        `))
        }
    })

}
function setCurrentHourWeek() {



    const $containerTask = document.querySelectorAll(".containerTask")
    $containerTask.forEach($element => {
        if ($element.id === `${data.getHours()}-${data.getDay()}`) {
            $element.scrollIntoView()
            $element.append(createDOM(`
        <div class="currentHour"></div>
        `))
        }
    })

}

