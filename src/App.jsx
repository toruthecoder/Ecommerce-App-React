import './App.css';
import { CartProvider } from './Context/CartContext';
import Header from './Components/Header'
import Cart from './Components/Cart';
import ProductList from './Components/ProductList'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';

function App() {
  const [currentCategory, setCurrentCategory] = useState('home');


  return (
    <CartProvider>
      <div className="App">
        <Header
          currentCategory={currentCategory}
          onCategoryChange={setCurrentCategory}
        />
        <ProductList currentCategory={currentCategory} />
        <Cart />
        <ToastContainer
          position="bottom-left"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark" />
      </div>
    </CartProvider>
  )
}

export default App;