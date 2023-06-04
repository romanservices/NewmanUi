import { Api } from './newman-api';


export const useApi = () => {
    const api = new Api({
        baseUrl:"https://localhost:5001"
      });

    return api.api;
};
