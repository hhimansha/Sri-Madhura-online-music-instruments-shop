import { createContext, useReducer } from "react";

export const RentalItemContext = createContext();

export const RentalItemProvider = ({ children }) => {
    const [state, dispatch] = useReducer(RentalItemReducer, {
        rentalItems: [],
        rentalItem: {}, // This may need to be removed, depending on your requirements
        loading: true,
    });

    return (
        <RentalItemContext.Provider value={{ ...state, dispatch }}>
            {children}
        </RentalItemContext.Provider>
    );
};

export const RentalItemReducer = (state, action) => {
    switch (action.type) {
        case "GET_RENTAL_ITEMS":
            return {
                ...state,
                rentalItems: action.payload,
                loading: false,
            };
        case "GET_RENTAL_ITEM":
            return {
                ...state,
                rentalItem: action.payload,
                loading: false,
            };
        case "ADD_RENTAL_ITEM":
            return {
                ...state,
                rentalItems: [action.payload, ...state.rentalItems],
                loading: false,
            };
        case "DELETE_RENTAL_ITEM":
            return {
                ...state,
                rentalItems: state.rentalItems.filter(
                    (rentalItem) => rentalItem._id !== action.payload
                ),
                loading: false,
            };
        case "UPDATE_RENTAL_ITEM":
            return {
                ...state,
                rentalItems: state.rentalItems.map((rentalItem) =>
                    rentalItem._id === action.payload._id ? action.payload : rentalItem
                ),
                loading: false,
            };
        default:
            return state;
    }
};
