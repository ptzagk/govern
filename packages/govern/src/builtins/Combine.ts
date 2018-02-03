import { ComponentImplementation, ComponentImplementationLifecycle } from '../ComponentImplementation'
import { CombineChildren, CombineProps } from '../Core'
import { createElement } from '../Element'
import { Governable } from '../Governable'

export class Combine<CombinedValue> implements Governable<CombineProps<CombinedValue>, CombinedValue>, ComponentImplementationLifecycle<CombineProps<CombinedValue>, {}, CombinedValue, CombinedValue> {
    impl: ComponentImplementation<CombineProps<CombinedValue>, {}, CombinedValue, CombinedValue>;
    
    constructor(props: CombineProps<CombinedValue>) {
        this.impl = new ComponentImplementation(this, props)
    }

    subscribe() {
        // As stateless functional components are implemented using the standard
        // Component implementation, we can just return the children as-is, and
        // they'll be handled properly.
        return createElement('combine', this.impl.props)
    }

    getValue() {
        return this.impl.subs
    }

    createGovernor() {
        return this.impl.createGovernor()
    }
}