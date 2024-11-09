import { createBrowserRouter } from 'react-router-dom';
import { TableLayour } from './layout/table-layout';
import { TableRouter } from './router/table-router';
import TablePokemon from './components/table-pokemon';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <TableLayour />,
    children: [
      { path: '/', element: <TableRouter /> },
      {
        path: '/pokemon',
        element: <TablePokemon />,
      },
    ],
  },
]);
