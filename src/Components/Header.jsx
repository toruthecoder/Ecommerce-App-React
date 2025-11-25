
/* Classes used in header for css : 'head', 'wrapper', 'sub-wrapper-1', 'nav', 'sub-wrapper-2', 'sn1' , 'sn2' */

import { useCart } from '../Context/CartContext';
import { FaShoppingCart } from 'react-icons/fa';

const Header = ({ currentCategory, onCategoryChange }) => {
    const { getCartItemsCount } = useCart();

    return (
        <header className='head'>
            <div className='wrapper'>
                <div className='sub-wrapper-1'>
                    <h1>
                        Frozen
                    </h1>

                    <nav className='nav'>
                        {['all', 'electronics', "men's clothing", "women's clothing", "jewelery", 'home'].map((category) => (
                            <button key={category} onClick={() => onCategoryChange(category)}
                                style={{
                                    background: 'none',
                                    border: 'none',
                                    color: currentCategory === category ? '#00b7eb' : '#7f8c8d',
                                    cursor: 'pointer',
                                    fontWeight: currentCategory === category ? '600' : '400',
                                    fontSize: '1rem',
                                    padding: '0.5rem 0',
                                    borderBottom: currentCategory === category ? '2px solid #00b7eb' : 'none',
                                    transition: 'all 0.3s ease'
                                }}
                            >
                                {category.charAt(0).toUpperCase() + category.slice(1)}
                            </button>
                        ))}
                    </nav>
                </div>

                <div className='sub-wrapper-2'>
                    <span className='sn1'>
                        <FaShoppingCart/>
                    </span>
                    {getCartItemsCount() > 0 && (
                        <span className='sn2'>
                            {getCartItemsCount()}
                        </span>
                    )}
                </div>
            </div>
        </header>
    )
}

export default Header
