import { useEffect, useRef, useState } from 'react';

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
    const ref = useRef<HTMLDivElement>();
    const containerRef = useRef<HTMLDivElement>();
    const [xOffset, setXOffset] = useState(0);
    const [yOffset, setYOffset] = useState(0);
    const [stop, setStop] = useState<() => void>(() => {});
    const [width, setWidth] = useState(ref.current?.scrollWidth || 0);
    const [height, setHeight] = useState(ref.current?.scrollHeight || 0);
    const [containerWidth, setContainerWidth] = useState(containerRef.current?.clientWidth || 0);
    const [containerHeight, setContainerHeight] = useState(containerRef.current?.clientHeight || 0);    

    // Observe the ref and containerRef for changes in their scrollWidths and scrollHeights
    // and update the width, height, containerWidth, and containerHeight accordingly
    useEffect(() => {
        const observer = new ResizeObserver(() => {
            setWidth(ref.current?.scrollWidth || 0);
            setHeight(ref.current?.scrollHeight || 0);
            setContainerWidth(containerRef.current?.clientWidth || 0);
            setContainerHeight(containerRef.current?.clientHeight || 0);
        });
        if(ref.current) {
            observer.observe(ref.current);
        }
        if(containerRef.current) {
            observer.observe(containerRef.current);
        }
        return () => observer.disconnect();
    }, [ref, containerRef]);

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