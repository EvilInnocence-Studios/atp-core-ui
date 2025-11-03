type ComponentLike<T> = (props: T) => JSX.Element;
interface IOriginal {
	Original: () => JSX.Element;
}
export type OverridableComponent<T> = ComponentLike<T> & {
	override: (impl: ComponentLike<T & IOriginal>) => void;
};

export function overridable<T>(Base: ComponentLike<T>): OverridableComponent<T> {
	let Impl: ComponentLike<T & IOriginal> = Base;

	const Wrapper = ((props: T): JSX.Element => {
		return <Impl {...props} Original={() => <Base {...props as any} />} />;
	}) as OverridableComponent<T>;

	Wrapper.override = (impl: ComponentLike<T & IOriginal>) => {
		Impl = impl;
	};

	return Wrapper;
}
