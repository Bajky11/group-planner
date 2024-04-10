import { atom } from 'jotai';

export const userAtom = atom({
  id: null,
  username: '',
  firstName: '',
  lastName: '',
  // Další uživatelská data, ale heslo nezahrnujte
});