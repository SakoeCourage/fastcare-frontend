import React, { Children } from 'react';

interface IRenderinterface {
    children: React.ReactNode;
}

function Conditionalrender(props: IRenderinterface) {
    let satisfiedCondition: React.ReactNode | null = null;
    let otherwise: React.ReactNode | null = null;
    
    Children.forEach(props.children, (child) => {
        const children = child as React.ReactElement<any>;
        if (children?.type === Render.When && satisfiedCondition === null) {
            if (children.props.isTrue) {
                satisfiedCondition = children.props.children;
            }
        } else if (children?.type === Render.Else && satisfiedCondition === null) {
            otherwise = children.props.children;
        }
    });

    return satisfiedCondition || otherwise;
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
