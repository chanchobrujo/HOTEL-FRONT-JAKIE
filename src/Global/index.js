/** @format */

import store from '../store/index.js';

export function routesByRole() {
  const routes = [];

  const objRoom = {
    name: 'Mantenimiento de habitaciones',
    link: '/Rooms',
  };
  const objUser = {
    name: 'Mantenimiento de usuarios',
    link: '/Users',
  };
  const objRes = {
    name: 'Mantenimiento de reservaciones',
    link: '/Reservations',
  };

  if (store.state.isAdmin == true) {
    routes.push(objRoom, objUser, objRes);
  }
  if (store.state.isRecep == true) {
    routes.push(objRoom, objRes);
  }
  if (store.state.isHuesp == true) {
    routes.push(objRes);
  }

  return routes;
}

export function findAuth(rolename, array) {
  if (array.filter((role) => role.authority == rolename) == 0) {
    return false;
  }
  return true;
}

/* ,
      {
        name: 'Hacer una reservación',
        link: '/Reservations',
      },
      {
        name: 'Mantenimiento de usuarios',
        link: '/Users',
      }, */
