export type State = {
  loggedIn: boolean;
  loginPopup: boolean;
  showMainDialog: boolean;
  notifications: number;
  profilePopup: boolean;
  user: any;
  darkMode: boolean;
  ctk: string | null;
};

export const state: State = {
  showMainDialog: false,
  profilePopup: false,
  notifications: 0,
  darkMode: true,
  loggedIn: false,
  ctk: null,
  loginPopup: false,
  user: null,
};
