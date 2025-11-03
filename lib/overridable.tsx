type ComponentLike<T extends JSX.IntrinsicAttributes> = (props: T) => JSX.Element;

export type OverridableComponent<T extends JSX.IntrinsicAttributes> = ComponentLike<T> & {
	override: (impl: ComponentLike<T>) => void;
};

export function overridable<T extends JSX.IntrinsicAttributes>(Base: ComponentLike<T>): OverridableComponent<T> {
	let Impl: ComponentLike<T> = Base;

	const Wrapper = ((props: T):JSX.Element => {
		return <Impl {...props} />;
	}) as OverridableComponent<T>;

	Wrapper.override = (impl: ComponentLike<T>) => {
		Impl = impl;
	};

	return Wrapper;
}
