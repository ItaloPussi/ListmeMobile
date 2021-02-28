export const zeroToLeft = value => {
    return value < 10 ? `0${value}` : value
}

export const formatedDate = value => {
    const date = new Date(value)
    return `${date.getFullYear()}/${zeroToLeft(date.getMonth()+1)}/${zeroToLeft(date.getDate())}`
}