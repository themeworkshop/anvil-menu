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
      button.addEventListener('click', () => this.toggle(list));
      this.collapse(list);
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

  collapse(el) {
    if (el.dataset.menu === 'primary') {
      this.lists.forEach(list => {
        this.hideElement(list);
      });
    } else {
      this.hideElement(el);
    }
  }

  expand(el) {
    if (el.dataset.menu === 'secondary') {
      const secondaryLists = this.root.querySelectorAll(
        '[data-menu="secondary"]'
      );

      secondaryLists.forEach(list => {
        this.hideElement(list);
      });
    }

    el.removeAttribute('hidden');
    el.setAttribute('aria-expanded', 'true');
  }

  toggle(el) {
    if (el.getAttribute('aria-expanded') === 'true') {
      this.collapse(el);
    } else {
      this.expand(el);
    }
  }
}

export default AnvilMenu;
