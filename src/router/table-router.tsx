import {
  Column,
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  Table,
  useReactTable,
} from '@tanstack/react-table';
import { useState } from 'react';
import mockData from '../MOCK_DATA.json';

interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  gender: string;
  ip_address: string;
}

const columns: ColumnDef<User>[] = [
  {
    header: 'ID',
    accessorKey: 'id',
  },
  {
    header: 'First Name',
    accessorKey: 'first_name',
    cell: ({ row: { original } }) => <div>{original.first_name}</div>,
  },
  {
    header: 'Last Name',
    accessorKey: 'last_name',
  },
  {
    header: 'Email',
    accessorKey: 'email',
  },
];

export const TableRouter = () => {
  const [data] = useState<User[]>(mockData);
  const [filtering, setFiltering] = useState('');
  const table = useReactTable({
    getFilteredRowModel: getFilteredRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),

    columns,
    data,
    state: {
      globalFilter: filtering,
    },
    onGlobalFilterChange: setFiltering,
  });

  return (
    <div className='p-4'>
      <input
        className='border-2 border-black rounded mb-4 p-2'
        type='text'
        value={filtering}
        onChange={(e) => setFiltering(e.target.value)}
      />
      <table className='min-w-full bg-white border border-gray-200'>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className='bg-gray-100 border-b'>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className={`text-left p-2 border-r  ${
                    header.column.getCanSort()
                      ? 'cursor-pointer select-none'
                      : ''
                  } `}
                  onClick={header.column.getToggleSortingHandler()}
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                  {{
                    asc: ' 🔼',
                    desc: ' 🔽',
                  }[header.column.getIsSorted() as string] ?? null}
                  {header.column.getCanFilter() ? (
                    <div>
                      <Filter column={header.column} table={table} />
                    </div>
                  ) : null}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className='border-b hover:bg-gray-50'>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className='p-2 border-r'>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className='flex items-center gap-2'>
        <button
          className='border rounded p-1'
          onClick={() => table.firstPage()}
          disabled={!table.getCanPreviousPage()}
        >
          {'<<'}
        </button>
        <button
          className='border rounded p-1'
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          {'<'}
        </button>
        <button
          className='border rounded p-1'
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          {'>'}
        </button>
        <button
          className='border rounded p-1'
          onClick={() => table.lastPage()}
          disabled={!table.getCanNextPage()}
        >
          {'>>'}
        </button>
        <span className='flex items-center gap-1'>
          <div>Page</div>
          <strong>
            {table.getState().pagination.pageIndex + 1} of{' '}
            {table.getPageCount().toLocaleString()}
          </strong>
        </span>
        <span className='flex items-center gap-1'>
          | Go to page:
          <input
            type='number'
            min='1'
            max={table.getPageCount()}
            defaultValue={table.getState().pagination.pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              table.setPageIndex(page);
            }}
            className='border p-1 rounded w-16'
          />
        </span>
        <select
          value={table.getState().pagination.pageSize}
          onChange={(e) => {
            table.setPageSize(Number(e.target.value));
          }}
        >
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

function Filter({
  column,
  table,
}: {
  column: Column<any, any>;
  table: Table<any>;
}) {
  const firstValue = table
    .getPreFilteredRowModel()
    .flatRows[0]?.getValue(column.id);

  const columnFilterValue = column.getFilterValue();
  console.log(columnFilterValue);
  return typeof firstValue === 'number' ? (
    <div className='flex space-x-2' onClick={(e) => e.stopPropagation()}>
      <input
        type='number'
        value={(columnFilterValue as [number, number])?.[0] ?? ''}
        onChange={(e) =>
          column.setFilterValue((old: [number, number]) => [
            e.target.value,
            old?.[1],
          ])
        }
        placeholder={`Min`}
        className='w-24 border shadow rounded'
      />
      <input
        type='number'
        value={(columnFilterValue as [number, number])?.[1] ?? ''}
        onChange={(e) =>
          column.setFilterValue((old: [number, number]) => [
            old?.[0],
            e.target.value,
          ])
        }
        placeholder={`Max`}
        className='w-24 border shadow rounded'
      />
    </div>
  ) : (
    <input
      className='w-36 border shadow rounded'
      onChange={(e) => column.setFilterValue(e.target.value)}
      onClick={(e) => e.stopPropagation()}
      placeholder={`Search...`}
      type='text'
      value={(columnFilterValue ?? '') as string}
    />
  );
}
