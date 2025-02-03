import { config } from "@config";
import { apiMethods } from "./methods";
import { apiServices } from "./services";
import { memoize } from "lodash";

export const api = () => apiMethods(config());

export const services = memoize(() => apiServices(api()));