import React, { ReactNode } from 'react'
import { useStore } from "react-redux"
import { Persistor } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'

import { wrapper } from '../redux/store'

type RootProps = {
  Component: React.ComponentType
  pageProps: { children?: ReactNode }
}

// eslint-disable-next-line @typescript-eslint/interface-name-prefix
interface IStore {
  __PERSISTOR: Persistor
}

const Root = ({ Component, pageProps }: RootProps) => {
  const store: IStore = (useStore() as unknown) as IStore
  const { __PERSISTOR } = store

  const content = <Component {...pageProps} />

  return <PersistGate persistor={__PERSISTOR}>{content}</PersistGate>
}

export default wrapper.withRedux(Root)
