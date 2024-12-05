interface CompanyApplicationDao {
    doesCompanyExistById(id: number): Promise<boolean>;
    doesCompanyExistByName(name: string): Promise<boolean>;
}

export default CompanyApplicationDao;
