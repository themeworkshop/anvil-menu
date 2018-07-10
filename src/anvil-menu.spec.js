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

      expect(list.getAttribute('hidden')).toEqual('hidden');
    });

    it('should open after being clicked when closed', () => {
      const list = document.querySelector('.tw-menu > [data-menu="primary"]');
      const button = document.querySelector('.tw-menu > .tw-menu__button');

      button.click();
      expect(list.getAttribute('hidden')).toEqual(null);
    });

    it('should close after being clicked when open', () => {
      const list = document.querySelector('.tw-menu > [data-menu="primary"]');
      const button = document.querySelector('.tw-menu > .tw-menu__button');

      button.click();
      expect(list.getAttribute('hidden')).toEqual(null);

      button.click();
      expect(list.getAttribute('hidden')).toEqual('hidden');
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
      expect(list.getAttribute('hidden')).toEqual(null);
      expect(childList.getAttribute('hidden')).toEqual('hidden');

      // Open the sub-menu
      childButton.click();
      expect(childList.getAttribute('hidden')).toEqual(null);

      // Close the main menu
      button.click();

      // Check that both menus are closed
      expect(list.getAttribute('hidden')).toEqual('hidden');
      expect(childList.getAttribute('hidden')).toEqual('hidden');
    });
  });

  describe('child menu', () => {
    it('should be closed on load', () => {
      const list = document.querySelector('.tw-menu > .tw-menu__list');

      expect(list.getAttribute('hidden')).toEqual('hidden');
    });

    it('should open after being clicked when closed', () => {
      const list = document.querySelector('.tw-menu [data-menu="secondary"]');
      const button = list.parentElement.querySelector('button');

      button.click();
      expect(list.getAttribute('hidden')).toEqual(null);
    });

    it('should close after being clicked when open', () => {
      const list = document.querySelector('.tw-menu [data-menu="secondary"]');
      const button = list.parentElement.querySelector('button');

      button.click();
      expect(list.getAttribute('hidden')).toEqual(null);

      button.click();
      expect(list.getAttribute('hidden')).toEqual('hidden');
    });

    it('should close other child menus when opened', () => {
      const childLists = document.querySelectorAll(
        '.tw-menu [data-menu="secondary"]'
      );
      const childButton = childLists[1].parentElement.querySelector('button');

      childButton.click();
      expect(childLists[0].getAttribute('hidden')).toEqual('hidden');
      expect(childLists[1].getAttribute('hidden')).toEqual(null);
    });
  });
});
