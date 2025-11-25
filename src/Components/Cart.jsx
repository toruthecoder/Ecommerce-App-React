/* Classes used in header for css : btn1 , btn2 , btn3 , btn4, btn5 , main-wrapper, main-sub-wrapper,
main-sub-wrapper-1 , sub-mian-wrapper, c-wrapper, ca-wrapper */

import { useState, useRef, useEffect } from 'react';
import { useCart } from '../Context/CartContext';
import { FaShoppingCart, FaTimes } from 'react-icons/fa';
import { FaMinus, FaPlus } from "react-icons/fa6";
import { IoTrashBin } from "react-icons/io5";
import { toast } from 'react-toastify';

const Cart = () => {
    const {
        cartItems,
        removeFromCart,
        updateQuantity,
        getCartTotal
    } = useCart();

    const [isOpen, setIsOpen] = useState(false);
    const cartRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (isOpen && cartRef.current && !cartRef.current.contains(e.target)) {
                setIsOpen(false);
            }
        }

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return (() => {
            document.removeEventListener('mousedown', handleClickOutside)
        })
    }, [isOpen]);

    const handleRemoveFromCart = (itemId, itemTitle) => {
        removeFromCart(itemId);
        toast.warning(`"${itemTitle}" removed from cart!`, {
            position: "bottom-left",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        })
    }


    if (!isOpen) {
        return (
            <button onClick={() => setIsOpen(true)} className='btn1'>
                <FaShoppingCart className='fa-shop' />
            </button>
        )
    }

    return (
        <div className='main-wrapper' ref={cartRef}>
            <div className='main-sub-wrapper'>
                <h2>Your Cart</h2>
                <button onClick={() => setIsOpen(false)}>
                    <FaTimes color='#7f8c8d' />
                </button>
            </div>

            <div className='main-sub-wrapper-1'>
                {
                    cartItems.length === 0 ? (
                        <p style={{ textAlign: 'center', color: '#7f8c8d' }}>
                            Your Cart Is Empty
                        </p>
                    ) : (
                        cartItems.map(item => (
                            <div key={item.id} className='sub-mian-wrapper'>
                                <img src={item.image} alt={item.title}
                                    style={{
                                        width: '60px',
                                        height: '60px',
                                        objectFit: 'cover',
                                        borderRadius: '4px',
                                        marginRight: '1rem'
                                    }}
                                />

                                <div style={{ flex: 1 }}>
                                    <h4>{item.title}</h4>
                                    <p>${item.price}</p>
                                </div>

                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <button className='btn2' onClick={() => updateQuantity(item.id, item.quantity - 1)} disabled={item.quantity <= 1}>
                                        <FaMinus />
                                    </button>

                                    <span style={{
                                        padding: '0 0.5rem',
                                        minWidth: '30px',
                                        textAlign: 'center'
                                    }}>{item.quantity}</span>

                                    <button className='btn3' onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                                        <FaPlus />
                                    </button>
                                </div>

                                <button className='btn4' onClick={() => handleRemoveFromCart(item.id, item.title)}>
                                    <IoTrashBin />
                                </button>
                            </div>
                        ))
                    )}
            </div>

            {cartItems.length > 0 && (
                <div className='c-wrapper'>
                    <div className='ca-wrapper'>
                        <span>Total:</span>
                        <span>${getCartTotal().toFixed(2)}</span>
                    </div>

                    <button className='btn5'>
                        Checkout
                    </button>
                </div>
            )}
        </div>
    )
}
export default Cart
