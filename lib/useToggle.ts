import { useState } from "react";
import { Index } from "ts-functional/dist/types";

export declare interface IToggle {
    isset:boolean;
    toggle:() => void;
    on:() => void;
    off:() => void;
}

export const useToggle = (initialValue:boolean = false):IToggle => {
    const [isset, setIsset] = useState(initialValue);
    const toggle = () => setIsset(!isset);
    const on = () => setIsset(true);
    const off = () => setIsset(false);

    return { isset, toggle, on, off };
}

export declare interface IGroupToggle {
    isset: (groupId:string) => boolean;
    toggle: (groupId:string) => void;
    on: (groupId:string) => void;
    off: (groupId:string) => void;
}

export const useToggleList = (initialValues:Index<boolean>):IGroupToggle => {
    const [isset, setIsset] = useState(initialValues);
    const toggle = (groupId:string) => setIsset({...isset, [groupId]: !isset[groupId]});
    const on = (groupId:string) => setIsset({...isset, [groupId]: true});
    const off = (groupId:string) => setIsset({...isset, [groupId]: false});

    return {
        isset: (groupId:string) => isset[groupId],
        toggle, on, off
    };
}