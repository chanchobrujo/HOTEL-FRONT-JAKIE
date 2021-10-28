/** @format */

import store from '../store/index.js';

export async function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

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

  if (store.state.isAdmin == true) {
    routes.push(objRoom, objUser);
  }
  if (store.state.isRecep == true) {
    routes.push(objRoom);
  }
  if (store.state.isHuesp == true) {
    routes.push();
  }

  return routes;
}

export function findAuth(rolename, array) {
  if (array.filter((role) => role.authority == rolename) == 0) {
    return false;
  }
  return true;
}

export function noImage() {
  return store.state.firtsname.charAt(0) + store.state.lastname.charAt(0);
}
