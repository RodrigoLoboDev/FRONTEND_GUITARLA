import type { Guitar } from "../types"

type GuitarProps = {
    guitarra : Guitar,
    addCartItem : (item: Guitar) => void
}


const Guitarra = ({guitarra, addCartItem} : GuitarProps) => {

    const { attributes : { descripcion, nombre, precio, imagen: { data }} } = guitarra
    
    const urlImagen = data[0].attributes.formats.medium ? data[0].attributes.formats.medium.url : data[0].attributes.formats.small.url
    const altImagen = data[0].attributes.formats.medium ? data[0].attributes.formats.medium.name : data[0].attributes.formats.small.name

  return (
    <div className="col-md-6 col-lg-4 my-4 row align-items-center">
        <div className="col-4">
            <img className="img-fluid" src={`${urlImagen}`} alt={`${altImagen}`} />
        </div>
        <div className="col-8">
            <h3 className="text-black fs-4 fw-bold text-uppercase">{nombre}</h3>
            <p>{descripcion}</p>
            <p className="fw-black text-primary fs-3">${precio}</p>
            <button 
                onClick={() => addCartItem(guitarra)}
                type="button"
                className="btn btn-dark w-100"
            >Agregar al Carrito</button>
        </div>
    </div>
  )
}

export default Guitarra