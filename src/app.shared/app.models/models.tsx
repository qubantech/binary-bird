type UserInfo = {
    userId: string,
    role: string
}

export type {
    UserInfo
};

export interface Action {
    type: string,
    payload: any
}