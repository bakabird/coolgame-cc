export type Action = () => void;
export type Action1<A> = (a: A) => void;
export type Action2<A, B> = (a: A, b: B) => void;
export type Action3<A, B, C> = (a: A, b: B, c: C) => void;
export type Action4<A, B, C, D> = (a: A, b: B, c: C, d: D) => void;
export type Action5<A, B, C, D, E> = (a: A, b: B, c: C, d: D, e: E) => void;
export type Func<Ret> = () => Ret;
export type Func1<Ret, A> = (a: A) => Ret;
export type Func2<Ret, A, B> = (a: A, b: B) => Ret;
export type Func3<Ret, A, B, C> = (a: A, b: B, c: C) => Ret;
export type Func4<Ret, A, B, C, D> = (a: A, b: B, c: C, d: D) => Ret;
export type Func5<Ret, A, B, C, D, E> = (a: A, b: B, c: C, d: D, e: E) => Ret;
export type types_constructor<T = unknown> = new (...args: any[]) => T;
export interface IDisposable {
    Dispose(): void;
}
