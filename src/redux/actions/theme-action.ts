import { ThemeActionTypes } from '../../utility/redux/action-types';

export const toggleTheme = (theme: string) => {
  if (theme === 'dark') {
    theme = 'light';
    localStorage.setItem('mytheme', 'light');
    return {
      type: ThemeActionTypes.TOGGLE_THEME,
      payload: theme,
    };
  } else {
    theme = 'dark';
    localStorage.setItem('mytheme', 'dark');

    return {
      type: ThemeActionTypes.TOGGLE_THEME,
      payload: theme,
    };
  }
};
