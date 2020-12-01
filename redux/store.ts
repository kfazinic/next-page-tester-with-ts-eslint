import { createWrapper, HYDRATE } from 'next-redux-wrapper'
import { combineReducers, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage/session'

const SET_FOO = 'SET_FOO'

type FooState = {
  foo: boolean
}

const initialState: FooState = {
  foo: false,
}

function fooReducer(
  state: FooState = initialState,
  action: { type: string; payload: { foo: boolean } }
): FooState {
  const { type, payload } = action

  switch (type) {
    case HYDRATE:
      return {
        ...state,
        ...payload,
      }

    case SET_FOO: {
      return {
        ...state,
        foo: payload.foo,
      }
    }

    default: {
      return state
    }
  }
}
const reducers = combineReducers<{ fooReducer: FooState }>({
  fooReducer,
})

function initStore() {
  let store

  if (typeof window !== 'undefined') {
    const persistConfig = {
      key: 'root',
      storage,
    }

    store = createStore(
      persistReducer(persistConfig, reducers),
      composeWithDevTools()
    )
    store.__PERSISTOR = persistStore(store)
  } else {
    store = createStore(reducers, composeWithDevTools())
  }

  return store
}

export const wrapper = createWrapper(initStore)
