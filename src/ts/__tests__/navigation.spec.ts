import { isMenuOpen, setMobileNavMenuState } from '../navigation-menu';

describe('Mobile navigation menu', () => {
  let mobileNavMenu: HTMLElement;

  beforeEach(() => {
    document.body.insertAdjacentHTML(
      'beforeend',
      `<nav class="mx-auto mt-10 flex items-center justify-between px-8 md:mt-12 xl:max-w-[1104px] xl:px-0">
        <a href="/" aria-label="Homepage">
          <img src="/images/logo-bookmark.svg" height="25" alt="Bookmark homepage" />
        </a>
  
        <button type="button" class="md:hidden" aria-label="Open menu" id="mobile-nav-menu-open">
          <img src="/images/icon-hamburger.svg" alt="Open Navigation" width="18" height="15" />
        </button>
  
        <nav
          id="mobile-nav-menu"
          class="fixed inset-0 hidden h-screen w-full flex-col bg-blue p-8 pb-12 opacity-95 md:hidden"
          data-is-open="false">
          <div class="flex items-center justify-between">
            <a href="/" aria-label="Homepage">
              <img src="/images/logo-bookmark-dark.svg" height="25" alt="Bookmark homepage" />
            </a>
  
            <button type="button" aria-label="Close menu" id="mobile-nav-menu-close">
              <img src="/images/icon-close.svg" width="16" height="15" alt="Close navigation" />
            </button>
          </div>
  
          <div class="mb-auto mt-10 text-xl tracking-[2.308px] text-white">
            <a
              href="/login"
              class="mx-auto block w-full max-w-[308px] rounded-[5px] border-2 border-white py-2 text-center font-medium transition-colors duration-300 hover:border-red hover:text-red">
              LOGIN
            </a>
          </div>
        </nav>
      </nav>`,
    );

    mobileNavMenu = document.getElementById('mobile-nav-menu')!;
  });

  it('Should be hidden at the beginning', () => {
    expect(isMenuOpen(mobileNavMenu)).toBe(false);
  });

  it.each([
    { input: true, output: true },
    { input: false, output: false },
  ])(
    'Should correctly toggle the nav menu based on the input when setMobileNavMenuState is called',
    ({ input, output }) => {
      setMobileNavMenuState(input, mobileNavMenu);

      expect(isMenuOpen(mobileNavMenu)).toBe(output);

      // Correctly toggles classes to show/hide element
      expect(mobileNavMenu.classList).toContain(output === true ? 'flex' : 'hidden');
      expect(mobileNavMenu.classList).not.toContain(output === true ? 'hidden' : 'flex');
    },
  );

  it('Should be unaffected when trying to open already opened nav', () => {
    setMobileNavMenuState(true, mobileNavMenu);
    setMobileNavMenuState(true, mobileNavMenu);
    expect(isMenuOpen(mobileNavMenu)).toBe(true);
  });

  it('Should be unaffected when trying to close already closed nav', () => {
    setMobileNavMenuState(false, mobileNavMenu);
    setMobileNavMenuState(false, mobileNavMenu);
    expect(isMenuOpen(mobileNavMenu)).toBe(false);
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });
});
