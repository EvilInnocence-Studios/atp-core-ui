import { uacServices } from "@uac/lib/services";
import { IMethods } from "./types.d";

export const apiServices = (methods:IMethods) => ({
    ...uacServices(methods),
});