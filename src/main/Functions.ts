export function notNull<E>(target: E | null): target is E { return target !== null; }
export type F_Supplier<V> = () => V
export type F_Function<I, O> = (input: I) => O;