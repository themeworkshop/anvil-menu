class AnvilMenu {
  root: HTMLElement;
  index: number;
  buttons: NodeListOf<HTMLButtonElement>;
  lists: NodeListOf<HTMLElement>;

  constructor(index: number, root: HTMLElement) {
    this.root = root;
    this.index = index;
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
    el.setAttribute('aria-expanded', 'false');
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
    targetList.removeAttribute('hidden');
    targetList.setAttribute('aria-expanded', 'true');
  }

  toggle(targetList: HTMLElement, targetButton: HTMLButtonElement) {
    if (targetList.getAttribute('aria-expanded') === 'true') {
      this.collapse(targetList, targetButton);
    } else {
      this.expand(targetList, targetButton);
    }
  }
}

export default AnvilMenu;
