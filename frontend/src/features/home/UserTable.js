import React, { useEffect, useState } from "react";
import agent from "../../app/api/agent";
import Swal from "sweetalert2";
import "../../app/styles/UserTable.css";

// @ts-ignore

const UserTable = () => {
  // States
  const [clients, setClients] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Load clients
  useEffect(() => {
    agent.requests
      .get("users")
      .then((response) => setClients(response))
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }, []);

  // Loading state
  if (loading)
    return (
      <div className="loading-spinner">
        <div className="spinner-border spinner-color" role="status" />
      </div>
    );

  // Error state
  if (error) return <p>There was an error loading the clients</p>;

  const verifyInfo = (name, lastNames, identification, email, pointsEarned) => {
    // Validate inputs are not empty
    if (!name || !lastNames || !identification || !email || !pointsEarned) {
      Swal.showValidationMessage(`Por favor, ingrese todos los datos`);
    }

    // Verify if name and lastNames has only letters
    if (!/^[a-zA-Z ]+$/.test(name) || !/^[a-zA-Z ]+$/.test(lastNames)) {
      Swal.showValidationMessage(
        `Por favor, ingrese solo letras en los campos de nombres y apellidos`
      );
    }

    // Verify if name and lastNames have two words
    if (name.split(" ").length < 2 || lastNames.split(" ").length < 2) {
      Swal.showValidationMessage(
        `Por favor, ingrese sus dos nombres y sus dos apellidos`
      );
    }

    // Verify if identification has the correct format
    if (!/^[0-9]{1,2}\.[0-9]{3}\.[0-9]{3}-[0-9kK]$/.test(identification)) {
      Swal.showValidationMessage(
        `Por favor, ingrese una identificación válida (xx.xxx.xxx-x)`
      );
    }

    // Verify if email has the correct format
    if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      Swal.showValidationMessage(
        `Por favor, ingrese un correo electrónico válido`
      );
    }

    // Validate pointsEarned is a number and positive
    if (isNaN(pointsEarned) || pointsEarned < 0) {
      Swal.showValidationMessage(
        `Por favor, ingrese un valor numérico positivo en el campo de cantidad de puntos`
      );
    }
  };

  // Create client
  const createClient = () => {
    // Create dialog with SweetAlert2
    Swal.fire({
      title: "Agregar cliente",
      html:
        '<input id="name" class="swal2-input" placeholder="Nombres">' +
        '<input id="lastNames" class="swal2-input" placeholder="Apellidos">' +
        '<input id="identification" class="swal2-input" placeholder="Identificación">' +
        '<input id="email" class="swal2-input" placeholder="Correo electrónico">' +
        '<input id="pointsEarned" class="swal2-input" placeholder="Cantidad de puntos">',
      focusConfirm: false,
      confirmButtonText: "Agregar",
      confirmButtonColor: "#b7c62d",
      preConfirm: () => {
        // Save inputs in variables
        const name = Swal.getPopup().querySelector("#name").value;
        const lastNames = Swal.getPopup().querySelector("#lastNames").value;
        const identification =
          Swal.getPopup().querySelector("#identification").value;
        const email = Swal.getPopup().querySelector("#email").value;
        const pointsEarned =
          Swal.getPopup().querySelector("#pointsEarned").value;

        // Validate inputs
        verifyInfo(name, lastNames, identification, email, pointsEarned);

        return {
          name: name,
          lastNames: lastNames,
          identification: identification,
          email: email,
          pointsEarned: pointsEarned,
        };
      },
    }).then((result) => {
      // User clicked 'Agregar'
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
    });
  };

  // Update client
  const updateClient = (cli) => {
    // Create dialog with SweetAlert2
    Swal.fire({
      title: "Editar cliente",
      html:
        '<input id="name" class="swal2-input" placeholder="Nombres" value="' +
        cli.name +
        '">' +
        '<input id="lastNames" class="swal2-input" placeholder="Apellidos" value="' +
        cli.lastNames +
        '">' +
        '<input id="identification" class="swal2-input" placeholder="Identificación" value="' +
        cli.identification +
        '">' +
        '<input id="email" class="swal2-input" placeholder="Correo electrónico" value="' +
        cli.email +
        '">' +
        '<input id="pointsEarned" class="swal2-input" placeholder="Cantidad de puntos" value="' +
        cli.pointsEarned +
        '">',
      focusConfirm: false,
      confirmButtonText: "Actualizar cliente",
      confirmButtonColor: "#b7c62d",
      preConfirm: () => {
        // Save inputs in variables
        const name = Swal.getPopup().querySelector("#name").value;
        const lastNames = Swal.getPopup().querySelector("#lastNames").value;
        const identification =
          Swal.getPopup().querySelector("#identification").value;
        const email = Swal.getPopup().querySelector("#email").value;
        const pointsEarned =
          Swal.getPopup().querySelector("#pointsEarned").value;

        // Validate inputs
        verifyInfo(name, lastNames, identification, email, pointsEarned);

        return {
          name: name,
          lastNames: lastNames,
          identification: identification,
          email: email,
          pointsEarned: pointsEarned,
        };
      },
    }).then((result) => {
      // User clicked 'Actualizar cliente'
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
    });
  };

  // Delete client
  const deleteClient = (identification) => {
    // Create dialog with SweetAlert2
    Swal.fire({
      title:
        "¿Estás seguro que deseas eliminar al cliente " + identification + "?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí",
      confirmButtonColor: "#b7c62d",
      cancelButtonText: "No",
      width: "70%",
    }).then((result) => {
      // User clicked 'Sí'
      if (result.isConfirmed) {
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
  };

  // Render clients
  const renderClients = () => {
    // Validate clients is not null
    if (!clients) return null;

    // Filter clients by searchTerm
    const filteredClients = clients.filter(
      (cli) =>
        cli.identification.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cli.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Show clients
    return filteredClients.map((cli, index) => (
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
        <div className="col-md-6">
          <input
            type="text"
            className="form-control"
            placeholder="Buscar por identificación o correo electrónico"
            style={{ marginBottom: "2%", marginTop: "5%" }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
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
        <button
          type="button"
          className="btn btn-primary button-color"
          onClick={() => createClient()}
        >
          Agregar cliente
        </button>
      </div>
    </div>
  );
};

export default UserTable;
