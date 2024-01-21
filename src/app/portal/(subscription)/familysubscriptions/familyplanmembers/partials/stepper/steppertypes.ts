import React from "react";

export type getCurrentStep = () => Step | undefined
export type onNextStep = () => void;
export type onPrevStep = () => void;
export type isLastStep = () => boolean;
export type isFirstStep = () => boolean;
export type onStepChange = (currentstep: Step) => void

export type Step = {
    label: string | React.ReactNode,
    component: React.FC<Partial<stepperApi>>
}
export interface stepperApi {
    getCurrentStep: getCurrentStep;
    onNextStep: onNextStep;
    onPrevStep: onPrevStep;
    isLastStep: isLastStep;
    isFirstStep: isFirstStep;

}
export type stepperOptions = {
    scrollable?: {
        enable: boolean,
        scrollableElement: string,
        offset?: number,
    }
}
export interface IStepperOPtions {
    steps: Step[]
    onStepChange?: onStepChange
    options?: stepperOptions
}