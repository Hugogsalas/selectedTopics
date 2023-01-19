import { Pago } from "@eagles/definitions";
import { useEffect, useState } from "react";
import { deletePago, getPagos } from "../../../services/pago";
import { getDate } from "../../../utils/dateUtils";

const Pagos = () => {
  const [payments, setPayments] = useState<Pago[]>([]);

  useEffect(() => {
    const fetchPayments = async () => {
      const fetchedPayments = await getPagos();

      setPayments(fetchedPayments);
    };

    fetchPayments();
  }, []);

  const refreshPayments = async () => {
    const updatedPayments = await getPagos();

    setPayments(updatedPayments);
  };

  const addNewPayment = async () => {
    // if (!description) return;

    // const addedRole = await addRole({ descripcion: description });

    // if (!addedRole) return;

    // await refreshPayments();
  };

  const deleteOnePayment = async (id: number) => {
    const deletedPayment = await deletePago(id);

    if (!deletedPayment) return;

    await refreshPayments();
  };

  const updateOnePayment = async (id: number) => {
    // if (!description) return;

    // const updatedRole = await updateRol({
    //   id_rol: id,
    //   descripcion: description,
    // });

    // if (!updatedRole) return;

    // await refreshPayments();
  };
  return (
    <div className="roles-container">
      <div className="header">
        <div className="title">Pagos</div>
      </div>
      <div className="table">
        <div className="row">
          <div className="column">ID</div>
          <div className="column">Tipo pago</div>
          <div className="column">Fecha</div>
          <div className="column">Acciones</div>
        </div>
        {payments.map((payment) => (
          <div key={`rol-row-${payment.id_pago}`} className="row">
            <div className="column">{payment.id_pago}</div>
            <div className="column">{payment.id_tipo_pago}</div>
            <div className="column">{getDate(payment.fecha)}</div>
            <div className="column">
              <button
                className="button-delete"
                onClick={() => deleteOnePayment(payment.id_pago)}
              >
                Eliminar
              </button>
              <button
                className="button-update"
                onClick={() => updateOnePayment(payment.id_pago)}
              >
                Actualizar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pagos;
