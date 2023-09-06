enum TaskStatu {
    Idle,
    Pending,
    Stop,
    Fulfilled,
}

type Task = (call: () => void) => void;

/// <summary>
/// 一系列的 Action 依次执行
/// </summary>
export class AsyncTask {
    public statu: TaskStatu = TaskStatu.Idle;

    private m_quene: Array<Task>;
    private m_onEnd: () => void;

    constructor() {
        this.m_quene = new Array<Task>();
    }

    public Then(task: Task | Task[]): void {
        if (task instanceof Array) {
            let taskNum = task.length + 1;
            this.m_quene.push((complete) => {
                let taskDone = () => {
                    taskNum--;
                    if (taskNum < 1) complete();
                }
                task.forEach(t => { t(taskDone) })
                taskDone();
            })
        } else {
            this.m_quene.push(task);
        }
    }

    public Start(complete: () => void): void {
        this.m_onEnd = complete;
        if (this.statu == TaskStatu.Idle) {
            this.statu = TaskStatu.Pending;
            this._Next();
        }
    }

    public Stop(): void {
        if (this.statu == TaskStatu.Pending) {
            this.statu = TaskStatu.Stop;
        }
    }

    private _Next(): void {
        if (this.statu == TaskStatu.Pending) {
            if (this.m_quene.length > 0) {
                this.m_quene.shift()(this._Next.bind(this));
            } else {
                this.m_onEnd();
                this.m_onEnd = null;
                this.statu = TaskStatu.Fulfilled;
            }
        }
    }
}