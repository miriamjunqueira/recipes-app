import { Outlet } from 'react-router-dom';
// import NavBar from '../nav-bar';
import Header from './Header';

function Layout() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default Layout;
