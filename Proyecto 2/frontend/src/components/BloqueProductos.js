import { useState, useEffect } from 'react'
import ProductosFiltrados from './ProductosFiltrados'

import productoServicio from '../services/producto'


const BloqueProductos = ({ setNotification, setErrorNotification }) => {

    const [filter, setFilter] = useState('')
    const [productos, setProductos] = useState([])

    useEffect(() => {
        productoServicio
            .getAll()
            .then(initialProductos => {
                setProductos(initialProductos)
            })
    }, [])



    
    const filtered = productos.filter(c => c.name.toLowerCase().includes(filter.toLowerCase()) || c.description.toLowerCase().includes(filter.toLowerCase())   )
    

    return (
        <div>
            <h2>Vista de productos</h2>
            <div className='container pb-4'>
                <span>Ingresar ID o nombre de producto a consultar </span>
                <input
                    type="text"
                    value={filter}
                    onChange={({ target }) => setFilter(target.value)}
                />
            </div>
            <ProductosFiltrados
                productos={filtered} 
                setFilter={setFilter} 
                setProductos={setProductos} 
                setNotification={setNotification}
                setErrorNotification={setErrorNotification} 
            />


        </div>
    )
}

export default BloqueProductos