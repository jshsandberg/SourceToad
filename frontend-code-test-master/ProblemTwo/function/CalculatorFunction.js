export const CalculateFunctionality = (input, state) => {
    if (typeof input === "number" && state === 0) {
        return (`${input.toString()}`)
    } else if (typeof input === "number" && state !== 0) {
        return (`${state}${input}`)
    } else if (input === '+' && state === 0) {
        return (0)
    } else if (input === '+' && state !== 0) {
        
    }
}
