import { Link, Outlet } from 'react-router-dom';

export const DasboardLayout = () => {
  return (
    <section>
      <nav>
        <Link to={'/'}>Inicio</Link>
        <Link to={'/table'}>Table</Link>
      </nav>

      <div>
        <Outlet />
      </div>
    </section>
  );
};
