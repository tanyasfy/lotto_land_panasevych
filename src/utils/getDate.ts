/**
 * Konvertiert ein Datumsstring in das Format "Wochentag Tag Monat Jahr".
 * @param val Der Eingabestring, der ein gültiges Datum darstellen soll.
 * @returns Das Datum im formatierten String.
 */
export const getDateFromString = (val: string): string => {
  const date = new Date(val)

  if (isNaN(date.getTime())) {
    return 'Invalid Date'
  }

  const days = ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag']
  const months = [
    'Januar',
    'Februar',
    'März',
    'April',
    'Mai',
    'Juni',
    'Juli',
    'August',
    'September',
    'Oktober',
    'November',
    'Dezember'
  ]

  const dayName = days[date.getDay()]
  const day = date.getDate()
  const month = months[date.getMonth()]
  const year = date.getFullYear()

  return `${dayName} ${day} ${month} ${year}`
}
