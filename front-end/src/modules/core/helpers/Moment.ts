//@ts-ignore
import moment from 'moment/moment';
import 'moment/locale/es';

const getTimeAgo = (date: Date) => {
    return moment(date).locale('es').fromNow();
};

const getTimeFormatted = (date: Date) => {
    return `${moment(date).locale('es').format('dddd, D [de] MMMM [del] YYYY [a las] HH:mm')}`
};

export {
    getTimeAgo,
    getTimeFormatted
}