import { overridable } from "@core/lib/overridable";
import { createInjector, inject, mergeProps } from "unstateless";
import { DatePickerComponent, RangePickerComponent } from "./DatePicker.component";
import {
    DatePickerProps,
    IDatePickerInputProps,
    IDatePickerProps,
    RangePickerProps,
    IRangePickerInputProps,
    IRangePickerProps,
} from "./DatePicker.d";

const injectDatePickerProps = createInjector(({}: IDatePickerInputProps): IDatePickerProps => {
    return {};
});

const connect = inject<IDatePickerInputProps, DatePickerProps>(mergeProps(
    injectDatePickerProps,
));
export const connectDatePicker = connect;

const BaseDatePicker = overridable<IDatePickerInputProps>(connect(DatePickerComponent));

const injectRangePickerProps = createInjector(({}: IRangePickerInputProps): IRangePickerProps => {
    return {};
});

const connectRange = inject<IRangePickerInputProps, RangePickerProps>(mergeProps(
    injectRangePickerProps,
));
export const RangePicker = overridable<IRangePickerInputProps>(connectRange(RangePickerComponent));

type DatePickerType = typeof BaseDatePicker & {
    RangePicker: typeof RangePicker;
};

export const DatePicker = BaseDatePicker as DatePickerType;
DatePicker.RangePicker = RangePicker;
