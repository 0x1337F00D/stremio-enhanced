export type PluginOptionValue = boolean | string | number;

interface PluginOptionBase {
    id: string;
    label: string;
    description?: string;
}

export interface BooleanPluginOption extends PluginOptionBase {
    type: "boolean";
    default: boolean;
}

export interface TextPluginOption extends PluginOptionBase {
    type: "text";
    default: string;
    placeholder?: string;
    maxLength?: number;
}

export interface NumberPluginOption extends PluginOptionBase {
    type: "number";
    default: number;
    min?: number;
    max?: number;
    step?: number;
}

export interface SelectPluginOptionChoice {
    value: string;
    label: string;
}

export interface SelectPluginOption extends PluginOptionBase {
    type: "select";
    default: string;
    choices: SelectPluginOptionChoice[];
}

export type PluginOptionDefinition =
    | BooleanPluginOption
    | TextPluginOption
    | NumberPluginOption
    | SelectPluginOption;

export type PluginOptionValues = Record<string, PluginOptionValue>;
