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

  const handleDelete = (identification) => {
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
          >
            Edit
          </button>
          <button type="button" className="btn btn-danger" onClick={() => handleDelete(cli.identification)}>
            Delete
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
      <form>
        <div className="form-group">
          <label>
            Nombres:
            <input type="text" name="names" />
          </label>
        </div>
        <div className="form-group">
          <label>
            Apellidos:
            <input type="text" name="lastNames" />
          </label>
        </div>
        <div className="form-group">
          <label>
            Identificación:
            <input type="text" name="identification" />
          </label>
        </div>
        <div className="form-group">
          <label>
            Correo electrónico:
            <input type="text" name="email" />
          </label>
        </div>
        <div className="form-group">
          <label>
            Cantidad de puntos:
            <input type="text" name="pointsEarned" />
          </label>
        </div>
        <button type="button" className="btn btn-primary button-color">
          Agregar cliente
        </button>
      </form>
      </div>
    </div>
  );
};

export default UserTable;
