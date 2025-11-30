import { Col as AntDCol, Row as AntDRow } from "antd";
import React from "react";
import { ComponentRegistry, containerLayoutComponent } from "./layout/componentRegistry";

const Col = containerLayoutComponent(AntDCol);
const Row = containerLayoutComponent(AntDRow);

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

const standardTags = [
    "div", "span", "p", "h1", "h2", "h3", "h4", "h5", "h6", "ul", "ol", "li", "a", "button", "form", "label", "section", "header", "footer", "nav", "article", "aside", "main", "table", "tr", "td", "th", "thead", "tbody"
];

const voidTags = [
    "img", "input", "br", "hr"
];

standardTags.forEach(tag => {
    const Wrapper = (props: React.HTMLAttributes<HTMLElement>) => React.createElement(tag, props);
    const Component = containerLayoutComponent(Wrapper);
    ComponentRegistry.register(capitalize(tag), Component, { category: "HTML Elements", displayName: capitalize(tag) });
});

voidTags.forEach(tag => {
    const Wrapper = (props: React.HTMLAttributes<HTMLElement>) => {
        const { children, ...rest } = props as any;
        return React.createElement(tag, rest);
    };
    const Component = containerLayoutComponent(Wrapper);
    ComponentRegistry.register(capitalize(tag), Component, { category: "HTML Elements", displayName: capitalize(tag) });
});

ComponentRegistry.register("Col", Col, { category: "Layouts", displayName: "Col" });
ComponentRegistry.register("Row", Row, { category: "Layouts", displayName: "Row" });
