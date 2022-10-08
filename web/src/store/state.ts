export type State = {
  loggedIn: boolean;
  loginPopup: boolean;
  showMainDialog: boolean;
  notifications: number;
  profilePopup: boolean;
  user: any;
};

export const state: State = {
  showMainDialog: false,
  profilePopup: false,
  notifications: 0,
  loggedIn: false,
  loginPopup: false,
  user: null,
};
