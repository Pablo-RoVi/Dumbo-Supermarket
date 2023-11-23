import React, { useEffect, useState } from "react";
import agent from "../../app/api/agent";
import Swal from 'sweetalert2';
import "../../app/styles/UserTable.css";

// @ts-ignore

const UserTable = () => {
  const [clients, setClients] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    agent.requests
      .get("users")
      .then((response) => setClients(response))
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading...</p>;

  if (error) return <p>There was an error loading the clients</p>;

  const createClient = () => {
    Swal.fire({
      title: 'Agregar cliente',
      html:
        '<input id="name" class="swal2-input" placeholder="Nombres">' +
        '<input id="lastNames" class="swal2-input" placeholder="Apellidos">' +
        '<input id="identification" class="swal2-input" placeholder="Identificación">' +
        '<input id="email" class="swal2-input" placeholder="Correo electrónico">' +
        '<input id="pointsEarned" class="swal2-input" placeholder="Cantidad de puntos">',
      focusConfirm: false,
      confirmButtonText: 'Agregar',
      confirmButtonColor: '#b7c62d',
      preConfirm: () => {
        const name = Swal.getPopup().querySelector('#name').value
        const lastNames = Swal.getPopup().querySelector('#lastNames').value
        const identification = Swal.getPopup().querySelector('#identification').value
        const email = Swal.getPopup().querySelector('#email').value
        const pointsEarned = Swal.getPopup().querySelector('#pointsEarned').value
        if (!name || !lastNames || !identification || !email || !pointsEarned) {
          Swal.showValidationMessage(`Por favor, ingrese todos los datos`)
        }
        if(isNaN(pointsEarned)){
          Swal.showValidationMessage(`Por favor, ingrese un valor numérico en el campo de cantidad de puntos`)
        }
        return { name: name, lastNames: lastNames, identification: identification, email: email, pointsEarned: pointsEarned }
      }
    }).then((result) => {
      if (result.isConfirmed) {
        agent.requests
          .post("users", result.value)
          .then((response) => {
            console.log("Cliente creado exitosamente");
            agent.requests
              .get("users")
              .then((response) => setClients(response))
              .catch((error) => setError(error))
              .finally(() => setLoading(false));
          })
          .catch((error) => {
            console.error("Error al crear al cliente:", error);
          });
      }
    })
  }

  const updateClient = (cli) => {
    Swal.fire({
      title: 'Editar cliente',
      html:
      '<input id="name" class="swal2-input" placeholder="Nombres" value="' + cli.name + '">' +
      '<input id="lastNames" class="swal2-input" placeholder="Apellidos" value="' + cli.lastNames + '">' +
      '<input id="identification" class="swal2-input" placeholder="Identificación" value="' + cli.identification + '">' +
      '<input id="email" class="swal2-input" placeholder="Correo electrónico" value="' + cli.email + '">' +
      '<input id="pointsEarned" class="swal2-input" placeholder="Cantidad de puntos" value="' + cli.pointsEarned + '">',
      focusConfirm: false,
      confirmButtonText: 'Actualizar cliente',
      confirmButtonColor: '#b7c62d',
      preConfirm: () => {
        const name = Swal.getPopup().querySelector('#name').value
        const lastNames = Swal.getPopup().querySelector('#lastNames').value
        const identification = Swal.getPopup().querySelector('#identification').value
        const email = Swal.getPopup().querySelector('#email').value
        const pointsEarned = Swal.getPopup().querySelector('#pointsEarned').value
        if (!name || !lastNames || !identification || !email || !pointsEarned) {
          Swal.showValidationMessage(`Por favor, ingrese todos los datos`)
        }
        if(isNaN(pointsEarned)){
          Swal.showValidationMessage(`Por favor, ingrese un valor numérico en el campo de cantidad de puntos`)
        }
        return { name: name, lastNames: lastNames, identification: identification, email: email, pointsEarned: pointsEarned }
      }
    }).then((result) => {
      if (result.isConfirmed) {
        agent.requests
          .put(`users/${cli.identification}`, result.value)
          .then((response) => {
            console.log("Cliente actualizado exitosamente");
            agent.requests
              .get("users")
              .then((response) => setClients(response))
              .catch((error) => setError(error))
              .finally(() => setLoading(false));
          })
          .catch((error) => {
            console.error("Error al actualizar al cliente:", error);
          });
      }
    })
  }

  const deleteClient = (identification) => {
    Swal.fire({
      title: '¿Estás seguro que deseas eliminar al cliente ' + identification + '?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí',
      confirmButtonColor: '#b7c62d',
      cancelButtonText: 'No',
      width: '70%',
    }).then((result) => {
      if (result.isConfirmed) {
        // User clicked 'Sí'
        agent.requests
          .delete(`users/${identification}`)
          .then((response) => {
            console.log("Cliente eliminado exitosamente");
            agent.requests
              .get("users")
              .then((response) => setClients(response))
              .catch((error) => setError(error))
              .finally(() => setLoading(false));
          })
          .catch((error) => {
            console.error("Error al eliminar al cliente:", error);
          });
      } else {
        // User clicked 'No'
        console.log("Eliminación cancelada por el usuario");
      }
    });
  }

  const renderClients = () => {
    if (!clients) return null;
    return clients.map((cli, index) => (
      <tr key={index + 1}>
        <th scope="row">{index + 1}</th>
        <td>{cli.name}</td>
        <td>{cli.lastNames}</td>
        <td>{cli.identification}</td>
        <td>{cli.email}</td>
        <td>{cli.pointsEarned}</td>
        <td>
          <button
            type="button"
            className="btn btn-warning"
            style={{ marginRight: "5%" }}
            onClick={() => updateClient(cli)}
          >
            Editar
          </button>
          <button 
            type="button" 
            className="btn btn-danger" 
            onClick={() => deleteClient(cli.identification)}
          >
            Eliminar
          </button>
        </td>
      </tr>
    ));
  };

  return (
    <div className="container">
      <div className="row">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Nombres</th>
              <th scope="col">Apellidos</th>
              <th scope="col">Identificación</th>
              <th scope="col">Correo electrónico</th>
              <th scope="col">Cantidad de puntos</th>
              <th scope="col">Acciones</th>
            </tr>
          </thead>
          <tbody>{renderClients()}</tbody>
        </table>
      </div>
      <div className="col-md-12">
      <button type="button" className="btn btn-primary button-color" onClick={() => createClient()}>
          Agregar cliente
      </button>
      </div>
    </div>
  );
};

export default UserTable;
