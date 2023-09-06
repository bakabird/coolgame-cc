/// <summary>
/// 套件状态

import { _CoolgameCCInteral } from "./Define";

/// </summary>
export enum KitStatus {
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


export interface IKit extends _CoolgameCCInteral.IDisposable {
    get status(): KitStatus;
    Init(complete: () => void): void;
    /// <summary>
    /// call after all kit inited
    /// </summary>
    LateInit(complete: () => void): void;
}