/* Classes used in header for css : pc-wrapper, pc, pcd */

import { useCart } from '../Context/CartContext'
import { toast } from 'react-toastify';

const ProductCard = ({ product }) => {
    const { addToCart } = useCart();

    const handleAddToCart = (product) => {
        addToCart(product);
        toast.success(`"${product.title} added to cart!`, {
            position: "bottom-left",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        })
    }

    const renderStars = (rating) => {
        const ratingValue = typeof rating === 'object' ? rating.rate : rating;

        return Array.from({ length: 5 }, (_, index) => (
            <span key={index}
                style={{
                    color:
                        index < Math.floor(ratingValue) ? '#f39c12' :
                            '#bdc3c7',
                    fontSize: '1rem'
                }}>
                ★
            </span>
        ));
    }

    return (
        <div
            className='pc-wrapper'
            onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.boxShadow = '0 12px 20px rgba(0, 0, 0, 0.15)';
            }}

            onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.05)';
            }}>

            <img
                src={product.image} alt={product.title}
            />

            <div className='pc'>
                <h3>{product.title}</h3>
                <p>{product.description}</p>

                <div>
                    <div>
                        {renderStars(product.rating)}
                        <span>
                            {typeof product.rating === 'object' ? product.rating.rate : product.rating}
                            {
                                typeof product.rating === 'object' && product.rating.count && (
                                    <span style={{ fontSize: '0.8rem', color: '#666', marginLeft: '5px' }}>
                                        ({product.rating.count} reviews)
                                    </span>
                                )}
                        </span>
                    </div>
                </div>

                <div className='pcd'>
                    <span>${product.price}</span>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            handleAddToCart(product)
                        }}
                        onMouseOver={(e) => {
                            e.target.style.transform = 'scale(1.05)';
                            e.target.style.boxShadow = '0 6px 20px rgba(102, 126, 234, 0.4)';
                        }}
                        onMouseOut={(e) => {
                            e.target.style.transform = 'scale(1)';
                            e.target.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.3)';
                        }}
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ProductCard
