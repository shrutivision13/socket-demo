let pattern = [
    "$",
    "*",
    "2",
    "3",

]
let str = ""
for (let i = 1; i <= 4; i++) {
    for (let j = 4; j > 0; j--) {
        if (j <= i) {
            str = str + pattern[j - 1]
        } else {
            str = str + " "
        }
    }
    str = str + "\n"
}

console.log(str)
