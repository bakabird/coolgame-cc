import { _decorator, Component, Node, director } from 'cc';
import { AsyncTask } from './AsyncTask';
import { KitBase } from './KitBase';
import { PlayBase } from './PlayBase';
import { _CoolgameCCInteral } from './Define';
import { SysBase } from './SysBase';

enum GameStatu {
    Idle,
    Loaded,
    InitingSys,
    InitingKit,
    InitingPlay,
    Running,
}

type Action = () => void;
type types_constructor<T> = _CoolgameCCInteral.types_constructor<T>;

export abstract class SKPGame extends Component {
    private static _isInited: boolean = false;

    private _statu: GameStatu = GameStatu.Idle;
    public get statu(): GameStatu {
        return this._statu;
    }

    protected abstract gamename: String;

    private _sysRoot: Node;
    private _kitRoot: Node;
    private _playRoot: Node;
    private _sysList: SysBase[] = [];
    private _kitList: KitBase[] = [];
    private _playList: PlayBase[] = [];

    public onLoad() {
        console.log(this.gamename, "onLoad");
        if (SKPGame._isInited) {
            console.warn("不允许多个Game同时存在，请先删除现有Game");
            return
        }
        SKPGame._isInited = true;

        this._sysRoot = new Node("SYS_ROOT");
        this._kitRoot = new Node("KIT_ROOT");
        this._playRoot = new Node("PLAY_ROOT");
        this._kitRoot.setParent(this.node);
        this._sysRoot.setParent(this.node);
        this._playRoot.setParent(this.node);
        director.addPersistRootNode(this.node)
        this.OnAddSys(this._addSys.bind(this));
        this.OnAddKit(this._addKit.bind(this));
        this.OnAddPlay(this._addPlay.bind(this));

        this._statu = GameStatu.Loaded;
    }

    public sys<T extends SysBase>(type: types_constructor<T>): T | null {
        return this._sysRoot.getComponentInChildren(type);
    }

    private _addSys<T extends SysBase>(type: types_constructor<T>): T {
        const existSys = this.getComponentInChildren<T>(type);
        if (!existSys) {
            const sysNode = new Node(type.name);
            sysNode.setParent(this._sysRoot);
            const sys = sysNode.addComponent(type);
            sys.sign(this);
            this._sysList.push(sys);
            return sys;
        }
        existSys.node.setParent(this._sysRoot);
        existSys.sign(this);
        this._sysList.push(existSys);
        return existSys;
    }

    public kit<T extends KitBase>(type: types_constructor<T>): T | null {
        return this._kitRoot.getComponentInChildren(type);
    }

    private _addKit<T extends KitBase>(type: types_constructor<T>): T {
        const existKit = this.getComponentInChildren<T>(type);
        if (!existKit) {
            const kitNode = new Node(type.name);
            kitNode.setParent(this._kitRoot);
            const kit = kitNode.addComponent(type);
            kit.sign(this);
            this._kitList.push(kit);
            return kit;
        }
        existKit.node.setParent(this._kitRoot);
        existKit.sign(this);
        this._kitList.push(existKit);
        return existKit;
    }

    public play<T extends PlayBase>(type: types_constructor<T>): T | null {
        return this._playRoot.getComponentInChildren(type);
    }

    private _addPlay<T extends PlayBase>(type: types_constructor<T>): T {
        const existPlay = this.getComponentInChildren<T>(type);
        if (!existPlay) {
            return this._internal_newPlay(type);
        }
        existPlay.node.setParent(this._playRoot);
        existPlay.sign(this);
        this._playList.push(existPlay);
        return existPlay;
    }

    private _internal_newPlay<T extends PlayBase>(type: types_constructor<T>): T {
        const playNode = new Node(type.name);
        playNode.setParent(this._playRoot);
        const play = playNode.addComponent(type);
        play.sign(this)
        this._playList.push(play);
        return play;
    }

    public addPlay<T extends PlayBase>(type: types_constructor<T>, onInited: Action, onLateInited: Action): T {
        const play = this._internal_newPlay(type);
        play.Init(() => {
            onInited?.();
            play.LateInit(() => {
                onLateInited?.();
            })
        })
        return play;
    }

    public disposePlay<T extends PlayBase>(type: types_constructor<T>) {
        const play = this.play(type);
        if (play) {
            const idx = this._playList.indexOf(play);
            this._playList.splice(idx, 1);
            play.Dispose();
            play.node.destroy();
        }
    }

    /**
     * Add Sys Here
     */
    protected abstract OnAddSys(addSys: <T extends SysBase>(type: types_constructor<T>) => T): void;
    /**
     * Add Kit Here
     */
    protected abstract OnAddKit(addKit: <T extends KitBase>(type: types_constructor<T>) => T): void;
    /**
     * Add Play Here
     */
    protected abstract OnAddPlay(addPlay: <T extends PlayBase>(type: types_constructor<T>) => T): void;
    /**
     * Game's Entry.
     * Any Sys/Kit/Play can be used after that.
     */
    protected abstract OnEnter(): void;

    public start() {
        console.log(this.gamename, "start");
        const asyncTask = new AsyncTask();
        asyncTask.Then((next) => {
            this._statu = GameStatu.InitingSys;
            console.time("gameInit")
            console.time("sysInit")
            next();
        })
        this._sysList.forEach(sys => asyncTask.Then(sys.Init.bind(sys)));
        this._sysList.forEach(sys => asyncTask.Then(sys.LateInit.bind(sys)));
        asyncTask.Then((next) => {
            this._statu = GameStatu.InitingKit;
            console.timeEnd("sysInit")
            console.time("kitInit");
            next();
        });
        this._kitList.forEach(kit => asyncTask.Then(kit.Init.bind(kit)));
        this._kitList.forEach(kit => asyncTask.Then(kit.LateInit.bind(kit)));
        asyncTask.Then((next) => {
            this._statu = GameStatu.InitingPlay;
            console.timeEnd("kitInit");
            console.time("playInit")
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

    public update(deltaTime: number) {
    }

}


