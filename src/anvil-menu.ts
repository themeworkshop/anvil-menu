interface ComponentConfig {
  index: number;
  element: Element;
}
class AnvilMenu {
  root: Element;
  index: number;
  buttons: NodeListOf<HTMLButtonElement>;
  lists: NodeListOf<HTMLElement>;

  constructor(config: ComponentConfig) {
    this.root = config.element;
    this.index = config.index;
    this.buttons = this.root.querySelectorAll('[data-menu="button"]');
    this.lists = this.root.querySelectorAll(
      '[data-menu="primary"], [data-menu="secondary"]'
    );
    this.load();
  }

  load() {
    this.buttons.forEach(button => {
      const list: HTMLElement = button.parentElement.querySelector(
        '[data-menu="primary"], [data-menu="secondary"]'
      );
      button.addEventListener('click', () => this.toggle(list, button));
      this.collapse(list, button);
    });
  }

  hideElement(el: HTMLElement) {
    el.setAttribute('hidden', 'hidden');
  }

  collapse(targetList: HTMLElement, targetButton: HTMLButtonElement) {
    if (targetList.dataset.menu === 'primary') {
      this.lists.forEach(list => {
        this.hideElement(list);
      });
      this.buttons.forEach(button => {
        button.classList.replace('menu-open', 'menu-closed');
      });
    } else {
      this.hideElement(targetList);
    }

    targetButton.setAttribute('aria-expanded', 'false');
    targetButton.classList.add('menu-closed');
    targetButton.classList.remove('menu-open');
  }

  expand(targetList: HTMLElement, targetButton: HTMLButtonElement) {
    if (targetList.dataset.menu === 'secondary') {
      const secondaryLists = this.root.querySelectorAll(
        '[data-menu="secondary"]'
      ) as NodeListOf<HTMLElement>;

      secondaryLists.forEach(list => {
        this.hideElement(list);
      });
    }

    targetButton.classList.add('menu-open');
    targetButton.classList.remove('menu-closed');
    targetButton.setAttribute('aria-expanded', 'true');
    targetList.removeAttribute('hidden');
  }

  toggle(targetList: HTMLElement, targetButton: HTMLButtonElement) {
    if (targetButton.getAttribute('aria-expanded') === 'true') {
      this.collapse(targetList, targetButton);
    } else {
      this.expand(targetList, targetButton);
    }
  }
}

export default AnvilMenu;
