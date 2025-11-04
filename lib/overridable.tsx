import { Func } from "ts-functional/dist/types";

type ComponentLike<InputProps> = Func<InputProps, JSX.Element>;
interface IOriginal {
	Original: () => JSX.Element;
}
export type OverridableComponent<InputProps> = ComponentLike<InputProps> & {
	override: (impl: ComponentLike<InputProps & IOriginal>) => void;
	hide: () => void;
};

export function overridable<InputProps>(Base: ComponentLike<InputProps>): OverridableComponent<InputProps> {
	let Impl: ComponentLike<InputProps & IOriginal> = Base;

	const Wrapper = ((props: InputProps): JSX.Element => {
		return <Impl {...props} Original={() => <Base {...props as any} />} />;
	}) as OverridableComponent<InputProps>;

	Wrapper.override = (impl: ComponentLike<InputProps & IOriginal>) => {
		Impl = impl;
	};

	Wrapper.hide = () => {
		Impl = () => <></>;
	};

	return Wrapper;
}
