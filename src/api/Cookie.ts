import { Cookies } from "react-cookie";

const cookie = new Cookies();

export const setCookie = (name: string, value: any) => {
  return cookie.set(name, value);
};

export const getCookie = (name: string) => {
  return cookie.get(name);
};

export const removeCookie = (name: string) => {
  return cookie.remove(name);
};
