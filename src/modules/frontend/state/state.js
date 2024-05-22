import { atom } from "jotai";

export const defaultUserObject = {
  id: null,
  username: "",
  firstName: "",
  lastName: "",
  groups: [],
  dates: [],
};

const initialState = {
  loggedUser: null,
  selectedGroup: null,
};

export const userAtom = atom(defaultUserObject);

export const appStateAtom = atom(initialState);

const setObjectAtom = atom(
  null, // tento atom nemá "get" hodnotu
  (get, set, { propertyName, newValue }) => {
    const state = get(appStateAtom);
    set(appStateAtom, { ...state, [propertyName]: newValue });
  }
);

const setObjectPropertyAtom = atom(
  null,
  (get, set, { objectKey, targetProperty, updatedValue }) => {
    set(appStateAtom, (state) => ({
      ...state,
      [objectKey]: {
        ...state.selectedPlantItem,
        [targetProperty]: updatedValue,
      },
    }));
  }
);

// Nový atom pro nastavení vlastnosti položky v poli uvnitř objektu
const setObjectPropertyArrayItemAtom = atom(
  null,
  (get, set, { objectKey, targetProperty, itemId, updatedValue }) => {
    set(appStateAtom, (state) => ({
      ...state,
      [objectKey]: {
        ...state[objectKey],
        [targetProperty]: state[objectKey][targetProperty].map((item) =>
          item.id === itemId ? { ...item, ...updatedValue } : item
        ),
      },
    }));
  }
);

// Atom pro nastavení konkrétního atributu objektu v poli uvnitř objektu
const setObjectPropertyArrayItemAttributeAtom = atom(
  null,
  (
    get,
    set,
    { objectKey, targetProperty, itemId, attribute, updatedValue }
  ) => {
    set(appStateAtom, (state) => ({
      ...state,
      [objectKey]: {
        ...state[objectKey],
        [targetProperty]: state[objectKey][targetProperty].map((item) =>
          item.id === itemId ? { ...item, [attribute]: updatedValue } : item
        ),
      },
    }));
  }
);

export const setSelectedGroupAtom = atom(null, (get, set, selectedGroupObj) => {
  set(setObjectAtom, {
    propertyName: "selectedGroup",
    newValue: selectedGroupObj,
  });
});

export const setLoggedUserAtom = atom(null, (get, set, loggedUserObj) => {
  set(setObjectAtom, {
    propertyName: "loggedUser",
    newValue: loggedUserObj,
  });
});

export const toggleVisibilityToGroupUserAtom = atom(
  null,
  (get, set, { userId, newValue }) => {
    set(setObjectPropertyArrayItemAttributeAtom, {
      objectKey: "selectedGroup",
      targetProperty: "users",
      itemId: userId,
      attribute: "visible",
      updatedValue: newValue,
    });
  }
);
