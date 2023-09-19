import { Component } from "cc";
import { ISys, SysStatus } from "./ISys";
import { SKPGame } from "./SKPGame";
import { _CoolgameCCInteral } from "./Define";

type Action = () => void;

export abstract class SysBase extends Component implements ISys {
    private _game: SKPGame;
    private _status: SysStatus = SysStatus.Nil;
    get status(): SysStatus {
        return this._status;
    }
    public abstract sysName: string;
    sign(game: SKPGame) {
        this._game = game;
    };
    Init(complete: Action): void {
        this._status = SysStatus.Initing
        console.log(this.sysName, "Init");
        this.OnInit(() => {
            this._status = SysStatus.Inited
            complete();
        });
    }
    LateInit(complete: Action): void {
        console.log(this.sysName, "LateInit");
        this.OnLateInit(() => {
            this._status = SysStatus.Running;
            complete()
        }, this._game.sys.bind(this._game));
    }

    Dispose(): void {
        console.log(this.sysName, "Dispose");
        this.OnDispose();
        this._status = SysStatus.Disposed;
    }
    protected abstract OnInit(complete: Action): void;
    protected abstract OnLateInit(complete: () => void, sys: <T extends SysBase>(type: _CoolgameCCInteral.types_constructor<T>) => T): void;
    protected abstract OnDispose(): void;
}