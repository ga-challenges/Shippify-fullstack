interface DriverDao {
    doesDriverExistById(id: number): Promise<boolean>;
}

export default DriverDao;
