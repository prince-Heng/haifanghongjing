    let inArray = (array, search) => {
        let index = array.findIndex((value, key, arr) => {
            return value == search
        });
        return index == -1 ? false : true
    }

    let install = () => {
        Array.prototype.inArray = function(search) {
            return inArray(this, search);
        };
    }

    export default {
        inArray,
        install
    }