import { DatePicker as AntdDatePicker } from "antd";
import dayjs from "dayjs";
import { overridable } from "@core/lib/overridable";
import { DatePickerProps, DatePickerValue, RangePickerProps } from "./DatePicker.d";

const toDayjs = (val?: DatePickerValue): dayjs.Dayjs | null => {
    if (!val) return null;
    if (dayjs.isDayjs(val)) return val.isValid() ? val : null;
    if (val instanceof Date) {
        if (isNaN(val.getTime())) return null;
        if (val.getUTCHours() === 0 && val.getUTCMinutes() === 0 && val.getUTCSeconds() === 0 && (val.getHours() !== 0 || val.getMinutes() !== 0)) {
            const cleanStr = val.toISOString().split("T")[0];
            const d = dayjs(cleanStr);
            return d.isValid() ? d : null;
        }
        const d = dayjs(val);
        return d.isValid() ? d : null;
    }
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
    const isArrayValue = Array.isArray(value);
    const d0 = isArrayValue && value[0] ? toDayjs(value[0]) : null;
    const d1 = isArrayValue && value[1] ? toDayjs(value[1]) : null;
    const safeValue: [dayjs.Dayjs, dayjs.Dayjs] | null = (d0 && d1)
        ? [d0, d1]
        : (!isArrayValue && value ? [toDayjs(value as DatePickerValue)!, toDayjs(value as DatePickerValue)!] : null);

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
