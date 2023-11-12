import { useState, useEffect } from 'react'
import ProductosFiltrados from './ProductosFiltrados'

import productoServicio from '../services/producto'


//Estilos
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const BloqueProductos = ({ setNotification, setErrorNotification }) => {

    const [filter, setFilter] = useState('')
    const [productos, setProductos] = useState([])
    const [newNameProduct, setNewNameProduct] = useState('')
    const [newDescriptionProduct, setNewDescriptionProduct] = useState('')
    const [newExpirationProduct, setNewExpirationProduct] = useState('')
    const [newTypeProduct, setNewTypeProduct] = useState('')
    const [pulsed, setPulsed] = useState(false)

    useEffect(() => {
        productoServicio
            .getAll()
            .then(initialProductos => {
                setProductos(initialProductos)
            })
    }, [])



    const addProduct = async (event) => {
        event.preventDefault()

        if (!window.confirm(`Querés agregar al inventario el producto ${newNameProduct}?`)) {
            return
        }

        const productObject = {
            name: newNameProduct,
            description: newDescriptionProduct,
            expiration: newExpirationProduct,
            type: newTypeProduct
        }

        try {
            await productoServicio.create(productObject)

            setNewNameProduct('')
            setNewDescriptionProduct('')
            setNewExpirationProduct('')
            setNewTypeProduct('')

            setNotification(`${productObject.name} agregado al inventario`)
            setTimeout(() => { setNotification(null) }, 3000)

            const initialProductos = await productoServicio.getAll()
            setProductos(initialProductos)
        } catch (e) {
            setErrorNotification('Error creando un producto. Revisar los datos ingresados.')
            setTimeout(() => {
                setErrorNotification(null)
            }, 5000)
        }

    }

    const handleProductNameChange = (event) => {
        setNewNameProduct(event.target.value)
    }
    const handleProductDescriptionChange = (event) => {
        setNewDescriptionProduct(event.target.value)
    }
    const handleProductExpirationChange = (event) => {
        setNewExpirationProduct(event.target.value)
    }
    const handleProductTypeChange = (event) => {
        setNewTypeProduct(event.target.value)
    }

    const filtered = productos.filter(c => c.name.toLowerCase().includes(filter.toLowerCase()) || c.description.toLowerCase().includes(filter.toLowerCase()))




    return (
        <div>
            <h2>Vista de inventario de productos</h2>
            <div className='container pb-4'>
                <span>Ingresar nombre o descripción de producto a consultar </span>
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
            <hr></hr>

            {pulsed ?
                null
                :
                <Button variant="outline-success" onClick={() => setPulsed(!pulsed)}>Agregar nuevo producto al inventario</Button>
            }
            {pulsed ?
                <Form onSubmit={addProduct}>
                    <Form.Label >Nombre:</Form.Label><br></br>
                    <input value={newNameProduct} onChange={handleProductNameChange} />
                    <br></br>
                    <Form.Label >Descripción:</Form.Label><br></br>
                    <input value={newDescriptionProduct} onChange={handleProductDescriptionChange} />
                    <br></br>
                    <Form.Label >Fecha de expiración:</Form.Label><br></br>
                    <input value={newExpirationProduct} onChange={handleProductExpirationChange} />
                    <br></br>
                    <Form.Label >Tipo:</Form.Label><br></br>
                    <textarea value={newTypeProduct} onChange={handleProductTypeChange} rows="4" cols="30" />
                    <br></br>
                    <Button type="submit" variant="outline-success">Agregar</Button>
                </Form>
                :
                null
            }
            {!pulsed ?
                null
                :
                <Button variant="outline-secondary" onClick={() => setPulsed(!pulsed)}>Cancelar</Button>
            }






        </div>
    )
}

export default BloqueProductos