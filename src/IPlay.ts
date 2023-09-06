import { _CoolgameCCInteral } from "./Define";
import { SKPGame } from "./SKPGame";
/// <summary>
/// 系统状态
/// </summary>
export enum PlayStatus {
    /// <summary>
    /// 未初始化
    /// </summary>
    Nil,
    /// <summary>
    /// 初始化过程中
    /// </summary>
    Initing,
    /// <summary>
    /// 已经唤醒过
    /// </summary>
    Inited,
    /// <summary>
    /// 执行过程中
    /// </summary>
    Running,
    /// <summary>
    /// 已销毁
    /// </summary>
    Disposed,
}


export interface IPlay extends _CoolgameCCInteral.IDisposable {
    get status(): PlayStatus;
    Init(complete: () => void): void;
    /// <summary>
    /// call after all play inited
    /// </summary>
    LateInit(complete: () => void): void;
}