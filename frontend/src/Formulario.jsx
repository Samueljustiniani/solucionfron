import { useState, useEffect } from "react";
import axios from "axios";

function Formulario({ tipo, setActualizar }) {
  const getInitialState = () => {
    if (tipo === "libro") {
      return { nombre_autor: "", apellido_autor: "", anio: "", pagina: "" };
    } else {
      return { nombre: "", tema: "", anio: "", link: "" };
    }
  };

  const [formulario, setFormulario] = useState(getInitialState());
  const [mensaje, setMensaje] = useState("");
  const url = "http://localhost:5000/FICHAS";
  useEffect(() => {
    setFormulario(getInitialState());
    setMensaje("");
  }, [tipo]);

  const handleChange = (e) => {
    setFormulario({ ...formulario, [e.target.name]: e.target.value });
  };

  const validar = () => {
    if (tipo === "libro") {
      return (
        formulario.nombre_autor?.trim() &&
        formulario.apellido_autor?.trim() &&
        formulario.anio &&
        formulario.pagina
      );
    } else {
      return (
        formulario.nombre?.trim() &&
        formulario.tema?.trim() &&
        formulario.anio &&
        formulario.link?.trim()
      );
    }
  };

  const limpiarFormulario = () => {
    const inicial = tipo === "libro"
      ? { nombre_autor: "", apellido_autor: "", anio: "", pagina: "" }
      : { nombre: "", tema: "", anio: "", link: "" };
    setFormulario(inicial);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validar()) {
      setMensaje("⚠️ Por favor completa todos los campos requeridos.");
      return;
    }

    // ...código existente...
try {
  const response = await axios.post(url, {
    tipo,
    ...formulario,
  }, {
    headers: {
      "Content-Type": "application/json"
    }
  });

  setMensaje("✅ Ficha guardada con éxito.");
  limpiarFormulario();
  setActualizar(prev => !prev); // Notifica al padre que debe actualizar la lista
} catch (error) {
  if (error.response) {
    // El servidor respondió con un código fuera del rango 2xx
    setMensaje(`Error: ${error.response.data?.mensaje || "No se pudo guardar la ficha."}`);
  } else if (error.request) {
    // La petición fue hecha pero no hubo respuesta
    setMensaje("Error: No hay respuesta del servidor.");
  } else {
    // Algo pasó al configurar la petición
    setMensaje(`Error: ${error.message}`);
  }
}

  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      {tipo === "libro" ? (
        <>
          <input
            name="nombre_autor"
            placeholder="Nombre del autor"
            className="border p-2 w-full"
            value={formulario.nombre_autor || ""}
            onChange={handleChange}
          />
          <input
            name="apellido_autor"
            placeholder="Apellido del autor"
            className="border p-2 w-full"
            value={formulario.apellido_autor || ""}
            onChange={handleChange}
          />
          <input
            name="anio"
            placeholder="Año"
            type="number"
            className="border p-2 w-full"
            value={formulario.anio || ""}
            onChange={handleChange}
          />
          <input
            name="pagina"
            placeholder="Página"
            type="number"
            className="border p-2 w-full"
            value={formulario.pagina || ""}
            onChange={handleChange}
          />
        </>
      ) : (
        <>
          <input
            name="nombre"
            placeholder="Nombre del video"
            className="border p-2 w-full"
            value={formulario.nombre || ""}
            onChange={handleChange}
          />
          <input
            name="tema"
            placeholder="Tema"
            className="border p-2 w-full"
            value={formulario.tema || ""}
            onChange={handleChange}
          />
          <input
            name="anio"
            placeholder="Año"
            type="number"
            className="border p-2 w-full"
            value={formulario.anio || ""}
            onChange={handleChange}
          />
          <input
            name="link"
            placeholder="Link"
            className="border p-2 w-full"
            value={formulario.link || ""}
            onChange={handleChange}
          />
        </>
      )}

      <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
        Guardar ficha
      </button>

      {mensaje && (
        <p className={`mt-2 text-sm font-medium ${mensaje.includes("✅") ? "text-green-600" : "text-red-600"}`}>
          {mensaje}
        </p>
      )}
    </form>
  );
}

export default Formulario;
