import { faArrowLeft, faArrowRight, faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Spin } from "antd";
import { QueueProps } from "./Queue.d";
import styles from './Queue.module.scss';

export const QueueComponent = <T extends {}>({
    item, next, prev, done,
    tag, itemCount, isLoading,
    getName, getEditor, itemType, classes = styles
}: QueueProps<T>) => <>
        <Spin spinning={isLoading}>
            <div className={classes.queue}>
                <Button onClick={prev} disabled={!prev}><FontAwesomeIcon icon={faArrowLeft} /></Button>
                <span className={classes.item}>
                    <b>{tag?.name} Queue</b> ({itemCount} {itemType})<br />
                    {item ? getName(item) : `No ${itemType} in queue`}
                </span>
                <Button type="primary" onClick={done} disabled={!item}><FontAwesomeIcon icon={faCheck} /></Button>
                &nbsp;
                <Button onClick={next} disabled={!next}><FontAwesomeIcon icon={faArrowRight} /></Button>
            </div>
        </Spin>
        {item && getEditor(item)}
    </>;
