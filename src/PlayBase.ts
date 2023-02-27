import { Action, Action1, types_constructor, IDisposable } from "./Define";
import { Component } from "cc";
import { SKPGame } from "./SKPGame";
import { IPlay, PlayStatus } from "./IPlay";

export abstract class PlayBase extends Component implements IPlay {
    public game: SKPGame;
    private _status: PlayStatus = PlayStatus.Nil;
    get status(): PlayStatus {
        return this._status;
    }
    public abstract playName: string;
    sign(game: SKPGame) {
        this.game = game;
    };
    Init(complete: Action): void {
        this._status = PlayStatus.Initing
        console.log(this.playName, "Init");
        this.OnInit(() => {
            this._status = PlayStatus.Inited
            complete();
        })
    }
    LateInit(complete: Action): void {
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
    protected abstract OnInit(complete: Action): void;
    protected abstract OnLateInit(complete: Action): void;
    protected abstract OnDispose(): void;
}