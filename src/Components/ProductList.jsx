/* Classes used in header for css :  pl-wrapper, pl-subWrapper, pl-sub-wrapper, pl-sub-wrapper1, pl-sub-wrapper2
, pl-sub-wrapper3 , pl-sub-sub-wrapper3, pl-sub-wrapper4
*/

import { useState, useEffect } from 'react';
import Products from '../Data/Products'
import ProductCard from './ProductCard';
import { FaSearch } from "react-icons/fa";
import { MutatingDots } from 'react-loader-spinner'
import yellowFace from '../assets/yellowFace.png'

const ProductList = ({ currentCategory }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [products, setProducts] = useState([]);
    const [loading, setloading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const [data] = await Promise.all([
                    Products(),
                    new Promise(resolve => setTimeout(resolve, 5000))
                ]);
                setProducts(data)
            } catch (err) {
                console.error(`Failed to Fetch Prodcuts`, err);
            } finally {
                setloading(false)
            }
        }
        fetchProducts();
    }, [])

    const filteredProducts = products.filter(product => {

        const matchesCategory = currentCategory === 'all' || product.category === currentCategory;
        const matchedSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.description.toLowerCase().includes(searchTerm.toLowerCase());

        if (currentCategory === 'home') {
            return searchTerm && matchedSearch;
        }

        if (searchTerm) {
            return matchesCategory && matchedSearch;
        } else {
            return matchesCategory;
        }
    })

    if (loading) return <div>
        {<MutatingDots
            visible={true}
            height="100"
            width="100"
            color="#4fa94d"
            secondaryColor="#4fa94d"
            radius="12.5"
            ariaLabel="mutating-dots-loading"
            wrapperStyle={{ position: 'absolute', top: '40%', left: '45%' }}
            wrapperClass=""
            timeout={30000}
            delay={0}
        />}</div>

    return (
        <div className='pl-wrapper'>
            <div className='pl-subWrapper'>
                <div className='pl-sub-wrapper'>
                    <div className='pl-sub-wrapper1'>
                        <input type="text"
                            placeholder='Search Products...'
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onFocus={(e) => {
                                e.target.style.borderColor = '#667eea';
                                e.target.style.boxShadow = '0 4px 20px rgba(102, 126, 234, 0.2)';
                            }}
                            onBlur={(e) => {
                                e.target.style.borderColor = '#e9ecef';
                                e.target.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
                            }}
                        />
                        <span>
                            <FaSearch />
                        </span>
                    </div>
                </div>

                <div className='pl-sub-wrapper2'>
                    <h2>
                        {currentCategory === 'all' ? 'All Products' :
                            `${currentCategory.charAt(0).toUpperCase() + currentCategory.slice(1)}`}
                    </h2>
                    <span>
                        {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} found
                    </span>
                </div>

                {
                    filteredProducts.length === 0 ? (
                        <div className='pl-sub-wrapper3'>
                            <div className='pl-sub-sub-wrapper3'><img src={yellowFace} alt="No product found" /></div>
                            <h3>No products found</h3>
                            <p>Try adjusting your search or filter criteria</p>
                        </div>
                    ) : (
                        <div className='pl-sub-wrapper4'>
                            {filteredProducts.map(product => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default ProductList
