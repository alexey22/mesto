export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._containerSelector = containerSelector;
    this._containerElement = document.querySelector(containerSelector);
  }

  renderAll() {
    this._items.forEach((item) => {
      this._renderer(item.name, item.link, this._containerElement);
    });
  }

  addItem(name, link) {
    this._renderer(name, link, this._containerElement);
  }
}
