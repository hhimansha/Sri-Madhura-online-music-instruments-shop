import { RentalItemContext } from "../context/rentalItemContext";
import { useContext } from "react";

export const useRentalItemContext = () => {
    const context = useContext(RentalItemContext);

    if(!context){
        throw new Error('useRentalItemContext must be used within a RentalItemProvider');
    }

    return context; // Don't forget to return the context
}