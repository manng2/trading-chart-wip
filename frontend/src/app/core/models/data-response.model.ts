export interface DataResponse<T> {
    status: string;
    message: string;
    data: T;
}