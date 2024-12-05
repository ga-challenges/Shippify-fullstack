import { useState, useEffect } from 'react';
import { ICompanyService } from '../../services/CompanyService';
import { IDriverService } from '../../services/DriverService';

export function useFetchDrivers(service: IDriverService, companyId: number | null) {
    const [drivers, setDrivers] = useState<Array<{ name: string; id: number }>>([]);

    useEffect(() => {
        if (!companyId) return;
        const fetchDrivers = async () => {
            try {
                const drivers = await service.getDriverNameAndIdByCompanyId(companyId);
                setDrivers(drivers);
            } catch (error) {
                console.error('Error fetching drivers:', error);
            }
        };
        fetchDrivers();
    }, [companyId]);

    return drivers;
}

export function useFetchCompanies(service: ICompanyService) {
    const [companies, setCompanies] = useState<Array<{ name: string; id: number }>>([]);

    useEffect(() => {
        const fetchCompanies = async () => {
            try {
                const companies = await service.getAllCompanyrNameAndId();
                setCompanies(companies);
            } catch (error) {
                console.error('Error fetching companies:', error);
            }
        };
        fetchCompanies();
    }, []);

    return companies;
}
