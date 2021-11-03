import { createDOM } from "./utils/dom.js";
import { hoursDay } from "./utils/dictionary.js";
import { getDefaultData } from "./services/data-time.js";


const $containerGridTime = document.querySelector(".containerTime")

const $containerHeader = document.querySelector("header")
const $containerHeaderHeight = $containerHeader.getBoundingClientRect().height
const $containerCalendarWeek = document.querySelector(".containerDays")
const $containerCalendarWeekHeight = $containerCalendarWeek.getBoundingClientRect().height

export function setGridTimeWeek() {

    $containerGridTime.style.cssText = `
    grid-template-columns: 5rem repeat(7, 1fr);`

    for (let index = 0; index < 25; index++) {
        $containerGridTime.append(createDOM(`
        <div class="hour"><span>${hoursDay[index]}</span><hr></div>
            `))
        for (let index = 0; index < 7; index++) {
            $containerGridTime.append(createDOM(`
            <div class="containerTask"></div>
            `))
        }
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
}
export function setGridTimeDay() {

    $containerGridTime.style.cssText = `
    grid-template-columns: 5rem auto;`

    for (let index = 0; index < 25; index++) {
        $containerGridTime.append(createDOM(`
        <div class="hour"><span>${hoursDay[index]}</span><hr></div>
            `))
        for (let index = 0; index < 1; index++) {
            $containerGridTime.append(createDOM(`
            <div class="containerTask"></div>
            `))
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
}
