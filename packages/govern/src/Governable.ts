import { InternalGovernor } from './Governor'


export interface Governable<Props, Value> {
    createGovernor(): InternalGovernor<Props, Value>;
}

export interface GovernableClass<Props, Value> {
    new (props: Props): Governable<Props, Value>;
    defaultProps?: Partial<Props>;
    displayName?: string;
}