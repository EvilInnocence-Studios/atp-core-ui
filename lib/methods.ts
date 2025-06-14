import { useLoggedInUserRaw } from "@uac/lib/login/services";
import request from "superagent";
import { IConfig, IMethods } from "./types";

const createRequest = (method: string, apiConfig:IConfig) => (url: string, bodyOrQuery: Record<string, any> = {}):request.Request => {
    const jwt = useLoggedInUserRaw.getValue()?.loginToken || "";
    const req = request(method, `${apiConfig.api.baseUrl}${url}`).set('Authorization', `Bearer ${jwt}`).accept('application/json');
    return method === 'GET'
        ? req.query(bodyOrQuery)
        : req.send(bodyOrQuery);
};
export const apiMethods = (apiConfig: IConfig):IMethods => ({
    get: createRequest('GET', apiConfig),
    post: createRequest('POST', apiConfig),
    put: createRequest('PUT', apiConfig),
    patch: createRequest('PATCH', apiConfig),
    remove: createRequest('DELETE', apiConfig),
});
