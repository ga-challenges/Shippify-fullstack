import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useFetchDrivers, useFetchCompanies } from '../hooks/useFetchData';
import Button from '../../components/Button';
import InputGroup from '../../components/Form/Group';
import { InputText } from '../../components/Form/Input';
import InputSelect from '../../components/Form/Select';
import { ICompanyService } from '../../services/CompanyService';
import { IDriverService } from '../../services/DriverService';
import { IVehicleService } from '../../services/VehicleService';

interface VehicleFormProps {
    driverService: IDriverService;
    companyService: ICompanyService;
    vehicleService: IVehicleService;
    onDriverSelect: (driverId: number | null) => void;
}

const schema = z.object({
    plate: z.string().nonempty('O Campo é Obrigatório').regex(/^[A-Z]{3}-\d{4}$/, { message: 'Formato da placa inválido: ###-####'}),
    model: z.string().nonempty('O Campo é Obrigatório'),
    type: z.string().nonempty('O Campo é Obrigatório'),
    capacity: z.string().nonempty('O Campo é Obrigatório'),
    driverId: z.string().nonempty('O Campo é Obrigatório'),
    company: z.number(),
});

export default function VehicleForm({
    driverService,
    companyService,
    vehicleService,
    onDriverSelect,
}: VehicleFormProps) {
    const {
        register,
        setValue,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(schema),
    });

    const [companyIdSelected, setCompanyIdSelected] = useState<number | null>(null);
    const [hasCreated, setHasCreated] = useState<boolean>(false);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const companies = useFetchCompanies(companyService);
    const drivers = useFetchDrivers(driverService, companyIdSelected);

    useEffect(() => {
        if (companies.length && !companyIdSelected) {
            setCompanyIdSelected(companies[0].id);
            setValue('company', companies[0].id);
        }
    }, [companies, companyIdSelected, setValue]);

    useEffect(() => {
        if (drivers.length) {
            onDriverSelect(drivers[0].id)
            setValue('driverId',String(drivers[0].id))
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [drivers, companyIdSelected, setValue]);

    const handleCompanyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedCompanyId = Number(e.target.value);
        setCompanyIdSelected(selectedCompanyId);
        setValue('company', selectedCompanyId);
    };

    const onHandleSubmit = async (data: unknown) => {
        const success = await vehicleService.createVehicle(data);
        if (success) {
            setSuccessMessage('Veículo criado com sucesso!');
            setHasCreated(false);
        }
    };

    return (
        <>
            <form role="form" onSubmit={handleSubmit(onHandleSubmit)} className='flex flex-col gap-4'>
                <InputGroup label='Empresa'>
                    <InputSelect
                        {...register('company', {
                            onChange: handleCompanyChange,
                        })}
                        options={companies.map((item) => ({ text: item.name, value: item.id }))}
                    />
                    {errors.company && (
                        <p className="text-red-500 text-sm">{errors.company.message as string}</p>
                    )}
                </InputGroup>

                <InputGroup label='Motorista'>
                    <InputSelect
                        {...register('driverId', {
                            onChange: (e) => onDriverSelect(Number(e.target.value)),
                            onBlur: (e) => onDriverSelect(Number(e.target.value)),
                        })}
                        disabled={!(companies.length && drivers.length)}
                        options={drivers.map((item) => ({ text: item.name, value: item.id }))}
                    />
                    {errors.driverId && (
                        <p className="text-red-500 text-sm">{errors.driverId.message as string}</p>
                    )}
                </InputGroup>

                {hasCreated && (
                    <>
                        <InputGroup label='Placa'>
                            <InputText {...register('plate')} />
                            {errors.plate && (
                                <p className="text-red-500 text-sm">{errors.plate.message as string}</p>
                            )}
                        </InputGroup>

                        <InputGroup label='Modelo'>
                            <InputText {...register('model')} />
                            {errors.model && (
                                <p className="text-red-500 text-sm">{errors.model.message as string}</p>
                            )}
                        </InputGroup>

                        <InputGroup label='Tipo'>
                            <InputSelect
                                options={[
                                    { text: 'Moto', value: 'motorcycle' },
                                    { text: 'Carro', value: 'car' },
                                ]}
                                {...register('type')}
                            />
                            {errors.type && (
                                <p className="text-red-500 text-sm">{errors.type.message as string}</p>
                            )}
                        </InputGroup>

                        <InputGroup label='Capacidade'>
                            <InputText {...register('capacity')} />
                            {errors.capacity && (
                                <p className="text-red-500 text-sm">{errors.capacity.message as string as string}</p>
                            )}
                        </InputGroup>

                        <Button type='submit'>Criar</Button>
                    </>
                )}
            </form>

            <Button onClick={() => setHasCreated((prev) => !prev)}>
                {!hasCreated ? 'Adicionar Veículo' : 'Cancelar'}
            </Button>

            {successMessage && (
                <p className="text-green-500 text-sm mt-4">{successMessage as string}</p>
            )}
        </>
    );
}
