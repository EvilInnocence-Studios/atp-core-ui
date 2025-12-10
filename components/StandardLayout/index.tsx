import { SlotRenderer } from "@core/components/SlotRenderer";
import { ILayoutComponent } from "@core/lib/layout/layout";
import { Layout } from "antd";
import { Index } from "ts-functional/dist/types";
import styles from './StandardLayout.module.scss';

export const StandardLayout = ({ slots, layoutId }: { slots?: Index<ILayoutComponent[]>, layoutId?: string }) =>
    <Layout style={{ height: '100%' }}>
        <SlotRenderer slots={slots?.header} parentId={layoutId} slotName="header" />
        <Layout.Content className={styles.content}>
            <SlotRenderer slots={slots?.content} parentId={layoutId} slotName="content" />
        </Layout.Content>
        <Layout.Footer style={{ position: "relative" }}>
            <SlotRenderer slots={slots?.footer} parentId={layoutId} slotName="footer" />
        </Layout.Footer>
    </Layout>;
