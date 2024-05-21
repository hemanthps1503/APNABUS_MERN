import React from 'react';
import '../resources/layout.css';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Defaultlayout({ children }) {
  const navigate = useNavigate();
  const [collapsed, setcollapsed] = React.useState(false);
  const { user } = useSelector((state) => state.users);
  const userMenu = [
    {
      name: 'Home',
      icon: 'ri-home-line',
      path: '/',
    },
    {
      name: 'Books',
      icon: 'ri-book-2-fill',
      path: '/bookings',
    },
    {
      name: 'Profile',
      icon: 'ri-user-line',
      path: '/Profile',
    },
    {
      name: 'Logout',
      icon: 'ri-logout-box-line',
      path: '/logout',
    },
  ];
  const adminmenu = [
    { name: 'Home', path: '/', icon: 'ri-home-line' },
    {
      name: 'Books',
      path: '/admin/buses',
      icon: 'ri-book-2-fill',
    },
    {
      name: 'Users',
      path: '/admin/users',
      icon: 'ri-user-line',
    },
    {
      name: 'Bookings',
      path: '/admin/bookings',
      icon: 'ri-file-list-line',
    },
    {
      name: 'Logout',
      path: '/logout',
      icon: 'ri-logout-box-line',
    },
  ];
  const menutoberendered = user?.isadmin ? adminmenu : userMenu;
  let activeroute = window.location.pathname;
  if (window.location.pathname.includes('book-now')) {
    activeroute = '/';
  }

  return (
    <div className="layout-parent">
      <div className="sidebar">
        <div className="sidebar-header">
          <h2 className="logo">Apna Lib</h2>
          <h1 className="role">
            {user?.name}
            <br />
            Role : {user?.isadmin ? 'Admin' : 'User'}
          </h1>
        </div>
        <div className="d-flex flex-column gap-3 justify-content-start menu">
          {menutoberendered.map((item, index) => {
            return (
              <div
                className={`${
                  activeroute === item.path && 'active-menu-item'
                } menu-item`}
              >
                <i className={item.icon}></i>
                {!collapsed && (
                  <span
                    onClick={() => {
                      if (item.path === '/logout') {
                        localStorage.removeItem('token');
                        navigate('/login');
                      } else {
                        navigate(item.path);
                      }
                    }}
                  >
                    {item.name}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>
      <div className="body">
        <div className="header">
          {collapsed ? (
            <i
              class="ri-menu-2-line"
              onClick={() => setcollapsed(!collapsed)}
            ></i>
          ) : (
            <i
              class="ri-close-fill"
              onClick={() => setcollapsed(!collapsed)}
            ></i>
          )}{' '}
        </div>
        <div className="content">{children}</div>
      </div>
    </div>
  );
}

export default Defaultlayout;
