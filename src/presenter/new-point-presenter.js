import { render, remove, RenderPosition } from '../framework/render.js';
import AddNewPointButton from '../view/add-point-button.js';
import EditPoint from '../view/edit-point.js';
import { UserAction, UpdateType } from '../utilities/constants.js';

const newPointSkeleton = {
  basePrice: 0,
  dateFrom: null,
  dateTo: null,
  destination: null,
  isFavorite: false,
  offers: [],
  type: 'flight'
};

export default class NewPointPresenter {
  #newPointComponent = null;
  #pointModel = null;
  #onDataAdd = null;

  constructor({ pointModel, onDataAdd }) {
    this.#pointModel = pointModel;
    this.#onDataAdd = onDataAdd

    this.addNewPointButton = new AddNewPointButton({
      onClick: () => {
        this.#addNewPointClickHandler();
      }
    });
    this.addNewButtonContainer = document.querySelector('.trip-main');
  }

  init() {
    render(this.addNewPointButton, this.addNewButtonContainer, 'beforeend');
  }

  #addNewPointClickHandler() {
    this.#newPointComponent = new EditPoint({
      point: newPointSkeleton,
      model: this.#pointModel,
      onSubmit: this.#addPointHandler,
      onDelete: this.#onCancelHandler
    });

    render(this.#newPointComponent, document.querySelector('.trip-events__list'),'afterbegin');
  }

  #onCancelHandler = () => {
    remove(this.#newPointComponent);
    this.addNewPointButton.reset();
  }

  #addPointHandler = (point) => {
    remove(this.#newPointComponent);
    this.addNewPointButton.reset();
    this.#onDataAdd(
      UserAction.ADD_POINT,
      UpdateType.MINOR,
      point,
    );
  }
}
