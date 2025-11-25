import { createContext, useState, useContext } from "react";

// Creating Context
const CartContext = createContext();

// Using the context we created
export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error(`Use Cart Must Be Used WithIn a CartProvider`)
    }
    return context;
}

// Creating card provider and exporting cartContextProvider
export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    // Function for adding cart Items
    const addToCart = (product) => {
        setCartItems(prevItems => {
            const existItem = prevItems.find(item => item.id === product.id);
            if (existItem) {
                return prevItems.map(item => 
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                )
            }
            return [...prevItems, { ...product, quantity: 1 }]
        })
    }

    // Function for removing cart Items
    const removeFromCart = (productId) => {
        setCartItems(prevItems => prevItems.filter(item => item.id !== productId))
    }

    // Function for updating cart quantity
    const updateQuantity = (productId, newQuantity) => {
        if(newQuantity <= 0){
            removeFromCart(productId)
            return;
        }

        setCartItems(prevItems => (
            prevItems.map(item => 
                item.id === productId ? {...item, quantity: newQuantity} : item
            )
        ))
    }

    // Function for getting cart total
    const getCartTotal = () => {
        return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    // Function for getting cart Items Count
    const getCartItemsCount = () => {
        return cartItems.reduce((total, item) => total + item.quantity, 0);
    }

    // Config values
    const value = {
        cartItems, 
        addToCart,
        removeFromCart,
        updateQuantity,
        getCartTotal,
        getCartItemsCount
    };

    return (
        <CartContext.Provider value = {value}>
            {children}
        </CartContext.Provider>
    )
}
