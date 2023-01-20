import { Cargo } from "@eagles/definitions";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { deleteCargo, getCargos } from "../../../services/cargo";
import { getDate } from "../../../utils/dateUtils";

const Cargos = () => {
  const navigate = useNavigate();
  const [charges, setCharges] = useState<Cargo[]>([]);

  useEffect(() => {
    const fetchCharges = async () => {
      const fetchedCharges = await getCargos();

      setCharges(fetchedCharges);
    };

    fetchCharges();
  }, []);

  const refreshCharges = async () => {
    const updatedCharges = await getCargos();

    setCharges(updatedCharges);
  };

  const deleteOneCharge = async (id: number) => {
    const deletedCharge = await deleteCargo(id);

    if (!deletedCharge) return;

    await refreshCharges();
  };

  return (
    <div className="roles-container">
      <div className="header">
        <div className="title">Cargos</div>
        <div>
          <Link to="/dashboard/cargos/form/add">
            <button className="button-add">Añadir</button>
          </Link>
        </div>
      </div>
      <div className="table">
        <div className="row">
          <div className="column">ID</div>
          <div className="column">Pago</div>
          <div className="column">Descripcion</div>
          <div className="column">Reservacion</div>
          <div className="column">Monto</div>
          <div className="column">Fecha</div>
          <div className="column">Acciones</div>
        </div>
        {charges.map((charge) => (
          <div key={`rol-row-${charge.id_cargo}`} className="row">
            <div className="column">{charge.id_cargo}</div>
            <div className="column">{charge.id_pago}</div>
            <div className="column">{charge.descripcion}</div>
            <div className="column">{charge.id_reservacion}</div>
            <div className="column">{charge.monto}</div>
            <div className="column">{getDate(charge.fecha)}</div>
            <div className="column">
              <button
                className="button-delete"
                onClick={() => deleteOneCharge(charge.id_cargo)}
              >
                Eliminar
              </button>
              <Link to={`/dashboard/usuarios/form/${charge.id_cargo}`}>
                <button className="button-update">Actualizar</button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cargos;
