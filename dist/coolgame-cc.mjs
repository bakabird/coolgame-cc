import { Component, Node, director } from 'cc';

var TaskStatu;
(function (TaskStatu) {
    TaskStatu[TaskStatu["Idle"] = 0] = "Idle";
    TaskStatu[TaskStatu["Pending"] = 1] = "Pending";
    TaskStatu[TaskStatu["Stop"] = 2] = "Stop";
    TaskStatu[TaskStatu["Fulfilled"] = 3] = "Fulfilled";
})(TaskStatu || (TaskStatu = {}));
/// <summary>
/// 一系列的 Action 依次执行
/// </summary>
class AsyncTask {
    constructor() {
        this.statu = TaskStatu.Idle;
        this.m_quene = new Array();
    }
    Then(task) {
        if (task instanceof Array) {
            let taskNum = task.length + 1;
            this.m_quene.push((complete) => {
                let taskDone = () => {
                    taskNum--;
                    if (taskNum < 1)
                        complete();
                };
                task.forEach(t => { t(taskDone); });
                taskDone();
            });
        }
        else {
            this.m_quene.push(task);
        }
    }
    Start(complete) {
        this.m_onEnd = complete;
        if (this.statu == TaskStatu.Idle) {
            this.statu = TaskStatu.Pending;
            this._Next();
        }
    }
    Stop() {
        if (this.statu == TaskStatu.Pending) {
            this.statu = TaskStatu.Stop;
        }
    }
    _Next() {
        if (this.statu == TaskStatu.Pending) {
            if (this.m_quene.length > 0) {
                this.m_quene.shift()(this._Next.bind(this));
            }
            else {
                this.m_onEnd();
                this.m_onEnd = null;
                this.statu = TaskStatu.Fulfilled;
            }
        }
    }
}

/// <summary>
/// 套件状态
/// </summary>
var KitStatus;
(function (KitStatus) {
    /// <summary>
    /// 未初始化
    /// </summary>
    KitStatus[KitStatus["Nil"] = 0] = "Nil";
    /// <summary>
    /// 初始化过程中
    /// </summary>
    KitStatus[KitStatus["Initing"] = 1] = "Initing";
    /// <summary>
    /// 已经唤醒过
    /// </summary>
    KitStatus[KitStatus["Inited"] = 2] = "Inited";
    /// <summary>
    /// 执行过程中
    /// </summary>
    KitStatus[KitStatus["Running"] = 3] = "Running";
    /// <summary>
    /// 已销毁
    /// </summary>
    KitStatus[KitStatus["Disposed"] = 4] = "Disposed";
})(KitStatus || (KitStatus = {}));

class KitBase extends Component {
    constructor() {
        super(...arguments);
        this._status = KitStatus.Nil;
    }
    get status() {
        return this._status;
    }
    sign(game) {
        this._game = game;
    }
    ;
    Init(complete) {
        this._status = KitStatus.Initing;
        console.log(this.kitName, "Init");
        this.OnInit(() => {
            this._status = KitStatus.Inited;
            complete();
        });
    }
    LateInit(complete) {
        console.log(this.kitName, "LateInit");
        this.OnLateInit(() => {
            this._status = KitStatus.Running;
            complete();
        });
    }
    Dispose() {
        console.log(this.kitName, "Dispose");
        this._status = KitStatus.Disposed;
    }
    sys(type) {
        return this._game.sys(type);
    }
}

/// <summary>
/// 系统状态
/// </summary>
var PlayStatus;
(function (PlayStatus) {
    /// <summary>
    /// 未初始化
    /// </summary>
    PlayStatus[PlayStatus["Nil"] = 0] = "Nil";
    /// <summary>
    /// 初始化过程中
    /// </summary>
    PlayStatus[PlayStatus["Initing"] = 1] = "Initing";
    /// <summary>
    /// 已经唤醒过
    /// </summary>
    PlayStatus[PlayStatus["Inited"] = 2] = "Inited";
    /// <summary>
    /// 执行过程中
    /// </summary>
    PlayStatus[PlayStatus["Running"] = 3] = "Running";
    /// <summary>
    /// 已销毁
    /// </summary>
    PlayStatus[PlayStatus["Disposed"] = 4] = "Disposed";
})(PlayStatus || (PlayStatus = {}));

class PlayBase extends Component {
    constructor() {
        super(...arguments);
        this._status = PlayStatus.Nil;
    }
    get status() {
        return this._status;
    }
    sign(game) {
        this._game = game;
    }
    ;
    Init(complete) {
        this._status = PlayStatus.Initing;
        console.log(this.playName, "Init");
        this.OnInit(() => {
            this._status = PlayStatus.Inited;
            complete();
        });
    }
    LateInit(complete) {
        console.log(this.playName, "LateInit");
        this.OnLateInit(() => {
            this._status = PlayStatus.Running;
            complete();
        });
    }
    Dispose() {
        console.log(this.playName, "Dispose");
        this._status = PlayStatus.Disposed;
    }
    sys(type) {
        return this._game.sys(type);
    }
    kit(type) {
        return this._game.kit(type);
    }
}

/// <summary>
/// 系统状态
/// </summary>
var SysStatus;
(function (SysStatus) {
    /// <summary>
    /// 未初始化
    /// </summary>
    SysStatus[SysStatus["Nil"] = 0] = "Nil";
    /// <summary>
    /// 初始化过程中
    /// </summary>
    SysStatus[SysStatus["Initing"] = 1] = "Initing";
    /// <summary>
    /// 已经唤醒过
    /// </summary>
    SysStatus[SysStatus["Inited"] = 2] = "Inited";
    /// <summary>
    /// 执行过程中
    /// </summary>
    SysStatus[SysStatus["Running"] = 3] = "Running";
    /// <summary>
    /// 已销毁
    /// </summary>
    SysStatus[SysStatus["Disposed"] = 4] = "Disposed";
})(SysStatus || (SysStatus = {}));

