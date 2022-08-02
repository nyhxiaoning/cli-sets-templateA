declare type IUser = {
    username: string;
    password: string;
};
export declare const userApi: {
    httpFn: () => import("./httpaxios").HttpService;
    addFn: () => (a: number, b: number) => number;
    getUserFn: () => Promise<unknown>;
    createUserFn: () => Promise<(<T>(data: IUser) => Promise<T>)>;
    getCommentScheduleWeekFn: () => Promise<() => Promise<any>>;
    getCommentScheduleDayFn: () => Promise<() => Promise<any>>;
    getSingleMusicDetailsFn: () => Promise<(data: any) => Promise<any>>;
    getTextbook: () => Promise<any>;
    getSection: () => Promise<any>;
    getQuestion: () => Promise<any>;
};
export {};
//# sourceMappingURL=index.d.ts.map