class AnvilMenu {
  constructor(index, root) {
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
      const list = button.parentElement.querySelector(
        '[data-menu="primary"], [data-menu="secondary"]'
      );
      button.addEventListener('click', () => this.toggle(list, button));
      this.collapse(list, button);
    });
  }

  hideElement(el) {
    el.setAttribute('hidden', 'hidden');
    el.setAttribute('aria-expanded', 'false');
  }

  showElement(el) {
    el.removeAttribute('hidden');
    el.setAttribute('aria-expanded', 'true');
  }

  collapse(targetList, targetButton) {
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

  expand(targetList, targetButton) {
    if (targetList.dataset.menu === 'secondary') {
      const secondaryLists = this.root.querySelectorAll(
        '[data-menu="secondary"]'
      );

      secondaryLists.forEach(list => {
        this.hideElement(list);
      });
    }

    targetButton.classList.add('menu-open');
    targetButton.classList.remove('menu-closed');
    targetList.removeAttribute('hidden');
    targetList.setAttribute('aria-expanded', 'true');
  }

  toggle(targetList, targetButton) {
    if (targetList.getAttribute('aria-expanded') === 'true') {
      this.collapse(targetList, targetButton);
    } else {
      this.expand(targetList, targetButton);
    }
  }
}

export default AnvilMenu;
