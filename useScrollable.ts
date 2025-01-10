import { useState } from 'react';
import useMeasure from 'react-use-measure';

export declare interface IScrollable {
    ref: any;
    containerRef: any;
    x: {
        offset: number;
        left: () => void;
        right: () => void;
        canScrollLeft: boolean;
        canScrollRight: boolean;
    };
    y: {
        offset: number;
        up: () => void;
        down: () => void;
        canScrollUp: boolean;
        canScrollDown: boolean;
    };
    stop: () => void;
}

export const useScrollable = (speed: number = 1):IScrollable => {
    const [ref, {width, height}] = useMeasure();
    const [containerRef, {width: containerWidth, height: containerHeight}] = useMeasure();
    const [xOffset, setXOffset] = useState(0);
    const [yOffset, setYOffset] = useState(0);
    const [stop, setStop] = useState<() => void>(() => {});

    const canScrollLeft = xOffset < 0;
    const canScrollRight = xOffset > containerWidth - width;
    const canScrollUp = yOffset < 0;
    const canScrollDown = yOffset > containerHeight - height;

    const startScroll = (direction: 'left' | 'right' | 'up' | 'down') => () => {
        const scroll = () => {
            switch (direction) {
                case 'left':
                    setXOffset(old => old < 0 ? old + speed : old);
                    break;
                case 'right':
                    setXOffset(old => old > containerWidth - width ? old - speed : old);
                    break;
                case 'up':
                    setYOffset(old => old < 0 ? old + speed : old);
                    break;
                case 'down':
                    setYOffset(old => old > containerHeight - height ? old - speed : old);
                    break;
            }
        };
        const interval = setInterval(scroll, 10);
        setStop(() => () => clearInterval(interval));
    };    

    return {
        ref,
        containerRef,
        x: {
            offset: xOffset,
            left: startScroll('left'),
            right: startScroll('right'),
            canScrollLeft,
            canScrollRight
        },
        y: {
            offset: yOffset,
            up: startScroll('up'),
            down: startScroll('down'),
            canScrollUp,
            canScrollDown
        },
        stop,
    };
}