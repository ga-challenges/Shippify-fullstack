import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { IVehicleService } from '../../services/VehicleService';
import { Vehicle } from '../../types/Vehicle';
import VehicleList from './VehicleList';

class VehicleServiceFake implements IVehicleService {
  async getVehiclesByDriver(): Promise<{ totalPages: number; totalItems: number; currentPage: number; items: Vehicle[]; }> {
   return {
    items: [
      { id: 1, driverId: 123, type: 'Car', capacity: '5', model: 'Model A', plate: 'ABC-123', creationDate: new Date() },
      { id: 2, driverId: 123, type: 'Truck', capacity: '2', model: 'Model B', plate: 'XYZ-789', creationDate: new Date() },
    ],
    totalPages: 2,
    totalItems: 10,
    currentPage: 1
   } 
  }

  async createVehicle(): Promise<boolean> {
    return true
  }
}

class VehicleServiceErrorFake implements IVehicleService {
  async getVehiclesByDriver(): Promise<{ totalPages: number; totalItems: number; currentPage: number; items: Vehicle[]; }> {
   throw new Error()
  }

  async createVehicle(): Promise<boolean> {
    return true
  }
}

describe('VehicleList', () => {
  test('should render vehicles and handle pagination', async () => {

    render(<VehicleList driverId={123} vehicleService={new VehicleServiceFake()} />);
    await waitFor(() => {
      expect(screen.getByText('Model A')).toBeInTheDocument();
      expect(screen.getByText('Model B')).toBeInTheDocument();
    });

    expect(screen.getByText('Página 1 de 2')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Próxima'));
    expect(screen.getByText('Página 2 de 2')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Voltar'));
    expect(screen.getByText('Página 1 de 2')).toBeInTheDocument();
  });

  test('should show error when fetching vehicles fails', async () => {
    render(<VehicleList driverId={1} vehicleService={new VehicleServiceErrorFake()} />);

    await waitFor(() => {
      expect(screen.getByText('Error fetching vehicles')).toBeInTheDocument();
    });
  });
});
