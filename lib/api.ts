import { config } from "@config";
import { memoize } from "lodash";
import { apiServices } from "src/services";
import { apiMethods } from "./methods";

export const api = () => apiMethods(config());

export const services = memoize(() => apiServices(api()));