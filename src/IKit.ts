/// <summary>
/// 套件状态
import { Action, Action1, types_constructor, IDisposable } from "./Define";

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


export interface IKit extends IDisposable {
    get status(): KitStatus;
    Init(complete: Action): void;
    /// <summary>
    /// call after all kit inited
    /// </summary>
    LateInit(complete: Action): void;
}