import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Tabs } from "antd";

export declare interface ITabPluginProps<P> {
    key: string;
    title: string;
    priority: number;
    icon: IconDefinition;
    component: React.ComponentType<P>;
}

const registerTabPlugin = <P extends {}>(slots: ITabPluginProps<P>[]) => (plugin:ITabPluginProps<P>) => {
    slots.push(plugin);
    slots.sort((a, b) => b.priority - a.priority);
}

export declare interface ITabPluginRenderProps {
    defaultActiveKey?: string;
    onChange?: (key: string) => void;
}

const render = <P extends {}>(slots: ITabPluginProps<P>[]) => ({defaultActiveKey, onChange, ...tabProps}:ITabPluginRenderProps & P) => 
    <Tabs defaultActiveKey={defaultActiveKey} onChange={onChange} tabPosition="left">
        {slots.map(({ key, title, icon, component: Component }) => (
            <Tabs.TabPane tab={<><FontAwesomeIcon icon={icon} /> {title}</>} key={key}>
                <Component {...tabProps as P} />
            </Tabs.TabPane>
        ))}
    </Tabs>;

export const tabPlugins = <P extends {}>() => {
    const slots = [] as ITabPluginProps<P>[];
    return {
        register: registerTabPlugin(slots),
        render: render(slots),
    };
}
