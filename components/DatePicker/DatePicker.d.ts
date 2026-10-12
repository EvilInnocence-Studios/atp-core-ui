import { DatePickerProps as AntdDatePickerProps } from "antd";
import type { RangePickerProps as AntdRangePickerProps } from "antd/es/date-picker";
import dayjs from "dayjs";

export declare type DatePickerValue = string | Date | dayjs.Dayjs | null | undefined;

export declare interface IDatePickerInputProps extends Omit<AntdDatePickerProps, "value" | "onChange"> {
    value?: DatePickerValue;
    onChange?: ((value: string, date: dayjs.Dayjs | null) => void) | any;
}

export declare interface IDatePickerProps { }

export declare type DatePickerProps = IDatePickerInputProps & IDatePickerProps;

export declare type RangePickerValue =
    | [DatePickerValue, DatePickerValue]
    | [string, string]
    | [dayjs.Dayjs, dayjs.Dayjs]
    | [Date, Date]
    | Date
    | null
    | undefined;

export declare interface IRangePickerInputProps extends Omit<AntdRangePickerProps, "value" | "onChange"> {
    value?: RangePickerValue;
    onChange?: ((dateStrings: [string, string] | null, dates: [dayjs.Dayjs | null, dayjs.Dayjs | null] | Date | [Date, Date] | null) => void) | any;
}

export declare interface IRangePickerProps { }

export declare type RangePickerProps = IRangePickerInputProps & IRangePickerProps;
