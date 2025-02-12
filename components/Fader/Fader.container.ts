import { createInjector, inject, mergeProps } from "unstateless";
import {FaderComponent} from "./Fader.component";
import {IFaderInputProps, FaderProps, IFaderProps} from "./Fader.d";

const injectFaderProps = createInjector(({}:IFaderInputProps):IFaderProps => {
    return {};
});

const connect = inject<IFaderInputProps, FaderProps>(mergeProps(
    injectFaderProps,
));

export const Fader = connect(FaderComponent);
