import { DatePicker as AntdDatePicker } from "antd";
import dayjs from "dayjs";
import { overridable } from "@core/lib/overridable";
import { DatePickerProps, RangePickerProps } from "./DatePicker.d";

const toDayjs = (val?: string | dayjs.Dayjs | null): dayjs.Dayjs | null => {
    if (!val) return null;
    if (dayjs.isDayjs(val)) return val.isValid() ? val : null;
    const cleanStr = String(val).split("T")[0];
    const d = dayjs(cleanStr);
    return d.isValid() ? d : null;
};

export const DatePickerComponent = overridable(({ value, onChange, ...rest }: DatePickerProps) => {
    const dayjsValue = toDayjs(value);

    const handleChange = (date: dayjs.Dayjs | null, dateString: string | string[]) => {
        if (!onChange) return;
        const str = typeof dateString === "string" ? dateString : (date ? date.format("YYYY-MM-DD") : "");
        onChange(str, date);
    };

    return (
        <AntdDatePicker
            {...rest}
            value={dayjsValue}
            onChange={handleChange}
        />
    );
});

export const RangePickerComponent = overridable(({ value, onChange, ...rest }: RangePickerProps) => {
    const dayjsValue: [dayjs.Dayjs, dayjs.Dayjs] | null = (value && value[0] && value[1])
        ? [toDayjs(value[0])!, toDayjs(value[1])!]
        : null;

    const safeValue = (dayjsValue && dayjsValue[0] && dayjsValue[1]) ? dayjsValue : null;

    const handleChange = (dates: [dayjs.Dayjs | null, dayjs.Dayjs | null] | null, dateStrings: [string, string]) => {
        if (!onChange) return;
        const resultStrings: [string, string] | null = (dateStrings && dateStrings[0] && dateStrings[1])
            ? [dateStrings[0], dateStrings[1]]
            : null;
        onChange(resultStrings, dates);
    };

    return (
        <AntdDatePicker.RangePicker
            {...rest}
            value={safeValue}
            onChange={handleChange}
        />
    );
});
