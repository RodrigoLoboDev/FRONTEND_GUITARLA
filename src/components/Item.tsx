import { useGuitarStore } from '../store';
import type { CartItem } from '../types';

type ItemProps = {
    item : CartItem,
}


const Item = ({item} : ItemProps) => {

    const { id, attributes : { nombre, precio, imagen: { data }}, count } = item

    const incrementar = useGuitarStore(state => state.incrementar)
    const decrementar = useGuitarStore(state => state.decrementar)
    const deleteCartItem = useGuitarStore(state => state.deleteCartItem)

  return (
    <tr>
        <td>
            <img className="img-fluid" src={`${data[0].attributes.formats.thumbnail.url}`} alt={`${data[0].attributes.formats.thumbnail.name}`} />
        </td>
        <td>{nombre}</td>
        <td className="fw-bold">
                ${precio}
        </td>
        <td className="flex align-items-start gap-4">
            <button
                onClick={() => decrementar(id)}
                type="button"
                className="btn btn-dark"
            >
                -
            </button>
                {count}
            <button
                onClick={() => incrementar(id)}
                type="button"
                className="btn btn-dark"
            >
                +
            </button>
        </td>
        <td>
            <button
                onClick={() => deleteCartItem(id)}
                className="btn btn-danger"
                type="button"
            >
                X
            </button>
        </td>
    </tr>
  )
}

export default Item