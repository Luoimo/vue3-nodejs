import moment from 'moment'
moment.locale('zh-cn')
const timeFormat = {
    getTime: (date) => {
        return moment(date).format('YYYY/MM/DD')
    },
}
export default timeFormat
