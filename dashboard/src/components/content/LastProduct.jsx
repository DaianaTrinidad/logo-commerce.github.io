import { useEffect, useState } from "react";

function LastProduct () {

    const [lastProduct, setLastProduct] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch("http://localhost:3011/api/products")
            const result = await response.json()
            const last = result.products[result.products.length-1]
            setLastProduct(last)
        }

        fetchData()
    }, [])

    return (
        <section className="content" id="detalleUltimoProducto">
            <h2 className="mt-3">Detalle del último producto</h2>
            <div className="list-group shadow-sm p-3 mb-5 bg-body-tertiary rounded">
                <table>
                    <tr>
                        <th>ID</th>
                        <th>NOMBRE</th>
                        <th>PRECIO</th>
                        <th>DESCUENTO</th>
                    </tr>
                    <tr>
                        <td>{lastProduct.id}</td>
                        <td>{lastProduct.name}</td>
                        <td>${lastProduct.price}</td>
                        <td>{lastProduct.discount}% OFF</td>
                    </tr>
                </table>
            </div>
        </section>
    )
}

export default LastProduct