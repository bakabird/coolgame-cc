import { Component } from "cc";
import { SKPGame } from "./SKPGame";
import { IPlay, PlayStatus } from "./IPlay";
import { SysBase } from "./SysBase";
import { KitBase } from "./KitBase";
import { _CoolgameCCInteral } from "./Define";

export abstract class PlayBase extends Component implements IPlay {
    private _game: SKPGame;
    private _status: PlayStatus = PlayStatus.Nil;
    get status(): PlayStatus {
        return this._status;
    }
    public abstract playName: string;
    sign(game: SKPGame) {
        this._game = game;
    };
    Init(complete: () => void): void {
        this._status = PlayStatus.Initing
        console.log(this.playName, "Init");
        this.OnInit(() => {
            this._status = PlayStatus.Inited
            complete();
        })
    }
    LateInit(complete: () => void): void {
        console.log(this.playName, "LateInit");
        this.OnLateInit(() => {
            this._status = PlayStatus.Running;
            complete()
        });
    }
    Dispose(): void {
        console.log(this.playName, "Dispose");
        this._status = PlayStatus.Disposed;
    }
    protected sys<T extends SysBase>(type: _CoolgameCCInteral.types_constructor<T>): T | null {
        return this._game.sys(type);
    }
    protected kit<T extends KitBase>(type: _CoolgameCCInteral.types_constructor<T>): T | null {
        return this._game.kit(type);
    }
    protected abstract OnInit(complete: () => void): void;
    protected abstract OnLateInit(complete: () => void): void;
    protected abstract OnDispose(): void;
}