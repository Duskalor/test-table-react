import { fetchPokemons } from '@/lib/fetch-pokemon';
import { Pokemon } from '@/types/pokemon.type';
import { ColumnDef } from '@tanstack/react-table';
import { useEffect, useState } from 'react';
import Table from './table';

function TablePokemon() {
  const [data, setpokemons] = useState<Pokemon[]>([]);
  const [loading, setloading] = useState(true);

  useEffect(() => {
    fetchPokemons()
      .then(setpokemons)
      .finally(() => setloading(false));
  }, []);

  const columns: ColumnDef<Pokemon>[] = [
    {
      header: 'Name',
      accessorKey: 'name',
    },
    {
      header: 'Location',
      accessorKey: 'location_area_encounters',
      // cell: ({ row }) => row.original.types.map((t) => t.type.name).join(', '),
    },
    {
      header: 'Base Experience',
      accessorKey: 'base_experience',
    },
    {
      header: 'Height',
      accessorKey: 'height',
    },
    {
      header: 'Weight',
      accessorKey: 'weight',
    },
  ];

  return (
    <div
      className={`w-full flex   ${loading && 'items-center justify-center'}`}
    >
      {loading && (
        <div className='animate-bounce text-center text-3xl'>Loading...</div>
      )}
      {!loading && <Table {...{ data, columns }} />}
    </div>
  );
}

export default TablePokemon;
