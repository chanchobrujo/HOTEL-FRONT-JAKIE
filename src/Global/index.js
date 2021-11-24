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

  const reports = {
    name: 'Reportes',
    link: '/Reports',
  };
  const objRoom = {
    name: 'Mantenimiento de habitaciones',
    link: '/Rooms',
  };
  const objUser = {
    name: 'Mantenimiento de usuarios',
    link: '/Users',
  };
  const objRes = {
    name: 'Cambiar el estado de una reservación',
    link: '/RervationsChangeState',
  };

  if (store.state.isAdmin == true) {
    routes.push(objRes, objRoom, objUser, reports);
  }
  if (store.state.isRecep == true) {
    routes.push(objRoom);
  }

  return routes;
}

export function dateFormat(date) {
  return date.toString().substr(0, 10);
}

export function findAuth(rolename, array) {
  if (array.filter((role) => role.authority == rolename) == 0) {
    return false;
  }
  return true;
}

export function moneyAsing(amount) {
  return amount.toFixed(2);
}

export function noImage() {
  return store.state.firtsname.charAt(0) + store.state.lastname.charAt(0);
}
