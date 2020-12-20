import moment from 'moment'

const dateFormat = 'YYYY-MM-DD HH:mm:ss'

const dateStr = (date) => {
	return moment(date).format(dateFormat)
}

export { dateStr }
