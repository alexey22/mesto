export default class Section {
  constructor(
    { items, renderer },
    containerSelector,
    api, // сюда передан объект с коллбекам, а не сам класс (имя поля объекта совпадает с названием метода класса)
    userId,
    popupDeleteCard // сюда передан объект с коллбекам, а не сам класс (имя поля объекта совпадает с названием метода класса)
  ) {
    this._items = items;
    this._renderer = renderer;
    this._containerSelector = containerSelector;
    this._containerElement = document.querySelector(containerSelector);
    this._api = api; // сюда передан объект с коллбекам, а не сам класс (имя поля объекта совпадает с названием метода класса)
    this._userId = userId;
    this._popupDeleteCard = popupDeleteCard; // сюда передан объект с коллбекам, а не сам класс (имя поля объекта совпадает с названием метода класса)
  }

  _renderCard(cardElement) {
    this._containerElement.prepend(cardElement);
  }

  renderAll() {
    this._items.forEach((item) => {
      this._renderCard(
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
        })
      );
    });
  }

  addItem(name, link, likes, _id, ownerId) {
    this._renderCard(
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
      })
    );
  }
}
