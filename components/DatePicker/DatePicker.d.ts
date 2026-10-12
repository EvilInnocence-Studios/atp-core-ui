import { DatePickerProps as AntdDatePickerProps } from "antd";
import type { RangePickerProps as AntdRangePickerProps } from "antd/es/date-picker";
import dayjs from "dayjs";

export declare type DatePickerValue = string | dayjs.Dayjs | null | undefined;

export declare interface IDatePickerInputProps extends Omit<AntdDatePickerProps, "value" | "onChange"> {
    value?: DatePickerValue;
    onChange?: ((value: string, date: dayjs.Dayjs | null) => void) | any;
}

export declare interface IDatePickerProps {}

export declare type DatePickerProps = IDatePickerInputProps & IDatePickerProps;

export declare interface IRangePickerInputProps extends Omit<AntdRangePickerProps, "value" | "onChange"> {
    value?: [string, string] | [dayjs.Dayjs, dayjs.Dayjs] | null;
    onChange?: ((dateStrings: [string, string] | null, dates: [dayjs.Dayjs | null, dayjs.Dayjs | null] | null) => void) | any;
}

export declare interface IRangePickerProps {}

export declare type RangePickerProps = IRangePickerInputProps & IRangePickerProps;
