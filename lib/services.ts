import { commonServices } from "@common/lib/services";
import { uacServices } from "@uac/lib/services";
import { IMethods } from "./types.d";
import { storeServices } from "@store/services";

// TODO: Move this into main app config
export const apiServices = (methods:IMethods) => ({
    ...commonServices(methods),
    ...uacServices(methods),
    ...storeServices(methods),
});