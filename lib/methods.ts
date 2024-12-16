import request from "superagent";
import { IApiConfig, IMethods } from "./types";
import { useLoggedInUser } from "@uac/lib/login/services";

const createRequest = (method: string, apiConfig:IApiConfig) => (url: string, bodyOrQuery: Record<string, any> = {}):request.Request => {
    const jwt = useLoggedInUser.getValue().loginToken;
    const req = request(method, `${apiConfig.api.baseUrl}${url}`).set('Authorization', `Bearer ${jwt}`).accept('application/json');
    return method === 'GET'
        ? req.query(bodyOrQuery)
        : req.send(bodyOrQuery);
};
export const apiMethods = (apiConfig: IApiConfig):IMethods => ({
    get: createRequest('GET', apiConfig),
    post: createRequest('POST', apiConfig),
    put: createRequest('PUT', apiConfig),
    patch: createRequest('PATCH', apiConfig),
    remove: createRequest('DELETE', apiConfig),
});
