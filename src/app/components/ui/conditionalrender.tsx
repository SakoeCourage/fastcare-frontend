import React, { Children } from 'react';

interface IRenderinterface {
    children: React.ReactNode;
}

function Conditionalrender(props: IRenderinterface) {
    let satisfiedConditions: React.ReactNode[] = [];
    let otherwise: React.ReactNode | null = null;

    Children.forEach(props.children, (child) => {
        const children = child as React.ReactElement<any>;
        if (children?.type === Render.When && children.props.isTrue) {
            satisfiedConditions.push(children.props.children);
        } else if (children?.type === Render.Else && satisfiedConditions.length === 0) {
            otherwise = children.props.children;
        }
    });

    return satisfiedConditions.length > 0 ? satisfiedConditions : otherwise;
}

export default Conditionalrender;

interface IRendererWhen {
    isTrue: boolean;
    children: React.ReactNode;
}

interface IRendererElse {
    children: React.ReactNode;
}

export const Render = {
    When: ({ isTrue, children }: IRendererWhen) => isTrue ? children : null,
    Else: ({ children }: IRendererElse) => children,
};
