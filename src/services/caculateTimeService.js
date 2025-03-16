import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/vi';

export const getLastAccess = (day) => {
    dayjs.extend(relativeTime);
    dayjs.locale('vi');
    const timeAgo = dayjs(day).fromNow();
    return timeAgo.replace('một', '1');
};

export const compareTime = (day1, day2) => {
    const d1 = dayjs(day1);
    const d2 = dayjs(day2);
    if (d1.isBefore(d2)) {
        return -1;
    } else if (d1.isAfter(d2)) {
        return 1;
    } else return 0;
};
