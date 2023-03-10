import { Action, Action1, types_constructor, IDisposable } from "./Define";
/// <summary>
/// 系统状态
/// </summary>
export enum SysStatus {
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


export interface ISys extends IDisposable {
    get status(): SysStatus;
    Init(complete: Action): void;
    /// <summary>
    /// 在所有的系统都 Init 后调用
    /// </summary>
    LateInit(complete: Action): void;
}