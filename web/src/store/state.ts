export type State = {
  loggedIn: boolean;
  loginPopup: boolean;
  showMainDialog: boolean;
  profilePopup: boolean;
  user: any;
};

export const state: State = {
  showMainDialog: false,
  profilePopup: false,
  loggedIn: false,
  loginPopup: false,
  user: null,
};
