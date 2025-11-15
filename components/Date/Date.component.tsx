import { switchOn } from "ts-functional";
import {DateProps} from "./Date.d";
import styles from './Date.module.scss';
import { overridable } from "@core/lib/overridable";

const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
];

const days = ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

// Zeller's algorithm:
// https://en.wikipedia.org/wiki/Determination_of_the_day_of_the_week#Zeller%E2%80%99s_algorithm
const getWeekDay = (year:number, month:number, day:number) => {
    const Y = month <= 2 ? year - 1 : year;
    const y = Y % 100;
    const c = Math.floor(Y / 100);
    const m = month <= 2 ? month + 12 : month;
    const w = (day + Math.floor(13*(m+1)/5) + y + Math.floor(y/4) + Math.floor(c/4) - 2*c) % 7;
    return days[w];
}

const getOrdinal = (num:number) => num % 100 > 10 && num % 100 < 14 ? 'th' : switchOn(num % 10, {
    1: () => 'st',
    2: () => 'nd',
    3: () => 'rd',
    default: () => 'th'
});

export const DateComponent = overridable(({date}:DateProps) => {
    if(!date) return <span className={styles.noDate}>No Date</span>;
    const parts = date.split('-');
    const year = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10);
    const day = parseInt(parts[2], 10);
    const monthName = months[month - 1];
    const weekDay = getWeekDay(year, month, day);
    const ordinal = getOrdinal(day);
    return <span>{weekDay}, {monthName} {day}<sup>{ordinal}</sup>, {year}</span>;
});
