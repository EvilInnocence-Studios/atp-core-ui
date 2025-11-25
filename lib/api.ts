import { config } from "@config";
import { memoize } from "lodash";
import { services as apiServices } from "../../services";
import { apiMethods } from "./methods";

export const api = () => apiMethods(config());

export const services = memoize(() => apiServices(api()));