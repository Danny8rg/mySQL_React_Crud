
import { useState } from 'react';
import './App.css';
import Axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  const [nombre, setNombre] = useState('')
  const [edad, setEdad] = useState()
  const [pais, setPais] = useState('')
  const [cargo, setCargo] = useState('')
  const [anios, setAnios] = useState()
  const [id, setId] = useState()
  const [editar, setEditar] = useState(false)
  const [empleadosList, setEmpleadoslist] = useState([])

  const add =() =>{
    Axios.post("http://localhost:3001/create",{
      nombre:nombre,
      edad:edad,
      pais:pais,
      cargo:cargo,
      anios:anios
    }).then(() =>{
      getEmpleados()
      limpiarCampos()
      alert("empleado registrado")
    })
  }

  
  const update =() =>{
    Axios.put("http://localhost:3001/update",{
      id:id,
      nombre:nombre,
      edad:edad,
      pais:pais,
      cargo:cargo,
      anios:anios
    }).then(() =>{
      getEmpleados()
      alert("empleado actualizado")
      limpiarCampos()
    })
  }

  const deleteEmpleados =(id) =>{
    Axios.put(`http://localhost:3001/delete/${id}`).then(() =>{
      alert("empleado eliminado")
      limpiarCampos()
      getEmpleados()
    })
  }

  const limpiarCampos = () =>{
    setNombre("")
    setEdad("")
    setCargo("")
    setPais("")
    setAnios("")
    setId("")
    setEditar(false)
  }

  const CancelarUpdate = () =>{
    limpiarCampos()
    setEditar(false)
  }

  const editarEmpleado = (val) =>{
    setEditar(true)

    setNombre(val.nombre)
    setEdad(val.edad)
    setPais(val.pais)
    setCargo(val.cargo)
    setAnios(val.anios)
    setId(val.id)
  }

  const getEmpleados =() =>{
    Axios.get("http://localhost:3001/empleados").then((response) =>{
      setEmpleadoslist(response.data);
    })
  }
  
  return (
    <div className="container">

      <div className="card text-center">
        <div className="card-header">
          GESTION DE EMPLEADOS
        </div>
        <div className="card-body">
        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">Nombre:</span>
          <input type="text" value= {nombre}
              onChange={(Event)=>{
                setNombre(Event.target.value)
              }}
          className="form-control" placeholder="Ingrese un nombre" aria-label="Username" aria-describedby="basic-addon1"/>
        </div>

        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">Edad:</span>
          <input type="number" value={edad}
              onChange={(Event)=>{
                setEdad(Event.target.value)
              }}
          className="form-control" placeholder="Ingrese su edad" aria-label="Username" aria-describedby="basic-addon1"/>
        </div>

        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">Pais:</span>
          <input type="text" value={pais}
              onChange={(Event)=>{
                setPais(Event.target.value)
              }}
          className="form-control" placeholder="Ingrese el pais" aria-label="Username" aria-describedby="basic-addon1"/>
        </div>

        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">Cargo:</span>
          <input type="text" value={cargo}
              onChange={(Event)=>{
                setCargo(Event.target.value)
              }}
          className="form-control" placeholder="Ingrese el cargo" aria-label="Username" aria-describedby="basic-addon1"/>
        </div>

        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">Anios:</span>
          <input type="number" value={anios} 
              onChange={(Event)=>{
                setAnios(Event.target.value)
              }}
          className="form-control" placeholder="Ingrese los años de experiencia" aria-label="Username" aria-describedby="basic-addon1"/>
        </div>

        </div>
        <div className="card-footer text-body-secondary">

          {
            editar?
            <div>
            <button onClick={update} className='btn btn-warning m-2'>Actualizar</button>
            <button onClick={CancelarUpdate} className='btn btn-info m-2'>Cancelar</button>
            </div>
            : <button onClick={add} className='btn btn-success'>Registrar</button>
          }
        </div>
      </div>

      <table className="table table-striped">
      <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Nombre</th>
      <th scope="col">Edad</th>
      <th scope="col">Pais</th>
      <th scope="col">Cargo</th>
      <th scope="col">Experiencia</th>
      <th scope="col">Acciones</th>
    </tr>
  </thead>
  <tbody>

    {
      empleadosList.map((val, key) =>{
        return <tr key={val.id}>
          <th scope="row">{val.id}</th>
          <td>{val.nombre}</td>
          <td>{val.edad}</td>
          <td>{val.pais}</td>
          <td>{val.cargo}</td>
          <td>{val.anios}</td>
          <td>
          <div className="btn-group" role="group" aria-label="Basic example">
            <button type="button" 
            onClick={()=>{
              editarEmpleado(val)
            }}
            className="btn btn-info">Editar</button>
            <button type="button"
              onClick={()=>{
                deleteEmpleados(val.id)
              }}
            className="btn btn-danger">Eliminar</button>
          </div>
          </td>
        </tr>
      })
    }
  </tbody>
      </table>
    </div>
  );
}

export default App;
