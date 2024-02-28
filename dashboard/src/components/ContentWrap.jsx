import HeaderWrap from "./HeaderWrap"
import LastProduct from "./content/LastProduct"
import Products from "./content/Products"
import Users from "./content/Users"

function ContentWrap () {
    return (
		<main className="content-wrap" style={{maxHeight: "calc(100vh - 6rem)"}}>
            <HeaderWrap/>
            <Products/>
            <Users/>
            <LastProduct/>
        </main>
    )
}

export default ContentWrap