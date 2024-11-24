export interface AxiosParams {
    link: string;
    params?: Record<string, string>;
    headers?: Record<string, string>;
    body?: Record<string, any>;
}

export interface DataHolder {
    Date: Date | string,
    dateTime :  Date | string,
    Task: string,
    Start: string,
    End: string,
    Duration: string
}