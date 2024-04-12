import { atom } from "jotai";

export const defaultUserObject = {
  id: null,
  username: "",
  firstName: "",
  lastName: "",
  groups: [],
  dates: [],
};

export const userAtom = atom(defaultUserObject);