class SysBase extends Component {
    constructor() {
        super(...arguments);
        this._status = SysStatus.Nil;
    }
    get status() {
        return this._status;
    }
    Init(complete) {
        this._status = SysStatus.Initing;
        console.log(this.sysName, "Init");
        this.OnInit(() => {
            this._status = SysStatus.Inited;
            complete();
        });
    }
    LateInit(complete) {
        console.log(this.sysName, "LateInit");
        this.OnLateInit(() => {
            this._status = SysStatus.Running;
            complete();
        });
    }
    Dispose() {
        console.log(this.sysName, "Dispose");
        this._status = SysStatus.Disposed;
    }
}

var GameStatu;
(function (GameStatu) {
    GameStatu[GameStatu["Idle"] = 0] = "Idle";
    GameStatu[GameStatu["Loaded"] = 1] = "Loaded";
    GameStatu[GameStatu["InitingSys"] = 2] = "InitingSys";
    GameStatu[GameStatu["InitingKit"] = 3] = "InitingKit";
    GameStatu[GameStatu["InitingPlay"] = 4] = "InitingPlay";
    GameStatu[GameStatu["Running"] = 5] = "Running";
})(GameStatu || (GameStatu = {}));
class SKPGame extends Component {
    constructor() {
        super(...arguments);
        this._statu = GameStatu.Idle;
        this._sysList = [];
        this._kitList = [];
        this._playList = [];
    }
    static get me() {
        return SKPGame._me;
    }
    ;
    get statu() {
        return this._statu;
    }
    onLoad() {
        console.log(this.gamename, "onLoad");
        if (SKPGame.me) {
            console.warn("不允许多个Game同时存在，请先删除现有Game", SKPGame.me.name);
            return;
        }
        SKPGame._me = this;
        this._sysRoot = new Node("SYS_ROOT");
        this._kitRoot = new Node("KIT_ROOT");
        this._playRoot = new Node("PLAY_ROOT");
        this._kitRoot.setParent(this.node);
        this._sysRoot.setParent(this.node);
        this._playRoot.setParent(this.node);
        director.addPersistRootNode(this.node);
        this.OnAddSys(this._addSys.bind(this));
        this.OnAddKit(this._addKit.bind(this));
        this.OnAddPlay(this._addPlay.bind(this));
        this._statu = GameStatu.Loaded;
    }
    sys(type) {
        return this._sysRoot.getComponentInChildren(type);
    }
    _addSys(type) {
        const sysNode = new Node(type.name);
        sysNode.setParent(this._sysRoot);
        const sys = sysNode.addComponent(type);
        this._sysList.push(sys);
        return sys;
    }
    kit(type) {
        return this._kitRoot.getComponentInChildren(type);
    }
    _addKit(type) {
        const kitNode = new Node(type.name);
        kitNode.setParent(this._kitRoot);
        const kit = kitNode.addComponent(type);
        kit.sign(this);
        this._kitList.push(kit);
        return kit;
    }
    play(type) {
        return this._playRoot.getComponentInChildren(type);
    }
    _addPlay(type) {
        const playNode = new Node(type.name);
        playNode.setParent(this._playRoot);
        const play = playNode.addComponent(type);
        play.sign(this);
        this._playList.push(play);
        return play;
    }
    addPlay(type, onInited, onLateInited) {
        const play = this._addPlay(type);
        play.Init(() => {
            onInited === null || onInited === void 0 ? void 0 : onInited();
            play.LateInit(() => {
                onLateInited === null || onLateInited === void 0 ? void 0 : onLateInited();
            });
        });
        return play;
    }
    disposePlay(type) {
        const play = this.play(type);
        if (play) {
            const idx = this._playList.indexOf(play);
            this._playList.splice(idx, 1);
            play.Dispose();
            play.node.destroy();
        }
    }
    start() {
        console.log(this.gamename, "start");
        const asyncTask = new AsyncTask();
        asyncTask.Then((next) => {
            this._statu = GameStatu.InitingSys;
            console.time("gameInit");
            console.time("sysInit");
            next();
        });
        this._sysList.forEach(sys => asyncTask.Then(sys.Init.bind(sys)));
        this._sysList.forEach(sys => asyncTask.Then(sys.LateInit.bind(sys)));
        asyncTask.Then((next) => {
            this._statu = GameStatu.InitingKit;
            console.timeEnd("sysInit");
            console.time("kitInit");
            next();
        });
        this._kitList.forEach(kit => asyncTask.Then(kit.Init.bind(kit)));
        this._kitList.forEach(kit => asyncTask.Then(kit.LateInit.bind(kit)));
        asyncTask.Then((next) => {
            this._statu = GameStatu.InitingPlay;
            console.timeEnd("kitInit");
            console.time("playInit");
            next();
        });
        this._playList.forEach(play => asyncTask.Then(play.Init.bind(play)));
        this._playList.forEach(play => asyncTask.Then(play.LateInit.bind(play)));
        asyncTask.Start(() => {
            this._statu = GameStatu.Running;
            console.timeEnd("playInit");
            console.timeEnd("gameInit");
            this.OnEnter();
        });
    }
    update(deltaTime) {
    }
}

export { AsyncTask, KitBase, PlayBase, SKPGame, SysBase };
