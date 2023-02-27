export type Action = () => void;
export type Action1<A> = (a: A) => void;
export type Func<Ret> = () => Ret;
export type types_constructor<T = unknown> = new (...args: any[]) => T;
export interface IDisposable {
    Dispose(): void;
}
