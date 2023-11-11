import { useState } from "react"
import servicioProductos from '../services/producto'

//Bootstrap
import Card from 'react-bootstrap/Card'



const Producto = ({ producto, setProductos,  setNotification, setErrorNotification }) => {
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
                </Card.Body>
            </Card>

        </div>
    )
}

export default Producto