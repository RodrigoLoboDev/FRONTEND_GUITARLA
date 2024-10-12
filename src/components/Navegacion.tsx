import { NavLink } from 'react-router-dom';

const Navegacion = () => {

  return (
    <nav className="w-full hidden md:flex justify-end gap-3 items-center">
        <NavLink 
            className={(
                {isActive}) => isActive ? 'font-bold text-orange-500 uppercase' : 'font-bold text-white uppercase'} 
            to={'/'} 
        >Inicio</NavLink>
        <NavLink 
            className={(
                {isActive}) => isActive ? 'font-bold text-orange-500 uppercase' : 'font-bold text-white uppercase'} 
            to={'/blog'} 
        >Blog</NavLink>
        <NavLink 
            className={(
                {isActive}) => isActive ? 'font-bold text-orange-500 uppercase' : 'font-bold text-white uppercase'} 
            to={'/nosotros'} 
        >Nosotros</NavLink>
    </nav>
  )
}

export default Navegacion