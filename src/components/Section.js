export default class Section {
  constructor(
    { items, renderer },
    containerSelector,
    api,
    userId,
    popupDeleteCard
  ) {
    this._items = items;
    this._renderer = renderer;
    this._containerSelector = containerSelector;
    this._containerElement = document.querySelector(containerSelector);
    this._api = api;
    this._userId = userId;
    this._popupDeleteCard = popupDeleteCard;
  }

  renderAll() {
    this._items.forEach((item) => {
      this._renderer({
        name: item.name,
        link: item.link,
        likes: item.likes,
        _id: item._id,
        ownerId: item.owner._id,
        userId: this._userId,
        containerElement: this._containerElement,
        api: this._api,
        popupDeleteCard: this._popupDeleteCard,
      });
    });
  }

  addItem(name, link, likes, _id, ownerId) {
    this._renderer({
      name,
      link,
      likes,
      _id,
      ownerId,
      userid: this._userId,
      containerElement: this._containerElement,
      api: this._api,
      popupDeleteCard: this._popupDeleteCard,
    });
  }
}
