import { reset } from '../actions'

const describeReset = (reducer, expect, { fromJS }) => () => {
  it('should reset values on reset on with previous state', () => {
    const state = reducer(fromJS({
      foo: {
        values: {
          myField: 'dirtyValue',
          myOtherField: 'otherDirtyValue'
        },
        initial: {
          myField: 'initialValue',
          myOtherField: 'otherInitialValue'
        },
        fields: {
          myField: {
            touched: true
          },
          myOtherField: {
            touched: true
          }
        }
      }
    }), {
      ...reset(),
      form: 'foo'
    })
    expect(state)
      .toEqualMap({
        foo: {
          values: {
            myField: 'initialValue',
            myOtherField: 'otherInitialValue'
          },
          initial: {
            myField: 'initialValue',
            myOtherField: 'otherInitialValue'
          }
        }
      })
  })

  it('should reset deep values on reset on with previous state', () => {
    const state = reducer(fromJS({
      foo: {
        values: {
          deepField: {
            myField: 'dirtyValue',
            myOtherField: 'otherDirtyValue'
          }
        },
        initial: {
          deepField: {
            myField: 'initialValue',
            myOtherField: 'otherInitialValue'
          }
        },
        fields: {
          deepField: {
            myField: {
              touched: true
            },
            myOtherField: {
              touched: true
            }
          }
        },
        active: 'myField'
      }
    }), {
      ...reset(),
      form: 'foo'
    })
    expect(state)
      .toEqualMap({
        foo: {
          values: {
            deepField: {
              myField: 'initialValue',
              myOtherField: 'otherInitialValue'
            }
          },
          initial: {
            deepField: {
              myField: 'initialValue',
              myOtherField: 'otherInitialValue'
            }
          }
        }
      })
  })


  it('should erase values if reset called with no initial values', () => {
    const state = reducer(fromJS({
      foo: {
        values: {
          myField: 'bar'
        },
        fields: {
          myField: {
            touched: true
          }
        }
      }
    }), {
      ...reset(),
      form: 'foo'
    })
    expect(state)
      .toEqualMap({
        foo: {}
      })
  })
}

export default describeReset