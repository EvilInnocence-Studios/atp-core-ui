import { RadioChangeEvent } from "antd";
import dayjs from "dayjs";
import moment from "moment";
import { ChangeEvent } from "react";
import { Func } from "ts-functional/dist/types";

export const onInputChange =
    (onChange:Func<string, void>) => 
    (e:ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        onChange(e.currentTarget.value);
    };

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