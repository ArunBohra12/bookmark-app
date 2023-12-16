import { mediumScreenQuery } from './mediaQueries';

const mobileNavMenu = document.getElementById('mobile-nav-menu')!;
const mobileNavMenuOpenBtn = document.getElementById('mobile-nav-menu-open') as HTMLButtonElement;
const mobileNavMenuCloseBtn = document.getElementById('mobile-nav-menu-close') as HTMLButtonElement;

export const isMenuOpen = () => mobileNavMenu.dataset.isOpen === 'true';

/**
 * Sets the state of the mobile nav menu
 * @param state true = will open navbar | false = will close navbar
 */
export const setMobileNavMenuState = (state: boolean) => {
  if (state === true) {
    mobileNavMenu.classList.remove('hidden');
  } else {
    mobileNavMenu.classList.add('hidden');
  }

  mobileNavMenu.dataset.isOpen = state === true ? 'true' : 'false';
};

export const initNavToggleHandlers = () => {
  mobileNavMenuOpenBtn.addEventListener('click', () => setMobileNavMenuState(true));
  mobileNavMenuCloseBtn.addEventListener('click', () => setMobileNavMenuState(false));
};

window.addEventListener('resize', () => {
  // Close the mobile nav, when window is resized
  // and becomes bigger for the mobile nav to be visible
  if (mediumScreenQuery.matches) setMobileNavMenuState(false);
});
