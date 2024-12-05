import { useState } from 'react';
import VehicleList from './components/VehicleList';
import { VehicleService, IVehicleService } from '../services/VehicleService';
import { AxiosHttpClientAdapter } from '../modules/HttpClient';
import CompanyService, { ICompanyService } from '../services/CompanyService';
import DriverService, { IDriverService } from '../services/DriverService';
import VehicleForm from './components/VehicleForm';

export interface DriverVehiclePageProps {
    driverService?: IDriverService;
    companyService?: ICompanyService;
    vehicleService?: IVehicleService;
}

const axiosAdapter = new AxiosHttpClientAdapter();

export default function DriverVehiclePage({
    driverService = new DriverService(axiosAdapter),
    companyService = new CompanyService(axiosAdapter),
    vehicleService = new VehicleService(axiosAdapter),
}: DriverVehiclePageProps) {
    const [driverId, setDriverId] = useState<number | null>(null);

    return (
        <div className='flex flex-col gap-12'>
            <VehicleForm
                driverService={driverService}
                companyService={companyService}
                vehicleService={vehicleService}
                onDriverSelect={setDriverId}
            />
            <VehicleList driverId={driverId ?? 0} />
        </div>
    );
}
