import { config } from "@config";
import { apiMethods } from "./methods";
import { apiServices } from "./services";

export const api = () => apiMethods(config());

export const services = () => apiServices(api());