import { Action, Action1, types_constructor, IDisposable } from "./Define";
import { Component } from "cc";
import { SKPGame } from "./SKPGame";
import { IKit, KitStatus } from "./IKit";

export abstract class KitBase extends Component implements IKit {
    public game: SKPGame;
    private _status: KitStatus = KitStatus.Nil;
    get status(): KitStatus {
        return this._status;
    }
    public abstract kitName: string;
    sign(game: SKPGame) {
        this.game = game;
    };
    Init(complete: Action): void {
        this._status = KitStatus.Initing
        console.log(this.kitName, "Init");
        this.OnInit(() => {
            this._status = KitStatus.Inited
            complete();
        })
    }
    LateInit(complete: Action): void {
        console.log(this.kitName, "LateInit");
        this.OnLateInit(() => {
            this._status = KitStatus.Running;
            complete()
        });
    }
    Dispose(): void {
        console.log(this.kitName, "Dispose");
        this._status = KitStatus.Disposed;
    }
    protected abstract OnInit(complete: Action): void;
    protected abstract OnLateInit(complete: Action): void;
    protected abstract OnDispose(): void;
}