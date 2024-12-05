import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import VehicleForm from './VehicleForm';
import { IDriverService } from '../../services/DriverService';
import { IVehicleService } from '../../services/VehicleService';
import { Vehicle } from '../../types/Vehicle';
import { ICompanyService } from '../../services/CompanyService';
import '@testing-library/jest-dom';


class DriverServiceFake implements IDriverService {
    async getDriverNameAndIdByCompanyId(): Promise<Array<{ name: string; id: number; }>> {
        return [{ id: 1, name: 'Driver A' }];
    }
}

class VehicleServiceFake implements IVehicleService {
    async createVehicle(): Promise<boolean> {
        return true;
    }

    async getVehiclesByDriver(): Promise<{ totalPages: number; totalItems: number; currentPage: number; items: Vehicle[]; }> {
        return { currentPage: 2, items: [], totalItems: 100, totalPages: 90};
    }
}

class CompanyServiceFake implements ICompanyService {
    async getAllCompanyrNameAndId(): Promise<Array<{ name: string; id: number; }>> {
        return [{ id: 1, name: 'Company A' }];
    }
}

describe('VehicleForm', () => {
    const mockCreateVehicle = new VehicleServiceFake();
    const mockUseFetchCompanies = new CompanyServiceFake();
    const mockUseFetchDrivers = new DriverServiceFake();

    beforeEach(() => {
        render(
            <VehicleForm
                driverService={mockUseFetchDrivers}
                companyService={mockUseFetchCompanies}
                vehicleService={mockCreateVehicle}
                onDriverSelect={() => {}}
            />
        );
    });

    it('should show error message for invalid plate format', async () => {
        fireEvent.click(screen.getByText('Adicionar Veículo'));

        const plateInput = screen.getByLabelText(/placa/i);
        fireEvent.change(plateInput, { target: { value: 'ABC-123' } });

        fireEvent.submit(screen.getByRole('form'));

        await waitFor(() => {
            expect(screen.getByText('Formato da placa inválido: ###-####')).toBeInTheDocument();
        });
    });

    it('should toggle the form visibility when the button is clicked', async () => {
        const button = screen.getByText('Adicionar Veículo');
        fireEvent.click(button);
        
        expect(screen.getByLabelText(/placa/i)).toBeInTheDocument();
        
        fireEvent.click(button);
        
        expect(screen.queryByLabelText(/placa/i)).not.toBeInTheDocument();
    });
});
