import { CheckboxChangeEvent, RadioChangeEvent } from "antd";
import dayjs from "dayjs";
import { ChangeEvent } from "react";
import { Func } from "ts-functional/dist/types";

export const handle = (f:(...args:any[]) => void) => (...args:any[]) => () => f(...args);

export const onInputChange =
    (onChange:Func<string, void>) => 
    (e:ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        onChange(e.currentTarget.value);
    };

export const onCheckboxChange = 
    <T = boolean>(onChange:Func<T, void>, trueVal:T, falseVal:T) => 
    (e:CheckboxChangeEvent) => {
        onChange(e.target.checked ? trueVal : falseVal);
    }

export const onRadioChange =
    (onChange:Func<string, void>) => 
    (e:RadioChangeEvent) => {
        onChange(e.target.value);
    }

export const onNumberChange  = (onChange:Func<number, void>) => (value:string) => {
    const num = parseFloat(value);
    if (!isNaN(num)) {
        onChange(num);
    }
}

export const onDateChange = (onChange:Func<string, void>) => (date:dayjs.Dayjs) => {
    if (date) {
        onChange(date.format("YYYY-MM-DD"));
    }
}