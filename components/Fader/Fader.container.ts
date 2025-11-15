import { overridable } from "@core/lib/overridable";
import { createInjector, inject, mergeProps } from "unstateless";
import { FaderComponent } from "./Fader.component";
import { FaderProps, IFaderInputProps, IFaderProps } from "./Fader.d";

const injectFaderProps = createInjector(({}:IFaderInputProps):IFaderProps => {
    return {};
});

const connect = inject<IFaderInputProps, FaderProps>(mergeProps(
    injectFaderProps,
));
export const connectFader = connect;

export const Fader = overridable<IFaderInputProps>(connect(FaderComponent));
