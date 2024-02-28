import { useState, useEffect } from "react"
import DataPanel from "./content/DataPanel"

function HeaderWrap () {

    const [totalProducts, setTotalProducts] = useState(null)
    const [totalUsers, setTotalUsers] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch("http://localhost:3011/api/products")
            const result = await response.json()
            const totalProducts = result.meta.total
            setTotalProducts(totalProducts)
        }

        fetchData()
    }, [])

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch("http://localhost:3011/api/users")
            const result = await response.json()
            const totalUsers = result.meta.total
            setTotalUsers(totalUsers)
        }

        fetchData()
    }, [])

    return(
        <div className="container-fluid">
            <DataPanel data={[
                {title: "Total de productos", total: totalProducts},
                {title: "Total de usuarios", total: totalUsers}
            ]} />
        </div>
    )
}

export default HeaderWrap