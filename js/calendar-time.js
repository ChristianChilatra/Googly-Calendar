import { createDOM } from "./utils/dom.js";
import { hoursDay } from "./utils/dictionary.js";
import { getTimeZone } from "./get-data.js";


const $containerGridTime = document.querySelector(".containerTime")

export default function setGridTime() {
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

    const $selectGrid = $containerGridTime.querySelectorAll("div")
    const $selectFirstGrid = []


    for (let index = 0; index < 8; index++) {
        $selectFirstGrid.push($selectGrid[index]);
    }

    $selectFirstGrid.forEach(($element, index) => {
        if (index === 0) {
            $element.querySelector("span").setAttribute("id","firstChild")
            $element.querySelector("span").textContent = `GMT-0${getTimeZone()}`
        }
        $element.style.cssText = "position: sticky; inset-block-start: 0; background: var(--white)"
    })
}