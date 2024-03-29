class ItcAccordion {
  constructor(target, config) {
    this._el = typeof target === 'string' ? document.querySelector(target) : target;
    const defaultConfig = {
      alwaysOpen: true,
      duration: 350,
    };
    this._config = Object.assign(defaultConfig, config);
    this.addEventListener();
  }

  addEventListener() {
    this._el.addEventListener('click', (e) => {
      const elHeader = e.target.closest('.accordion__header');
      if (!elHeader) {
        return;
      }
      if (!this._config.alwaysOpen) {
        const elOpenItem = this._el.querySelector('.accordion__item-show');
        if (elOpenItem) {
          if (elOpenItem !== elHeader.parentElement) {
            this.toggle(elOpenItem);
          }
        }
      }
      this.toggle(elHeader.parentElement);
    });
  }

  show(el) {
    const elBody = el.querySelector('.accordion__body');
    if (elBody.classList.contains('collapsing') || el.classList.contains('accordion__item-show')) {
      return;
    }
    elBody.style['display'] = 'block';
    const height = elBody.offsetHeight;
    elBody.style['height'] = 0;
    elBody.style['overflow'] = 'hidden';
    elBody.style['transition'] = `height ${this._config.duration}ms ease`;
    elBody.classList.add('collapsing');
    el.classList.add('accordion__item-slidedown');
    // elBody.offsetHeight;
    elBody.style['height'] = `${height}px`;
    window.setTimeout(() => {
      elBody.classList.remove('collapsing');
      el.classList.remove('accordion__item-slidedown');
      elBody.classList.add('collapse');
      el.classList.add('accordion__item-show');
      elBody.style['display'] = '';
      elBody.style['height'] = '';
      elBody.style['transition'] = '';
      elBody.style['overflow'] = '';
    }, this._config.duration);
  }

  hide(el) {
    const elBody = el.querySelector('.accordion__body');
    if (elBody.classList.contains('collapsing') || !el.classList.contains('accordion__item-show')) {
      return;
    }
    elBody.style['height'] = `${elBody.offsetHeight}px`;
    // elBody.offsetHeight;
    elBody.style['display'] = 'block';
    elBody.style['height'] = 0;
    elBody.style['overflow'] = 'hidden';
    elBody.style['transition'] = `height ${this._config.duration}ms ease`;
    elBody.classList.remove('collapse');
    el.classList.remove('accordion__item-show');
    elBody.classList.add('collapsing');
    window.setTimeout(() => {
      elBody.classList.remove('collapsing');
      elBody.classList.add('collapse');
      elBody.style['display'] = '';
      elBody.style['height'] = '';
      elBody.style['transition'] = '';
      elBody.style['overflow'] = '';
    }, this._config.duration);
  }

  toggle(el) {
    if (el.classList.contains('accordion__item-show')) {
      this.hide(el);
    }
    this.show(el);
  }
}

const accordion = new ItcAccordion(document.querySelector('.accordion'), {
  alwaysOpen: false,
});

export {accordion};
