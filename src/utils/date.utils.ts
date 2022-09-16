import format from 'date-fns/format';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import enUs from 'date-fns/locale/en-US';
import parseISO from 'date-fns/parseISO';

export function mmDDyyyy(isoDate: string, dateFormat = 'MM/dd/yyyy HH:mm') {
  return format(parseISO(isoDate), dateFormat, { locale: enUs });
}

export const fromNow = (isoDate: string) =>
  formatDistanceToNow(parseISO(isoDate), { locale: enUs });
