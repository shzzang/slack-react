import Axios, { AxiosInstance, AxiosResponse, CancelToken } from 'axios';

const baseURL = 'http://localhost:8000';

const instance: AxiosInstance = Axios.create({
    baseURL,
    timeout: 10000,
});

export interface IMessage {
    id?: string;
    body?: string;
    user?: {
        id?: string;
        name?: string;
        avatar?: string;
    };
    data?: Date;
}

export const fetchMessages = (
    channelName: string,
    params = {},
    cancelToken: CancelToken = null
): Promise<AxiosResponse<{ messages: IMessage[] }>> => {
    return instance.get(`/channels/${channelName}/messages`, {
        params,
        cancelToken,
    });
};
