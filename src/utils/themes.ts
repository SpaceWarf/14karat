import christmasAvatarBorder from '../assets/images/themes/christmas/avatar-border.png';
import christmasHeaderBackground from '../assets/images/themes/christmas/header-background.png';
import christmasHEaderDecoration from '../assets/images/themes/christmas/header-decoration.png';
import christmasSidebarBackground from '../assets/images/themes/christmas/sidebar-background.png';

export enum Theme {
  CHRISTMAS = "christmas",
  NONE = "none",
}

export const getActiveTheme = (): Theme => {
  return Theme.NONE;
}

export const isThemeActive = (): boolean => {
  return getActiveTheme() !== Theme.NONE;
}

export const getAvatarBorder = (): string => {
  switch (getActiveTheme()) {
    case Theme.CHRISTMAS:
      return christmasAvatarBorder;
    default:
      return "";
  }
}

export const getHeaderBackground = (): string => {
  switch (getActiveTheme()) {
    case Theme.CHRISTMAS:
      return christmasHeaderBackground;
    default:
      return "";
  }
}

export const getHeaderDecoration = (): string => {
  switch (getActiveTheme()) {
    case Theme.CHRISTMAS:
      return christmasHEaderDecoration;
    default:
      return "";
  }
}

export const getSidebarBackground = (): string => {
  switch (getActiveTheme()) {
    case Theme.CHRISTMAS:
      return christmasSidebarBackground;
    default:
      return "";
  }
}
