import { Pokemon } from '@/types/pokemon.type';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';
import { useEffect, useState } from 'react';

const Table = ({
  columns,
  data,
}: {
  data: Pokemon[];
  columns: ColumnDef<Pokemon>[];
}) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const table = useReactTable({
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    data,
    columns,
    state: {
      sorting,
    },
  });
  useEffect(() => {
    table.setPageSize(30);
  }, [table]);

  return (
    <div className=' w-full p-5'>
      <table className='min-w-full bg-white border border-gray-300'>
        <thead className='bg-gray-200'>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                const firstValue = table
                  .getPreFilteredRowModel()
                  .flatRows[0]?.getValue(header.column.id);
                const columnFilterValue = header.column.getFilterValue();

                return (
                  <th
                    onClick={header.column.getToggleSortingHandler()}
                    key={header.id}
                    className='select-none text-left text-xs font-medium text-gray-700 uppercase tracking-wider px-5 py-2 cursor-pointer'
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                    {{ asc: '⬆️', desc: '⬇️' }[
                      header.column.getIsSorted() as string
                    ] ?? null}

                    {typeof firstValue !== 'number' ? (
                      <div className='m-1'>
                        <input
                          className='w-full p-1 rounded'
                          type='text'
                          value={(columnFilterValue ?? '') as string}
                          onChange={(e) =>
                            header.column.setFilterValue(e.target.value)
                          }
                          onClick={(e) => e.stopPropagation()}
                        />
                      </div>
                    ) : (
                      <div
                        className='flex space-x-2 justify-between p-1'
                        onClick={(e) => e.stopPropagation()}
                      >
                        <input
                          type='number'
                          min={1}
                          value={
                            (columnFilterValue as [number, number])?.[0] ?? ''
                          }
                          onChange={(e) =>
                            header.column.setFilterValue(
                              (old: [number, number]) => [
                                e.target.value,
                                old?.[1],
                              ]
                            )
                          }
                          placeholder={`Min`}
                          className='w-24 border shadow rounded'
                        />
                        <input
                          type='number'
                          min={1}
                          value={
                            (columnFilterValue as [number, number])?.[1] ?? ''
                          }
                          onChange={(e) =>
                            header.column.setFilterValue(
                              (old: [number, number]) => [
                                old?.[0],
                                e.target.value,
                              ]
                            )
                          }
                          placeholder={`Max`}
                          className='w-24 border shadow rounded'
                        />
                      </div>
                    )}
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody className='bg-white'>
          {table.getRowModel().rows.map((row) => (
            <tr
              key={row.id}
              className='border-b border-gray-200 hover:bg-gray-100'
            >
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className='p-2'>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <section>
        <div className='flex justify-center p-2'>
          Page&nbsp;
          <strong>
            {table.getState().pagination.pageIndex + 1} of{' '}
            {table.getPageCount()}
          </strong>
        </div>
        <div className='flex space-x-5 justify-center p-5'>
          <button
            onClick={() => table.firstPage()}
            className='border-gray-300 border-[1px] px-5 py-1 rounded'
          >
            {'<<'}
          </button>
          <button
            disabled={!table.getCanPreviousPage()}
            onClick={() => table.previousPage()}
            className='border-gray-300 border-[1px] px-5 py-1 rounded'
          >
            {'<'}
          </button>
          <button
            disabled={!table.getCanNextPage()}
            onClick={() => table.nextPage()}
            className='border-gray-300 border-[1px] px-5 py-1 rounded'
          >
            {'>'}
          </button>
          <button
            onClick={() => table.lastPage()}
            className='border-gray-300 border-[1px] px-5 py-1 rounded'
          >
            {'>>'}
          </button>
        </div>
      </section>
    </div>
  );
};

export default Table;
