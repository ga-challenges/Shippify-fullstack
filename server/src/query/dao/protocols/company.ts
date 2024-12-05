export interface CompanyNameAndId {
    name: string
    id: number
}

interface CompanyQueryDao {
    getAllCompanyNamesAndId(): Promise<Array<CompanyNameAndId>>
}

export default CompanyQueryDao;
