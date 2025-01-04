import { useState } from "react";

export declare interface IModal {
    visible:boolean;
    open:() => void;
    close:() => void;
}

export const useModal = ():IModal => {
    const [visible, setVisible] = useState(false);
    const open = () => setVisible(true);
    const close = () => setVisible(false);
    return { visible, open, close };
}