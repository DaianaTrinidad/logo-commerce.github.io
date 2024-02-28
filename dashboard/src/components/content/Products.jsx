import { useEffect, useState } from "react";
import UsersItem from "./UsersItem";


function Products() {

    const [products, setProducts] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch("http://localhost:3011/api/products")
            const result = await response.json()
            setProducts(result.products)
        }

        fetchData()
    }, [])

    return (
        <section className="content" id="listaProductos">
            <h2 className="mt-3">Productos</h2>
            <div className="list-group shadow-sm p-3 mb-5 bg-body-tertiary rounded">
                <div className="list-group-item list-group-item-action active text-center"
                    aria-current="true">
                    Listado de productos
                </div>
                {products.length === 0 ?
                    "Cargando..." :
                    products.map((product) => (
                        <UsersItem 
                            key={product.id}
                            name={product.name}
                        />
                    ))}
            </div>
        </section>
    )
}

export default Products