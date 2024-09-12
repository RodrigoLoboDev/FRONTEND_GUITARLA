import { useMemo } from 'react';
import { useGuitarStore } from '../store';
import Item from './Item';
import { formatearDinero } from '../helpers';

const Header = () => {

    const carrito = useGuitarStore(state => state.carrito)
    const vaciarCartItem = useGuitarStore(state => state.vaciarCartItem)
    const total = useMemo(() => carrito.reduce((totalState, item) => totalState + (item.attributes.precio * item.count), 0), [carrito])

  return (
    <header className="py-5 header">
        <div className="container-xl">
            <div className="row justify-content-center justify-content-md-between">
                <div className="col-8 col-md-3">
                    <a href="index.html">
                        <img className="img-fluid" src="/img/logo.svg" alt="imagen logo" />
                    </a>
                </div>
                <nav className="col-md-6 a mt-5 d-flex align-items-start justify-content-end">
                    <div 
                        className="carrito"
                    >
                        <img className="img-fluid" src="/img/carrito.png" alt="imagen carrito" />

                        <div id="carrito" className="bg-white p-3">

                            {carrito.length <= 0 ? (
                                <p className="text-center">El carrito esta vacio</p>
                            ) : (
                                <>
                                    <table className="w-100 table">
                                        <thead>
                                            <tr>
                                                <th>Imagen</th>
                                                <th>Nombre</th>
                                                <th>Precio</th>
                                                <th>Cantidad</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>

                                            {carrito.map( item => (
                                                <Item 
                                                    key={item.id}
                                                    item={item}
                                                />
                                            ))}

                                        </tbody>
                                    </table>

                                    <p className="text-end">Total pagar: <span className="fw-bold">{formatearDinero(total)}</span></p>
                                    <button 
                                        onClick={vaciarCartItem}
                                        className="btn btn-dark w-100 mt-3 p-2">
                                    Vaciar Carrito</button>
                                </>
                            )}

                            
                        </div>
                    </div>
                </nav>
            </div>
        </div>
    </header>
  )
}

export default Header