function MenuWrap(){
    return (
        <header className="menu-wrap">
			<figure className="user">
				<figcaption>
					Home
				</figcaption>
			</figure>
			<nav>
				<section className="dicover">
					<h3>Opciones</h3>
					<ul>
						<li>
							<a href="#listaProductos">
								<i className="bi bi-film" style={{fontSize: "1.2rem", color: "cornflowerblue"}}></i>
								- Productos
							</a>
						</li>
						<li>
							<a href="#listaUsuarios">
								<i className="bi bi-play-circle" style={{fontSize: "1.2rem", color: "cornflowerblue"}}></i>
								- Usuarios
							</a>
						</li>
						<li>
							<a href="#detalleUltimoProducto">
								<i className="bi bi-person" style={{fontSize: "1.2rem", color: "cornflowerblue"}}></i>
								- Último producto
							</a>
						</li>
					</ul>
				</section>
			</nav>
		</header>
    )
}

export default MenuWrap
