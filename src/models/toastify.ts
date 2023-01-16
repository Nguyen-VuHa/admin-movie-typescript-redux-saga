export interface ToastContent {
    uuid?: string,
    position: string,
    duration: number,
    toastText: string,
    type?: string,
}

export interface Toastify {
    topRight: Array<ToastContent>,
    bottomRight: Array<ToastContent>,
    topCenter: Array<ToastContent>,
    bottomCenter: Array<ToastContent>,
    topLeft: Array<ToastContent>,
    bottomLeft: Array<ToastContent>,
}