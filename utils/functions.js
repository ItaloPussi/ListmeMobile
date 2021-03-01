// If the value is < 10, put a zero in the left
export const zeroToLeft = value => {
    return value < 10 ? `0${value}` : value
}

// Format a value to a date yyyy/mm/dd
export const formatedDate = value => {
    const date = new Date(value)
    return `${date.getFullYear()}/${zeroToLeft(date.getMonth()+1)}/${zeroToLeft(date.getDate())}`
}

// Verifiy if today is a weekday
export const todayIsWeekday =() => {
    const today = new Date()
	const weekday = today.getDay()
	return weekday == 0 || weekday == 6 ? false : true
}