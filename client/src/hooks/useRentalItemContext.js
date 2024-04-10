import { RentalItemContext } from "../context/rentalItemContext";
import { useContext } from "react";

export const userRentalItemContext = () => {
    const context = useContext(RentalItemContext);

    if(!context){
        throw new Error('useRentalItemContext must be used within a RentalItemProvider');
    }
}