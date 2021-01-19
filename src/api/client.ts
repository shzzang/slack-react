import Axios, { AxiosInstance, AxiosResponse, CancelToken } from 'axios';

// const baseURL = 'http://localhost:8000';
const baseURL = 'https://us-central1-demoapp-1779c.cloudfunctions.net/v1';

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
    date?: Date;
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
