export interface DriverNameAndId {
    name: string
    id: number
}

interface DriverQueryDao {
    getAllDriversNamesByCompanyId(companyId: number): Promise<Array<DriverNameAndId>>
}

export default DriverQueryDao;
