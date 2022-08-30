import Component from '../lib/component.js';
import store from '../store/index.js';

export default class Note extends Component {
  constructor() {
    super({
      store,
      element: document.querySelector('#note')
    });
  }

  render() {
    if (store.state.notes.length === 0) {
      this.element.innerHTML = `
      No Notes Yet!
      `;
      return;
    }
    this.element.innerHTML = `
    ${store.state.notes}
    `;
  }
}