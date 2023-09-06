// Generated by dts-bundle v0.7.3
// Dependencies for this module:
//   ../cc

declare module 'coolgame-cc' {
    export { IKit } from "coolgame-cc/IKit";
    export { IPlay } from "coolgame-cc/IPlay";
    export { ISys } from "coolgame-cc/ISys";
    export { KitBase } from "coolgame-cc/KitBase";
    export { PlayBase } from "coolgame-cc/PlayBase";
    export { SysBase } from "coolgame-cc/SysBase";
    export { SKPGame } from "coolgame-cc/SKPGame";
}

declare module 'coolgame-cc/IKit' {
    import { _CoolgameCCInteral } from "coolgame-cc/Define";
    export enum KitStatus {
        Nil = 0,
        Initing = 1,
        Inited = 2,
        Running = 3,
        Disposed = 4
    }
    export interface IKit extends _CoolgameCCInteral.IDisposable {
        get status(): KitStatus;
        Init(complete: () => void): void;
        LateInit(complete: () => void): void;
    }
}

declare module 'coolgame-cc/IPlay' {
    import { _CoolgameCCInteral } from "coolgame-cc/Define";
    export enum PlayStatus {
        Nil = 0,
        Initing = 1,
        Inited = 2,
        Running = 3,
        Disposed = 4
    }
    export interface IPlay extends _CoolgameCCInteral.IDisposable {
        get status(): PlayStatus;
        Init(complete: () => void): void;
        LateInit(complete: () => void): void;
    }
}

declare module 'coolgame-cc/ISys' {
    import { _CoolgameCCInteral } from "coolgame-cc/Define";
    export enum SysStatus {
        Nil = 0,
        Initing = 1,
        Inited = 2,
        Running = 3,
        Disposed = 4
    }
    export interface ISys extends _CoolgameCCInteral.IDisposable {
        get status(): SysStatus;
        Init(complete: () => void): void;
        LateInit(complete: () => void): void;
    }
}

declare module 'coolgame-cc/KitBase' {
    import { Component } from "cc";
    import { SKPGame } from "coolgame-cc/SKPGame";
    import { IKit, KitStatus } from "coolgame-cc/IKit";
    import { SysBase } from "coolgame-cc/SysBase";
    import { _CoolgameCCInteral } from "coolgame-cc/Define";
    export abstract class KitBase extends Component implements IKit {
        get status(): KitStatus;
        abstract kitName: string;
        sign(game: SKPGame): void;
        Init(complete: () => void): void;
        LateInit(complete: () => void): void;
        Dispose(): void;
        protected sys<T extends SysBase>(type: _CoolgameCCInteral.types_constructor<T>): T;
        protected abstract OnInit(complete: () => void): void;
        protected abstract OnLateInit(complete: () => void): void;
        protected abstract OnDispose(): void;
    }
}

declare module 'coolgame-cc/PlayBase' {
    import { Component } from "cc";
    import { SKPGame } from "coolgame-cc/SKPGame";
    import { IPlay, PlayStatus } from "coolgame-cc/IPlay";
    import { SysBase } from "coolgame-cc/SysBase";
    import { KitBase } from "coolgame-cc/KitBase";
    import { _CoolgameCCInteral } from "coolgame-cc/Define";
    export abstract class PlayBase extends Component implements IPlay {
        get status(): PlayStatus;
        abstract playName: string;
        sign(game: SKPGame): void;
        Init(complete: () => void): void;
        LateInit(complete: () => void): void;
        Dispose(): void;
        protected sys<T extends SysBase>(type: _CoolgameCCInteral.types_constructor<T>): T | null;
        protected kit<T extends KitBase>(type: _CoolgameCCInteral.types_constructor<T>): T | null;
        protected abstract OnInit(complete: () => void): void;
        protected abstract OnLateInit(complete: () => void): void;
        protected abstract OnDispose(): void;
    }
}

declare module 'coolgame-cc/SysBase' {
    import { Component } from "cc";
    import { ISys, SysStatus } from "coolgame-cc/ISys";
    type Action = () => void;
    export abstract class SysBase extends Component implements ISys {
        get status(): SysStatus;
        abstract sysName: string;
        Init(complete: Action): void;
        LateInit(complete: Action): void;
        Dispose(): void;
        protected abstract OnInit(complete: Action): void;
        protected abstract OnLateInit(complete: Action): void;
        protected abstract OnDispose(): void;
    }
    export {};
}

declare module 'coolgame-cc/SKPGame' {
    import { Component } from 'cc';
    import { KitBase } from 'coolgame-cc/KitBase';
    import { PlayBase } from 'coolgame-cc/PlayBase';
    import { SysBase } from 'coolgame-cc/SysBase';
    import { _CoolgameCCInteral } from 'coolgame-cc/Define';
    enum GameStatu {
            Idle = 0,
            Loaded = 1,
            InitingSys = 2,
            InitingKit = 3,
            InitingPlay = 4,
            Running = 5
    }
    type Action = () => void;
    type types_constructor<T> = _CoolgameCCInteral.types_constructor<T>;
    export abstract class SKPGame extends Component {
            static get me(): SKPGame;
            get statu(): GameStatu;
            protected abstract gamename: String;
            onLoad(): void;
            sys<T extends SysBase>(type: types_constructor<T>): T | null;
            kit<T extends KitBase>(type: types_constructor<T>): T | null;
            play<T extends PlayBase>(type: types_constructor<T>): T | null;
            addPlay<T extends PlayBase>(type: types_constructor<T>, onInited: Action, onLateInited: Action): T;
            disposePlay<T extends PlayBase>(type: types_constructor<T>): void;
            /**
                * Add Sys Here
                */
            protected abstract OnAddSys(addSys: <T extends SysBase>(type: types_constructor<T>) => T): void;
            /**
                * Add Kit Here
                */
            protected abstract OnAddKit(addKit: <T extends KitBase>(type: types_constructor<T>) => T): void;
            /**
                * Add Play Here
                */
            protected abstract OnAddPlay(addPlay: <T extends PlayBase>(type: types_constructor<T>) => T): void;
            /**
                * Game's Entry.
                * Any Sys/Kit/Play can be used after that.
                */
            protected abstract OnEnter(): void;
            start(): void;
            update(deltaTime: number): void;
    }
    export {};
}

declare module 'coolgame-cc/Define' {
    export namespace _CoolgameCCInteral {
        type types_constructor<T = unknown> = new (...args: any[]) => T;
        interface IDisposable {
            Dispose(): void;
        }
    }
}

