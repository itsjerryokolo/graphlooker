import { ThemeActionTypes } from '../../utility/redux/action-types';
import Constants from '../../utility/constant';

const label = Constants.LABELS.commonLables;

if(!localStorage.getItem("mytheme")) {
  localStorage.setItem("mytheme", label.DARK_THEME_LABEL)
}

export const toggleTheme = (theme: string) => {
  if (theme === label.LIGHT_THEME_LABEL) {
    theme = label.DARK_THEME_LABEL;
    localStorage.setItem('mytheme', label.DARK_THEME_LABEL);
    return {
      type: ThemeActionTypes.TOGGLE_THEME,
      payload: theme,
    };
  } else {
    theme = label.LIGHT_THEME_LABEL;
    localStorage.setItem('mytheme', label.LIGHT_THEME_LABEL);

    return {
      type: ThemeActionTypes.TOGGLE_THEME,
      payload: theme,
    };
  }
};
