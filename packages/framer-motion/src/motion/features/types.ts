import * as React from "react"
import { MotionProps } from "../types"
import { VisualState } from "../utils/use-visual-state"
import { VisualElement } from "../../render/VisualElement"
import { CreateVisualElement } from "../../render/types"

/**
 * @public
 */
export interface FeatureProps<T = unknown> extends MotionProps {
    visualElement: VisualElement<T>
}

export type FeatureNames = {
    animation: true
    exit: true
    drag: true
    tap: true
    focus: true
    hover: true
    pan: true
    inView: true
    measureLayout: true
}

export type FeatureComponent = React.ComponentType<
    React.PropsWithChildren<FeatureProps>
>

/**
 * @public
 */
export interface FeatureDefinition {
    isEnabled: (props: MotionProps) => boolean
    Component?: FeatureComponent
}

export interface FeatureComponents {
    animation?: FeatureComponent
    exit?: FeatureComponent
    drag?: FeatureComponent
    tap?: FeatureComponent
    focus?: FeatureComponent
    hover?: FeatureComponent
    pan?: FeatureComponent
    inView?: FeatureComponent
    measureLayout?: FeatureComponent
}

export interface FeatureBundle extends FeatureComponents {
    renderer: CreateVisualElement<any>
    projectionNodeConstructor?: any
}

export type LazyFeatureBundle = () => Promise<FeatureBundle>

export type FeatureDefinitions = {
    [K in keyof FeatureNames]: FeatureDefinition
}

export type LoadedFeatures = FeatureDefinitions & {
    projectionNodeConstructor?: any
}

export type RenderComponent<Instance, RenderState> = (
    Component: string | React.ComponentType<React.PropsWithChildren<unknown>>,
    props: MotionProps,
    projectionId: number | undefined,
    ref: React.Ref<Instance>,
    visualState: VisualState<Instance, RenderState>,
    visualElement?: VisualElement<Instance>
) => any
