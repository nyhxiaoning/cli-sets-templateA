// 防抖(ts)
export class Debounced {
    /** * @param func 须要包装的函数 * @param delay 延迟时间，单位ms * @param immediate 是否默认执行一次(第一次不延迟) */
    public use =  (func: Function, delay: number, immediate = false): Function => {
        let timer: any;
        return (...args: any) => {
            if (immediate) {
                func.apply(this, args); // 确保引用函数的指向正确，而且函数的参数也不变
                immediate = false;
                return;
            }
            clearTimeout(timer);
            timer = setTimeout(() => {
                func.apply(this, args);
            }, delay);
        };
    };
}

// 节流(ts)
export class Throttle {
    // private timer: number | undefined
    private timer: any;
    private stop = false;
    private death = false;
    /** * @param func 须要包装的函数 * @param delay 延迟时间，单位ms * @param immediate 是否默认执行一次(第一次不延迟) */
    public use(func: Function, delay: number, immediate = false): Function {
        let flag = true;
        const self = this;
        return (...args: any) => {
            if (this.death) {
                func.apply(this, args);
                return;
            }
            if (this.stop) {
                func.apply(this, args);
                return;
            }
            if (immediate) {
                func.apply(this, args);
                immediate = false;
                return;
            }
            if (!flag) {
                return;
            }
            flag = false;
            self.timer = setTimeout(() => {
                func.apply(this, args);
                flag = true;
            }, delay);
        };
    }

    // 销毁
    public destroy() {
        this.death = true;
        this.stop = true;
        if (!!this.timer) {
            clearTimeout(this.timer);
            this.timer = undefined;
        }
    }
    // 开启
    public open() {
        if (!this.death) {
            this.stop = false;
        }
    }
    // 关闭
    public close() {
        this.stop = true;
    }
}