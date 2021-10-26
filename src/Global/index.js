/** @format */

export function findAuth(rolename, array) {
  if (array.filter((role) => role.authority == rolename) == 0) {
    return false;
  }
  return true;
}
