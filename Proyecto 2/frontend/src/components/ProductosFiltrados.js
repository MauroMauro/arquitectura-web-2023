import Producto from '../components/Producto'


//estilos
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'

const ProductosFiltrados = ({ productos, setFilter, setProductos,  setNotification, setErrorNotification}) => {
    if (productos.length > 200) {
        return <div>Demasiados resultados, especificar otro caracter</div>
    }

    if (productos.length === 0) {
        return <div>No se hallaron resultados, consultar el dato ingresado</div>
    }

    if (productos.length > 1) {
        return (
            
            <div>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Descripción</th>
                            <th>Tipo</th>
                        </tr>
                    </thead>
                    <tbody>
                        {productos.map((c) =>
                            <tr key={c.id}>
                                <td><Button variant="outline-secondary" onClick={() => setFilter(c.name)}>{c.name}</Button>{' '}</td>
                                <td>{c.description}</td>
                                <td>{c.type}</td>
                            </tr>
                        )}
                    </tbody>
                </Table>

            </div>
        )
    }

    

    return <Producto
                producto={productos[0]} 
                setProductos={setProductos}
                setNotification={setNotification}
                setErrorNotification={setErrorNotification} 
            />
}

export default ProductosFiltrados