import React, { useEffect, useState } from 'react';
import { Vehicle } from '../../types/Vehicle';
import { AxiosHttpClientAdapter } from '../../modules/HttpClient';
import { IVehicleService, VehicleService } from '../../services/VehicleService';
import { TableWithPagination } from '../../components/TablePagination';

const useVehicles = (driverId: number, vehicleService: IVehicleService = new VehicleService(new AxiosHttpClientAdapter())) => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState<string | null>(null);

  const fetchVehicles = async (page: number) => {
    try {
      const vehicleData = await vehicleService.getVehiclesByDriver(driverId, page);
      setVehicles(vehicleData.items);
      setTotalPages(vehicleData.totalPages);
    } catch {
      setError('Error fetching vehicles');
    }
  };

  useEffect(() => {
    fetchVehicles(page);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [driverId, page]);

  const handlePrevPage = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNextPage = () => {
    if (page < totalPages) setPage(page + 1);
  };

  return {
    vehicles,
    page,
    totalPages,
    error,
    handlePrevPage,
    handleNextPage,
  };
};

const VehicleList: React.FC<{ driverId: number, vehicleService?: IVehicleService }> = ({ driverId, vehicleService = new VehicleService(new AxiosHttpClientAdapter()) }) => {
  const { error, handleNextPage, handlePrevPage, page, totalPages, vehicles } = useVehicles(driverId, vehicleService);
  if (error) return <div>{error}</div>;

  const columns = [
    { label: 'ID', accessor: 'id' },
    { label: 'Tipo', accessor: 'type' },
    { label: 'Capacidade', accessor: 'capacity' },
    { label: 'Modelo', accessor: 'model' },
    { label: 'Placa', accessor: 'plate' },
  ];

  return (
    <div className='w-full'>
      <div className=''>
        {
          vehicles.length ? <TableWithPagination
          data={vehicles}
          columns={columns}
          page={page}
          totalPages={totalPages}
          onPrevPage={handlePrevPage}
          onNextPage={handleNextPage}
        /> :<div className='text-center text-lg font-bold'>Nenhum veículo encontrado</div>
        }
      </div>
    </div>
  );
};

export default VehicleList;
