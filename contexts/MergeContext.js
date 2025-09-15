// contexts/MergeContext.js
import { createContext, useContext, useState } from 'react'

const MergeContext = createContext()

export function MergeProvider({ children }) {
  const [mergeFiles, setMergeFiles] = useState([])

  return (
    <MergeContext.Provider value={{ mergeFiles, setMergeFiles }}>
      {children}
    </MergeContext.Provider>
  )
}

export const useMerge = () => {
  const context = useContext(MergeContext)
  if (!context) {
    throw new Error('useMerge must be used within MergeProvider')
  }
  return context
}