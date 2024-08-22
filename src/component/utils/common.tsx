import moment, {MomentInput} from 'moment'

export const getMonthsIsTheTime = (dateString: string) => {
  const inputDate = moment(dateString)
  const currentDate = moment()

  const monthDifference = currentDate.diff(inputDate, 'months')

  if (monthDifference === 0) {
    return 'Update a month ago'
  } else if (monthDifference >= 2) {
    return `Update ${monthDifference} months ago`
  }
  return ''
}

export type TypeDateFormat =
  | 'YYYY'
  | 'YYYY-MM-DD'
  | 'DD/MM/YYYY'
  | 'MMM DD, YYYY'
  | 'DD MMM, YYYY'
  | 'ddd M/D'
  | 'MMMM YYYY'
  | 'MMM YYYY'
  | 'DD MMM, YYYY HH:mm:ss'
  | 'dddd'

export function formatDate(date: MomentInput, typeFormat: TypeDateFormat = 'MMM DD, YYYY'): string {
  return moment(date).isValid() ? moment(date).format(typeFormat) : ''
}
