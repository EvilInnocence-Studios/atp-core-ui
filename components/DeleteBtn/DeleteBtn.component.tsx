import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Popconfirm, Typography } from "antd";
import clsx from "clsx";
import { DeleteBtnProps } from "./DeleteBtn";
import styles from './DeleteBtn.module.scss';
import { overridable } from "@core/lib/overridable";

export const DeleteBtnComponent = overridable(({onClick, entityType}:DeleteBtnProps) => 
    <Popconfirm onPopupClick={e => {e.stopPropagation();}} onConfirm={onClick} title={`Are you sure you want to delete this ${entityType}`}>
        <Button type="link" className={clsx([styles.deleteBtn, "deleteBtn"])} onClick={e => {e.stopPropagation();}}>
            <Typography.Text type="danger">
                <FontAwesomeIcon icon={faTrashCan} />
            </Typography.Text>
        </Button>
    </Popconfirm>
);
