// Fecthing the data

async function Products(){
    try{
        const res = await fetch('https://fakestoreapi.com/products');
        
        if(!res.ok){
            throw new Error(`HTTP Error! Status : ${res.status}`);
        }

        const data = await res.json();
        console.log(data)
        return data;
    }catch(err){
        console.error(`Error Handling Data `, err);
        throw err;
    }
}

export default Products