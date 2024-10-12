import { useMemo } from 'react';
import { Blog } from '../../types';
import { useAppStore } from '../../stores/useAppStore';
import { createReview } from '../../services';
import Swal from 'sweetalert2';

type ReviewFormProps = {
    postId: Blog["id"]
    closeModal: () => void
}

const ReviewForm = ({ postId, closeModal } : ReviewFormProps) => {

  const draftReview = useAppStore(state => state.draftReview)
  const loadDarftReview = useAppStore(state => state.loadDarftReview)

  const handleSubmit = async (e : React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
        await createReview(draftReview)
    } catch (error) {
        console.log(error);
    } finally {
        closeModal()
        loadDarftReview({
            name: "",
            content: "",
            rating: 0,
            blog: 0
        })
        showSuccessAlert('¡Comentario Enviado Correctamente!📤')
    }   
  };

  const isValid = useMemo(() => !Object.values(draftReview).includes(''), [draftReview])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    loadDarftReview({
      ...draftReview,
      [e.target.name]: e.target.name === 'rating' ? +e.target.value : e.target.value,
      blog: postId
    });
  };

  // Notificación
    const showSuccessAlert = (msj : string) => {
        Swal.fire({
            title: '¡Éxito!',
            text: msj,
            icon: 'success',
            confirmButtonText: 'Confirmar'
        })
    }

  return (
    <form 
        onSubmit={handleSubmit} 
        className="space-y-5"
    >
      <legend className=" uppercase font-black text-center border-b-4 border-orange-500 text-2xl py-2">Deja tu Comentario</legend>

        <div className=" space-y-2">
            <label 
                htmlFor="name"
                className=" block text-xl"
            >Nombre:</label>
            <input 
                className=" w-full py-2 px-4 bg-slate-100"
                type="text" 
                id="name"
                placeholder="Añade tu nombre" 
                name="name"
                value={draftReview.name}
                onChange={e => handleChange(e)}
            />
        </div>

        <div className=" space-y-2">
            <label 
                htmlFor="content"
                className=" block text-xl"
            >Comentario:</label>
            <textarea 
                className=" w-full py-2 px-4 bg-slate-100"
                id="content"
                placeholder="Añade tu comentario" 
                name="content"
                value={draftReview.content}
                onChange={e => handleChange(e)}
            />
        </div>

        <div className=" space-y-2">
            <label 
                htmlFor="rating"
                className=" block text-xl"
            >Calificación (1-5):</label>
            <input 
                className=" w-full py-2 px-4 bg-slate-100"
                id="content"
                type='rating'
                placeholder="Añade una calificación" 
                name="rating"
                value={draftReview.rating}
                onChange={e => handleChange(e)}
            />
        </div>

        <input 
            type="submit" 
            value={'Enviar Comentario'} 
            className=" mt-5 w-full py-2 text-center uppercase text-white font-black bg-blue-600 rounded-md cursor-pointer disabled:opacity-10"
            disabled={!isValid}
        />
    </form>
  );
};

export default ReviewForm;
