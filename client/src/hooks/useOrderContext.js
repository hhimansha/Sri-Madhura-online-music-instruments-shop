import { OrderContext } from "../context/OrderContext"
import { useContext } from "react"

export const useOrderContext = () => {
  const context = useContext(OrderContext)

  if(!context) {
    throw Error('useOrderContext must be used inside an OrderContextProvider')
  }

  return context
}