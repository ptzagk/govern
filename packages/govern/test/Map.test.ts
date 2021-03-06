import { map, combine, constant, createElement, instantiate, Component, SFC } from '../src'
import { createModelClass } from './utils/createModelClass'
import { createTestHarness } from './utils/createTestHarness'
import { createCounter, createCounterClass } from './utils/createCounter';

describe('Map', () => {
  class Double extends Component<{x: number}> {
    publish() {
        return this.props.x*2
    }
  }

  it("doesn't flattern the result", () => {
    class Test extends Component<{a: string}> {
      publish() {
          return { b: this.props.a }
      }
    }

    let element = map(createElement(Test, { a: 'test' }), output => combine({ c: output.b }))
    let store = instantiate(element)
    let harness = createTestHarness(store)

    expect(harness.value).toEqual(combine({ c: 'test' }))
  })

  it("can map to a child of a combined and flattened store", () => {
    class InnerStore extends Component {
      publish() {
        return {
          name: 'bob'
        }
      }
    }

    class OuterStore extends Component {
      subscribe() {
        return combine({
          inner: createElement(InnerStore)
        })
      }

      publish() {
        return this.subs
      }
    }

    function Flatten(props) {
      return props.children
    }

    let store = instantiate(createElement(OuterStore))
    let mappedElement = store.map(x => x.inner)
    let flat = createElement(Flatten, {
      children: mappedElement
    })
    let mappedStore = instantiate(flat)

    expect(mappedStore.getValue()).toEqual({ name: 'bob' })
  })
})