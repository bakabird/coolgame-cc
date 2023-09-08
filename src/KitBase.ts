import { Component } from "cc";
import { SKPGame } from "./SKPGame";
import { IKit, KitStatus } from "./IKit";
import { _CoolgameCCInteral } from "./Define";
import { SysBase } from "./SysBase";

export abstract class KitBase extends Component implements IKit {
    private _game: SKPGame;
    private _status: KitStatus = KitStatus.Nil;
    get status(): KitStatus {
        return this._status;
    }
    public abstract kitName: string;
    sign(game: SKPGame) {
        this._game = game;
    };
    Init(complete: () => void): void {
        this._status = KitStatus.Initing
        console.log(this.kitName, "Init");
        this.OnInit(() => {
            this._status = KitStatus.Inited
            complete();
        })
    }
    LateInit(complete: () => void): void {
        console.log(this.kitName, "LateInit");
        this.OnLateInit(() => {
            this._status = KitStatus.Running;
            complete()
        }, this._game.kit.bind(this._game));
    }
    Dispose(): void {
        console.log(this.kitName, "Dispose");
        this._status = KitStatus.Disposed;
    }
    protected sys<T extends SysBase>(type: _CoolgameCCInteral.types_constructor<T>) {
        return this._game.sys(type);
    }
    protected abstract OnInit(complete: () => void): void;
    protected abstract OnLateInit(complete: () => void, kit: <T extends KitBase>(type: _CoolgameCCInteral.types_constructor<T>) => T): void;
    protected abstract OnDispose(): void;
}