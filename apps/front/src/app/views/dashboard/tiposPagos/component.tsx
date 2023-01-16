import { tipoPago } from '@eagles/definitions';
import { useEffect, useState } from 'react';
import { getTiposPagos } from '../../../services/tipoPagos';
import './styles.scss';

const TiposPagos = () => {
  const [tipos, setTipos] = useState<tipoPago[]>([]);

  useEffect(() => {
    const fetchTiposPagos = async () => {
      const fetchedTiposPagos = await getTiposPagos();

      setTipos(fetchedTiposPagos);
    };

    fetchTiposPagos();
  }, []);

  return (
    <div className="tiposPagos-container">
      <div className="header">
        <div className="title">TiposPagos</div>
        <button className="button-add">Añadir</button>
      </div>
      <div className="table">
        <div className="row">
          <div className="column">ID</div>
          <div className="column">Descripción</div>
          <div className="column">Acciones</div>
        </div>
        {tipos.map((tipo) => (
          <div key={`tipo-row-${tipo.id_tipo_pago}`} className="row">
            <div className="column">{tipo.id_tipo_pago}</div>
            <div className="column">{tipo.descripcion}</div>
            <div className="column">
              <button className="button-delete">Eliminar</button>
              <button className="button-update">Actualizar</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TiposPagos;
