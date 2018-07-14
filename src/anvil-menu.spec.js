import AnvilMenu from './anvil-menu';

describe('Menu', () => {
  beforeEach(() => {
    const Fixture = `
    <header>
      <nav data-component="menu" class="tw-menu">
        <button class="tw-menu__button" data-menu="button">Menu</button>
        <ul class="tw-menu__list" data-menu="primary">
          <li class="tw-menu__option">
            <button class="tw-menu__button" data-menu="button">Page 1</button>
            <ul class="tw-menu__list" data-menu="secondary">
              <li>
                <a href="#">Page 1.1</a>
              </li>
              <li>
                <a href="#">Page 1.2</a>
              </li>
              <li>
                <a href="#">Page 1.3</a>
              </li>
              <li>
                <a href="#">Page 1.4</a>
              </li>
            </ul>
          </li>
          <li class="tw-menu__option">
            <a href="#">Page 2</a>
          </li>
          <li class="tw-menu__option">
            <a href="#">Page 3</a>
          </li>
          <li class="tw-menu__option">
            <button class="tw-menu__button" data-menu="button">Page 4</button>
            <ul class="tw-menu__list" data-menu="secondary">
              <li>
                <a href="#">Page 4.1</a>
              </li>
              <li>
                <a href="#">Page 4.2</a>
              </li>
              <li>
                <a href="#">Page 4.3</a>
              </li>
              <li>
                <a href="#">Page 4.4</a>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    </header>
    `;
    document.body.innerHTML = Fixture;

    const element = document.querySelector('[data-component="menu"]');
    new AnvilMenu(0, element);
  });

  describe('parent menu', () => {
    it('should be closed on load', () => {
      const list = document.querySelector('.tw-menu > [data-menu="primary"]');
      const button = document.querySelector('.tw-menu > .tw-menu__button');

      // Expect that the menu is hidden
      expect(list.getAttribute('hidden')).toBe('hidden');

      // Expect button class to be updated correctly
      expect(button.classList.contains('menu-closed')).toBe(true);
    });

    it('should open after being clicked when closed', () => {
      const list = document.querySelector('.tw-menu > [data-menu="primary"]');
      const button = document.querySelector('.tw-menu > .tw-menu__button');

      button.click();

      // Expect that the menu is open
      expect(list.getAttribute('hidden')).toBeNull();

      // Expect button class to be updated correctly
      expect(button.classList.contains('menu-open')).toBe(true);
    });

    it('should close after being clicked when open', () => {
      const list = document.querySelector('.tw-menu > [data-menu="primary"]');
      const button = document.querySelector('.tw-menu > .tw-menu__button');

      button.click();
      expect(list.getAttribute('hidden')).toBeNull();

      button.click();

      // Expect that the menu is hidden
      expect(list.getAttribute('hidden')).toBe('hidden');

      // Expect button class to be updated correctly
      expect(button.classList.contains('menu-closed')).toBe(true);
    });

    it('should close the child lists belonging to it when closed', () => {
      const list = document.querySelector('.tw-menu [data-menu="primary"]');
      const button = document.querySelector('.tw-menu > button');
      const childList = document.querySelector(
        '.tw-menu [data-menu="secondary"]'
      );
      const childButton = childList.parentElement.querySelector('button');

      // Open the main menu
      button.click();
      expect(list.getAttribute('hidden')).toBeNull();
      expect(childList.getAttribute('hidden')).toBe('hidden');

      // Open the sub-menu
      childButton.click();
      expect(childList.getAttribute('hidden')).toBeNull();

      // Close the main menu
      button.click();

      // Expect that both menus are closed
      expect(list.getAttribute('hidden')).toBe('hidden');
      expect(childList.getAttribute('hidden')).toBe('hidden');

      // Expect button class to be updated correctly
      expect(button.classList.contains('menu-closed')).toBe(true);
    });
  });

  describe('child menu', () => {
    it('should be closed on load', () => {
      const list = document.querySelector('.tw-menu > .tw-menu__list');
      const button = list.parentElement.querySelector('button');

      // Expect hidden state to be updated correctly
      expect(list.getAttribute('hidden')).toBe('hidden');

      // Expect button class to be updated correctly
      expect(button.classList.contains('menu-closed')).toBe(true);
    });

    it('should open after being clicked when closed', () => {
      const list = document.querySelector('.tw-menu [data-menu="secondary"]');
      const button = list.parentElement.querySelector('button');

      button.click();

      // Expect hidden state to be updated correctly
      expect(list.getAttribute('hidden')).toBeNull();

      // Expect button class to be updated correctly
      expect(button.classList.contains('menu-open')).toBe(true);
    });

    it('should close after being clicked when open', () => {
      const list = document.querySelector('.tw-menu [data-menu="secondary"]');
      const button = list.parentElement.querySelector('button');

      button.click();
      expect(list.getAttribute('hidden')).toBeNull();

      button.click();

      // Expect hidden state to be updated correctly
      expect(list.getAttribute('hidden')).toBe('hidden');

      // Expect button class to be updated correctly
      expect(button.classList.contains('menu-closed')).toBe(true);
    });

    it('should close other child menus when opened', () => {
      const childLists = document.querySelectorAll(
        '.tw-menu [data-menu="secondary"]'
      );
      const childButton0 = childLists[0].parentElement.querySelector('button');
      const childButton1 = childLists[1].parentElement.querySelector('button');

      childButton1.click();

      // Expect hidden states to be updated correctly
      expect(childLists[0].getAttribute('hidden')).toBe('hidden');
      expect(childLists[1].getAttribute('hidden')).toBeNull();

      // Expect button classes to be updated correctly
      expect(childButton0.classList.contains('menu-closed')).toBe(true);
      expect(childButton1.classList.contains('menu-open')).toBe(true);
    });
  });
});
