import { useState } from "react";

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