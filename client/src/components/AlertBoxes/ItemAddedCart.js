import React from "react";

const ItemAddedCart = () => {
    
    return (
        <div className="fixed top-20 z-50 flex items-center justify-center w-full p-4 mb-4 text-sm text-green-800  rounded-lg">
        <div class="top-0 flex inset-0 z-50  animate-in zoom-in-50  fade-in items-center p-4 mb-4 text-sm text-green-800 border border-green-300 rounded-lg bg-white dark:text-green-600 dark:border-green-800 " role="alert">
            <svg class="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
            </svg>
            <span class="sr-only">Info</span>
            <div>
            <span class="font-medium">Item added to cart!</span>
            </div>
        </div>
        </div>
    )
}

export default ItemAddedCart;