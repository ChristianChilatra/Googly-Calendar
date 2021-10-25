import { createDOM } from "./utils/dom.js";


const $containerGridTime = document.querySelector(".containerTime")

export default function setGridTime() {
    for (let index = 0; index < 24; index++) {                
        $containerGridTime.append(createDOM(`
        <div class="hour"><hr></div>
            `))
        for (let index = 0; index < 7; index++) {
            $containerGridTime.append(createDOM(`
            <div class="containerTask"></div>
            `))
        }
    }
}
