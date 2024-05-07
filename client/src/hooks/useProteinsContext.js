import { ProteinsContext } from "../context/ProteinsContext"
import { useContext } from "react"

export const useProteinsContext = () => {
  const context = useContext(ProteinsContext)

  if(!context) {
    throw Error('useProteinsContext must be used inside an ProteinsContextProvider')
  }

  return context
}