import { useEffect, useState } from "react";
import Article from "../components/Article";
import Cards from "../components/Cards";
import Loadings from "../components/Loadings";
import { fetchProducts } from "../services/productAction";

function Home(){
    // state -> special variables
    // state is used to store data from api response
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)

    // execute
    useEffect(() => {
        // call to api product
        fetchProducts(8, 0)
        .then(response => {
            setProducts(response)
            setLoading(false)
        })
        
    }, [])

    return(
        <>
            <main className="pt-10 dark:bg-gray-900">
                <section className="container mx-auto mt-11">
                    <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white text-center mt-10" style={{marginTop: 100}}>We invest in popular products</h1>
                    <p className="mb-6 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400 text-center">Here at Flowbite we focus on markets where technology, innovation, and capital can unlock long-term value and drive economic growth.</p>
                    {/* loop data from product to cards */}
                    <section className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-4 gap-4">
                    {
                        loading ? <Loadings /> : 
                        products.length > 0 && products.map(product => <Cards 
                            key={product.id}
                            url={product.images[0]} 
                            desc={product.title} 
                            id={product.id}
                            price={product.price} />) 
                    }
                    </section>
                </section>
                <Article />
            </main>
        </>
    )
}
export default Home;