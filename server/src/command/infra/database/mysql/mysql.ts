interface MySql {
    query<T>(input: {
        statement: string,
        params?: Array<unknown>
    }): Promise<Array<T>>
};

export default MySql;
