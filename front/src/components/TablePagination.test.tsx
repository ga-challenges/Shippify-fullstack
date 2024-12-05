import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { TableWithPagination } from './TablePagination';
import { vi } from 'vitest'

interface DataType {
  id: number;
  name: string;
}

const data: DataType[] = [
  { id: 1, name: 'Item 1' },
  { id: 2, name: 'Item 2' },
  { id: 3, name: 'Item 3' },
];

const columns = [
  { label: 'ID', accessor: 'id' },
  { label: 'Name', accessor: 'name' },
];

describe('TableWithPagination', () => {
  it('renders table data correctly', () => {
    render(
      <TableWithPagination
        data={data}
        columns={columns}
        page={1}
        totalPages={3}
        onPrevPage={() => {}}
        onNextPage={() => {}}
      />
    );

    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();
    expect(screen.getByText('Item 3')).toBeInTheDocument();
  });

  it('disables prev button on first page', () => {
    render(
      <TableWithPagination
        data={data}
        columns={columns}
        page={1}
        totalPages={3}
        onPrevPage={() => {}}
        onNextPage={() => {}}
      />
    );

    const prevButton = screen.getByText('Voltar');
    expect(prevButton).toBeDisabled();
  });

  it('disables next button on last page', () => {
    render(
      <TableWithPagination
        data={data}
        columns={columns}
        page={3}
        totalPages={3}
        onPrevPage={() => {}}
        onNextPage={() => {}}
      />
    );

    const nextButton = screen.getByText('Próxima');
    expect(nextButton).toBeDisabled();
  });

  it('calls onPrevPage when Prev button is clicked', async () => {
    const onPrevPage = vi.fn();

    render(
      <TableWithPagination
        data={data}
        columns={columns}
        page={2}
        totalPages={3}
        onPrevPage={onPrevPage}
        onNextPage={() => {}}
      />

    );

    const prevButton = screen.getByText('Voltar');
    fireEvent.click(prevButton);
    expect(onPrevPage).toHaveBeenCalled();
  });

  it('calls onNextPage when Next button is clicked', async () => {
    const onNextPage = vi.fn();

    render(
      <TableWithPagination
        data={data}
        columns={columns}
        page={1}
        totalPages={3}
        onPrevPage={() => {}}
        onNextPage={onNextPage}
      />
    );

    const nextButton = screen.getByText('Próxima');
    fireEvent.click(nextButton);
    expect(onNextPage).toHaveBeenCalled();
  });
});
