export namespace _CoolgameCCInteral {
    export type types_constructor<T = unknown> = new (...args: any[]) => T;
    export interface IDisposable {
        Dispose(): void;
    }
}


