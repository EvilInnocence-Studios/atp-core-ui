import { Func } from "ts-functional/dist/types";

type ComponentLike<InputProps> = Func<InputProps, React.ReactNode>;
interface IOriginal {
	Original: () => JSX.Element | null;
}
export type OverridableComponent<InputProps> = ComponentLike<InputProps> & {
	override: (impl: ComponentLike<InputProps & IOriginal>) => void;
	overrideStyles: (styles: any) => void;
	hide: () => void;
};

export function overridable<InputProps>(Base: ComponentLike<InputProps>): OverridableComponent<InputProps> {
	let Impl: ComponentLike<InputProps & IOriginal> = Base as any;

	const Wrapper = ((props: InputProps): JSX.Element | null => {
		return <Impl {...props} Original={() => <Base {...props as any} />} />;
	}) as OverridableComponent<InputProps>;

	Wrapper.override = (impl: ComponentLike<InputProps & IOriginal>) => {
		if(Impl !== Base as any) console.warn("Overridable component has already been overriden.");
		Impl = impl;
	};

	Wrapper.overrideStyles = (classes: any) => {
		if(Impl !== Base as any) console.warn("Overridable component has already been overriden.");
		Impl = (props: InputProps) => {
			return <Base {...props as any} classes={classes} />;
		};
	};

	Wrapper.hide = () => {
		Impl = () => <></>;
	};

	return Wrapper;
}
