import { ThemeActionTypes } from '../../utility/redux/action-types';
import Constants from '../../utility/constant';

const label = Constants.LABELS.commonLables;

export const toggleTheme = (theme: string) => {
  if (theme === label.DARK_THEME_LABEL) {
    theme = label.LIGHT_THEME_LABEL;
    localStorage.setItem('mytheme', label.LIGHT_THEME_LABEL);
    return {
      type: ThemeActionTypes.TOGGLE_THEME,
      payload: theme,
    };
  } else {
    theme = label.DARK_THEME_LABEL;
    localStorage.setItem('mytheme', label.DARK_THEME_LABEL);

    return {
      type: ThemeActionTypes.TOGGLE_THEME,
      payload: theme,
    };
  }
};
