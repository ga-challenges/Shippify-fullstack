import Button from "./Button";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface TableWithPaginationProps<T> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  columns: { label: string; accessor: any }[];
  page: number;
  totalPages: number;
  onPrevPage: () => void;
  onNextPage: () => void;
}

export function TableWithPagination<T>({
  data,
  columns,
  page,
  totalPages,
  onPrevPage,
  onNextPage,
}: TableWithPaginationProps<T>) {
  return (
    <div className='w-full'>
      <table className='w-full text-center'>
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.accessor as string}>{col.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              {columns.map((col) => (
                <td key={col.accessor as string}>{item[col.accessor]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex w-full justify-center mt-4 gap-2">
        <Button onClick={onPrevPage}  disabled={page === 1} > Voltar </Button>
        <div className="flex items-center">
        <p>{`Página ${page} de ${totalPages}`}</p>
        </div>
        <Button onClick={onNextPage} disabled={page === totalPages}>
          Próxima
        </Button>
      </div>
    </div>
  );
}
