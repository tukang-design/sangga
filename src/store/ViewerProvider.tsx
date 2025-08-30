import { createContext, useContext, ReactNode } from 'react'
import { useViewerStore, ViewerState, ViewerActions } from './ViewerStore'

type ViewerStoreType = ViewerState & ViewerActions

const ViewerContext = createContext<ViewerStoreType | null>(null)

export const ViewerProvider = ({ children }: { children: ReactNode }) => {
  const store = useViewerStore()
  
  return (
    <ViewerContext.Provider value={store}>
      {children}
    </ViewerContext.Provider>
  )
}

export const useViewer = () => {
  const store = useContext(ViewerContext)
  if (!store) {
    throw new Error('useViewer must be used within ViewerProvider')
  }
  return store
}
