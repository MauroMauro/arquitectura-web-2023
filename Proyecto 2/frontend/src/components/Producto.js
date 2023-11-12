import { useState } from "react"
import servicioProducto from '../services/producto'

//Bootstrap
import Card from 'react-bootstrap/Card'
import Button from "react-bootstrap/esm/Button"



const Producto = ({ producto, setProductos, setNotification, setErrorNotification }) => {
    const [pulsed, setPulsed] = useState(false)




    return (
        <div>
            <Card>
                <Card.Body>
                    <Card.Title>Producto: {producto.name} </Card.Title>
                    <Card.Subtitle className="mb-2 text-muted"><>Descripción: {producto.description}</></Card.Subtitle>
                    <Card.Text>
                        <>Tipo: {producto.type}</> <br />
                        <>Expira: {producto.expiration}</> <br />
                        <>Id : {producto.id} </> <br />
                    </Card.Text>
                    {
                        <RemoveBlock
                            id={producto.id}
                            setProductos={setProductos}
                            setNotification={setNotification}
                            setErrorNotification={setErrorNotification}
                        />
                    }
                    {pulsed ?
                        null
                        :
                        <Button variant="outline-warning" onClick={() => setPulsed(!pulsed)}>Modificar</Button>
                    }
                    {pulsed ?
                        <UpdateBlock
                            id={producto.id}
                            setProductos={setProductos}
                            setNotification={setNotification}
                            setErrorNotification={setErrorNotification}
                        />
                        :
                        null
                    }
                    
                    <br></br>
                    {!pulsed ?
                        null
                        :
                        <Button variant="outline-secondary" onClick={() => setPulsed(!pulsed)}>Cerrar</Button>
                    }

                </Card.Body>
            </Card>

        </div>
    )
}

const UpdateBlock = ({ id, setProductos, setNotification, setErrorNotification }) => {

    const [newUpdateNameProduct, setNewUpdateNameProduct] = useState('')
    const [newUpdateDescriptionProduct, setNewUpdateDescriptionProduct] = useState('')
    const [newUpdateExpirationProduct, setNewUpdateExpirationProduct] = useState('')
    const [newUpdateTypeProduct, setNewUpdateTypeProduct] = useState('')


    const updateProduct = async (event) => {
        event.preventDefault()

        const productObject = {
            name: newUpdateNameProduct || 'sin nombre',
            description: newUpdateDescriptionProduct,
            expiration: newUpdateExpirationProduct,
            type: newUpdateTypeProduct,
        }

        if (!window.confirm(`Querés actualizar ${newUpdateNameProduct}?`)) {
            return
        }

        try {
            await servicioProducto.update(id, productObject)

            setNewUpdateNameProduct('')

            setNotification(`${productObject.name} actualizado`)
            setTimeout(() => { setNotification(null) }, 3000)

            setProductos(await servicioProducto.getAll())
        } catch (error) {
            setErrorNotification('Error actualizando ítem')
            setTimeout(() => {
                setErrorNotification(null)
            }, 5000)
        }


    }

    const handleProductNameUpdate = (event) => {
        setNewUpdateNameProduct(event.target.value)
    }
    const handleProductDescriptionUpdate = (event) => {
        setNewUpdateDescriptionProduct(event.target.value)
    }

    const handleProductExpirationUpdate = (event) => {
        setNewUpdateExpirationProduct(event.target.value)
    }

    const handleProductTypeUpdate = (event) => {
        setNewUpdateTypeProduct(event.target.value)
    }


    return (
        <form onSubmit={updateProduct} >
            <br></br>
            <label >Ingrese nuevo nombre:</label><br></br>
            <input value={newUpdateNameProduct} onChange={handleProductNameUpdate} /><br></br>

            <label >Ingrese nueva descripción:</label><br></br>
            <input value={newUpdateDescriptionProduct} onChange={handleProductDescriptionUpdate} /><br></br>

            <label >Ingrese nueva fecha de caducidad:</label><br></br>
            <input value={newUpdateExpirationProduct} onChange={handleProductExpirationUpdate} /><br></br>

            <label >Ingrese nuevo tipo:</label><br></br>
            <textarea value={newUpdateTypeProduct} onChange={handleProductTypeUpdate} /><br></br>

            <br></br>
            <Button variant="outline-secondary" type="submit">Actualizar producto</Button>
        </form>
    )

}

const RemoveBlock = ({ id, setProductos, setNotification, setErrorNotification }) => {

    const deleteProduct = async (event) => {
        event.preventDefault();

        if (!window.confirm(`Quiere eliminar del inventario al producto ${id}?`)) {
            return
        }

        try {
            await servicioProducto.remove(id)

            setNotification(`ID ${id} borrado`)
            setTimeout(() => { setNotification(null) }, 3000)


            setProductos(await servicioProducto.getAll())

        } catch (error) {
            setErrorNotification('==> Error eliminando el ítem')
            setTimeout(() => {
                setErrorNotification(null)
            }, 5000)
        }


    }

    return <Button variant="outline-danger" onClick={deleteProduct}>Eliminar producto del inventario</Button>
}

export default Producto