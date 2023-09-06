import { Component } from "cc";
import { ISys, SysStatus } from "./ISys";

type Action = () => void;

export abstract class SysBase extends Component implements ISys {
    private _status: SysStatus = SysStatus.Nil;
    get status(): SysStatus {
        return this._status;
    }
    public abstract sysName: string;
    Init(complete: Action): void {
        this._status = SysStatus.Initing
        console.log(this.sysName, "Init");
        this.OnInit(() => {
            this._status = SysStatus.Inited
            complete();
        })
    }
    LateInit(complete: Action): void {
        console.log(this.sysName, "LateInit");
        this.OnLateInit(() => {
            this._status = SysStatus.Running;
            complete()
        });
    }
    Dispose(): void {
        console.log(this.sysName, "Dispose");
        this._status = SysStatus.Disposed;
    }
    protected abstract OnInit(complete: Action): void;
    protected abstract OnLateInit(complete: Action): void;
    protected abstract OnDispose(): void;
}