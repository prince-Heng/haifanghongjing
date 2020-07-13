//import array from './array.js'
import lang from "./lang.js"
let modules = {
    // array,
    lang
}

let install = (names) => {
    if (typeof names == 'string') {

        modules[names].install();
    } else if (typeof names == 'object' && names.length > 0) {
        for (let i in names) {
            modules[names[i]].install();
        }
    } else if (typeof names == 'undefined' || !names) {
        for (let i in modules) {
            modules[i].install();
        }
    }
}


export default {
    ...modules,
    install
}