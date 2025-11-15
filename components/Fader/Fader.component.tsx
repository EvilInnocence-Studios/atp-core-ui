import { useEffect, useState } from 'react';
import { FaderProps } from "./Fader.d";
import styles from './Fader.module.scss';
import { overridable } from '@core/lib/overridable';

export const FaderComponent = overridable(({ interval, children }: FaderProps) => {
    const [curIndex, setCurIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurIndex((curIndex + 1) % children.length);
        }, interval * 1000);

        return () => clearInterval(timer);
    }, [curIndex, interval, children.length]);

    return <>
        {children.map((child, index) => <div className={styles.faderElement} style={{
            opacity: index === curIndex ? 1 : 0,
        }}>
            {child}
        </div>)}
    </>;
});
