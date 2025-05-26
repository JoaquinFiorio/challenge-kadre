import { useEffect, useState } from "react";
import { Button, Select, SelectItem, TableCell, TableRow } from "@nextui-org/react";
import { Actions, Breadcrumb, Padding, TableCard, TableParentText, TableText } from "../../core/components";
import { useTransport } from "../hooks";
import { Transport } from "../interfaces";
import { getTimeAgo, getTimeFormatted } from "../../core/helpers/Moment";
import { UserStarIcon } from "../../../icons";
import { useNavigate } from "react-router-dom";
import { FUEL_TYPE, STATES } from "../utils/constants";

export const TransportList = () => {

  const navigate = useNavigate();
  const { loadTransports, updateTransportState, updateTransportFuel, loadingTransports, transports, updating } = useTransport();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    return () => {
      setIsMounted(false);
    }
  }, []);

  useEffect(() => {
    if (isMounted) {
      loadTransports();
    }
  }, [isMounted]);

  const handleChangeFuelType = async (id: string, value: string) => {
    const response: any = await updateTransportFuel(id, value);

    if (response.success) {
      loadTransports();
    }
  }

  const handleChangeState = async (id: string, value: string) => {
    const response: any = await updateTransportState(id, value);

    if (response.success) {
      loadTransports();
    }
  }

  return (
    <Padding>
      <Breadcrumb
        pageName={'Lista de Transportes'}
        loading={loadingTransports}
      />
      <Actions
        actions={(
          <>
            <Button
              color="primary"
              size="sm"
              variant="shadow"
              endContent={<UserStarIcon />}
              onPress={() => navigate('/trucks-list/new')}
              isDisabled={loadingTransports}
            >
              Nuevo Transporte
            </Button>
          </>
        )}
      />
      <TableCard
        headers={[
          'Estado',
          'Transporte',
          'Origen - Destino',
          'Fecha de salida',
          'Tipo de combustible',
          'Conductor',
          'Galones',
          'Última actualización',
          'Acciones',
        ]}
        rows={transports?.filter((transport) => transport.state !== 'CANCELADO' )?.map((item: Transport) => (
          <TableRow key={item._id}>
            <TableCell>
              <Select
                variant="underlined"
                selectedKeys={[item.state ? item.state : '']}
                onChange={(e) => handleChangeState(item._id ? item._id : '', e.target.value)}
                isDisabled={updating}
              >
                {STATES.map(state => (
                  <SelectItem key={state} value={state}>
                    {state}
                  </SelectItem>
                ))}
              </Select>
            </TableCell>
            <TableCell>
              <TableText>
                {item.truck}
              </TableText>
            </TableCell>
            <TableCell>
              <TableParentText
                parent={`${item.origin} - ${item.destination}`
                }
                content={item.createdAt ? getTimeFormatted(item?.createdAt) : 'No especificada'}
              />
            </TableCell>
            <TableCell>
              <TableText>
                {item.departure_date ? item.departure_date.toString().split('T')[0] : 'No especificada'}
              </TableText>
            </TableCell>
            <TableCell>
              <Select
                variant="underlined"
                selectedKeys={[item.fuel_type]}
                onChange={(e) => handleChangeFuelType(item._id ? item._id : '', e.target.value)}
                isDisabled={updating}
              >
                {FUEL_TYPE.map(fuel => (
                  <SelectItem key={fuel} value={fuel}>
                    {fuel}
                  </SelectItem>
                ))}
              </Select>
            </TableCell>
            <TableCell>
              <TableText>
                {item.driver}
              </TableText>
            </TableCell>
            <TableCell>
              <TableText>
                {item.gallons}
              </TableText>
            </TableCell>
            <TableCell>
              <TableText>
                {getTimeAgo(item.updatedAt ? item.updatedAt : new Date())}
              </TableText>
            </TableCell>
            <TableCell>
              <Button
                color="primary"
                size="sm"
                variant="shadow"
                onPress={() => navigate('/trucks-list/edit', { state: { transport: item } })}
              >
                Editar
              </Button>
            </TableCell>
          </TableRow>
        ))}
        buttonLoadMoreLoading={loadingTransports}
      />
    </Padding>
  );
}