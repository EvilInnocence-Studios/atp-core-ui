import { commonServices } from "@common/lib/services";
import { uacServices } from "@uac/lib/services";
import { IMethods } from "./types.d";

export const apiServices = (methods:IMethods) => ({
    ...commonServices(methods),
    ...uacServices(methods),
});