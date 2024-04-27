export function getLeadingZeroFormat(month_or_day: number) {
	if (month_or_day < 10) {
		return `0${month_or_day}`;
	} else {
		return month_or_day;
	}
}

export function getDateInputFormatString(date: Date) {
	return `${date.getFullYear()}-${getLeadingZeroFormat(date.getMonth() + 1)}-${getLeadingZeroFormat(
		date.getDate()
	)}`;
}

export function prettifyDate(date: Date) {

	const month_names = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]



	return `${month_names[date.getMonth()]} ${getLeadingZeroFormat(date.getDate())} ${date.getFullYear()} ${date.getHours()}:${getLeadingZeroFormat(date.getMinutes())}`
}

export function onSameDay(d1: Date, d2: Date) {
	return d1.getFullYear() === d2.getFullYear() && d1.getMonth() === d2.getMonth() && d1.getDate() === d2.getDate()
}

export function normalizeDate(date_string: string) {
	let date = new Date(date_string)

	return `${date.getDay()}/${date.getMonth()+1}/${date.getFullYear()}`
}