type Action = ()=>void;
type Action1<A> = (a: A)=>void;
type Func<Ret> = ()=>Ret;
type types_constructor<T = unknown> = new (...args: any[]) => T;
interface IDisposable {
    Dispose(): void;
}
