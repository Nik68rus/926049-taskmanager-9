'use strict';
(function () {
  const menuContainer = document.querySelector(`.main__control`);
  const mainContainer = document.querySelector(`.main`);

  const filterElements = [
    {name: `All`, count: 13, isChecked: true},
    {name: `Overdue`, count: 0},
    {name: `Today`, count: 0},
    {name: `Favorites`, count: 1},
    {name: `Repeating`, count: 1},
    {name: `Tags`, count: 1},
    {name: `Archive`, count: 115},
  ];

  const menuElements = [
    {name: `new-task`},
    {name: `task`, isChecked: true},
    {name: `statistic`},
  ];

  const taskCard = {
    text: `Example default task with default color.`,
    date: {day: `23 SEPTEMBER`, time: `11:15 PM`},
    tags: [`todo`, `personal`, `important`],
  };


  const getMenuMarkup = ({name, isChecked = false} = {}) => {
    const id = name.toLowerCase();
    const menuName = name.toUpperCase() + `S`;
    return `
      <input
        type="radio"
        name="control"
        id="control__${id}"
        class="control__input visually-hidden"
        ${isChecked ? `checked` : ``}
      />
      <label
        for="control__${id}"
        class="control__label ${id === `new-task` ? `control__label--new-task` : ``}">
      ${id === `new-task` ? `+ ADD NEW TASK` : menuName}
      </label>
    `.trim();
  };

  const getSearchMarkup = () => {
    return `
      <section class="main__search search container">
        <input
          type="text"
          id="search__input"
          class="search__input"
          placeholder="START TYPING — SEARCH BY WORD, #HASHTAG OR DATE"
        />
        <label class="visually-hidden" for="search__input">Search</label>
      </section>
    `;
  };

  const getFilterMarkup = ({name, count = 0, isChecked = false} = {}) => {
    const id = name.toLowerCase();
    return `
      <input
        type="radio"
        id="filter__${id}"
        class="filter__input visually-hidden"
        name="filter"
        ${isChecked ? `checked` : ``}
      />
      <label for="filter__${id}" class="filter__label">
        ${name.toUpperCase()}
        <span class="filter__${id}-count">${count}</span>
      </label>`.trim();
  };

  const getMarkup = (dataList, generator) =>
    dataList.map(generator).join(`\n`);

  const getMarkupFilters = (data) =>
    getMarkup(data, getFilterMarkup);

  const filtersMarkup = getMarkupFilters(filterElements);

  const filterWrapper = `
  <section class="main__filter filter container">
    ${filtersMarkup}
  </section>`;

  const getMarkupMenu = (data) =>
    getMarkup(data, getMenuMarkup);

  const menuMarkup = getMarkupMenu(menuElements);

  const menuWrapper = `
  <section class="control__btn-wrap">
    ${menuMarkup}
  </section>`;

  const getTextArea = (text) => {
    return `<div class="card__textarea-wrap">
       <p class="card__text">${text}</p>
     </div>`;
  };

  const getDateMarkup = (date) => {
    return `
      <div class="card__dates">
        <div class="card__date-deadline">
          <p class="card__input-deadline-wrap">
            <span class="card__date">${date.day}</span>
            <span class="card__time">${date.time}</span>
          </p>
        </div>
      </div>
    `;
  };

  const getHashTagList = (tags) => {
    return getMarkup(tags, getHashTagMarkup);
  };

  const getHashTagMarkup = (tag) => {
    return `
      <span class="card__hashtag-inner">
        <span class="card__hashtag-name">
          #${tag}
        </span>
      </span>
    `;
  };

  const getTaskCard = (card) => {
    const hashTagMarkup = `
      <div class="card__hashtag">
        <div class="card__hashtag-list">
          ${getHashTagList(card.tags)}
        </div>
      </div>
    `;
    return `
      <article class="card card--black">
        <div class="card__form">
          <div class="card__inner">
            <div class="card__control">
              <button type="button" class="card__btn card__btn--edit">
                edit
              </button>
              <button type="button" class="card__btn card__btn--archive">
                archive
              </button>
              <button
                type="button"
                class="card__btn card__btn--favorites card__btn--disabled"
              >
                favorites
              </button>
            </div>

            <div class="card__color-bar">
              <svg class="card__color-bar-wave" width="100%" height="10">
                <use xlink:href="#wave"></use>
              </svg>
            </div>
            ${getTextArea(card.text)}
            <div class="card__settings">
              <div class="card__details">
                ${getDateMarkup(card.date)}
                ${card.tags.length > 0 ? hashTagMarkup : ``}
              </div>
            </div>
          </div>
        </div>
      </article>
    `.trim();
  };

  const getEditForm = () => {
    return `
      <article class="card card--edit card--black">
        <form class="card__form" method="get">
          <div class="card__inner">
            <div class="card__control">
              <button type="button" class="card__btn card__btn--archive">
                archive
              </button>
              <button
                type="button"
                class="card__btn card__btn--favorites card__btn--disabled"
              >
                favorites
              </button>
            </div>

            <div class="card__color-bar">
              <svg width="100%" height="10">
                <use xlink:href="#wave"></use>
              </svg>
            </div>

            <div class="card__textarea-wrap">
              <label>
                <textarea
                  class="card__text"
                  placeholder="Start typing your text here..."
                  name="text"
                >This is example of new task, you can add picture, set date and time, add tags.</textarea>
              </label>
            </div>

            <div class="card__settings">
              <div class="card__details">
                <div class="card__dates">
                  <button class="card__date-deadline-toggle" type="button">
                    date: <span class="card__date-status">no</span>
                  </button>

                  <fieldset class="card__date-deadline" disabled>
                    <label class="card__input-deadline-wrap">
                      <input
                        class="card__date"
                        type="text"
                        placeholder="23 September"
                        name="date"
                      />
                    </label>
                  </fieldset>

                  <button class="card__repeat-toggle" type="button">
                    repeat:<span class="card__repeat-status">no</span>
                  </button>

                  <fieldset class="card__repeat-days" disabled>
                    <div class="card__repeat-days-inner">
                      <input
                        class="visually-hidden card__repeat-day-input"
                        type="checkbox"
                        id="repeat-mo-1"
                        name="repeat"
                        value="mo"
                      />
                      <label class="card__repeat-day" for="repeat-mo-1"
                        >mo</label
                      >
                      <input
                        class="visually-hidden card__repeat-day-input"
                        type="checkbox"
                        id="repeat-tu-1"
                        name="repeat"
                        value="tu"
                        checked
                      />
                      <label class="card__repeat-day" for="repeat-tu-1"
                        >tu</label
                      >
                      <input
                        class="visually-hidden card__repeat-day-input"
                        type="checkbox"
                        id="repeat-we-1"
                        name="repeat"
                        value="we"
                      />
                      <label class="card__repeat-day" for="repeat-we-1"
                        >we</label
                      >
                      <input
                        class="visually-hidden card__repeat-day-input"
                        type="checkbox"
                        id="repeat-th-1"
                        name="repeat"
                        value="th"
                      />
                      <label class="card__repeat-day" for="repeat-th-1"
                        >th</label
                      >
                      <input
                        class="visually-hidden card__repeat-day-input"
                        type="checkbox"
                        id="repeat-fr-1"
                        name="repeat"
                        value="fr"
                        checked
                      />
                      <label class="card__repeat-day" for="repeat-fr-1"
                        >fr</label
                      >
                      <input
                        class="visually-hidden card__repeat-day-input"
                        type="checkbox"
                        name="repeat"
                        value="sa"
                        id="repeat-sa-1"
                      />
                      <label class="card__repeat-day" for="repeat-sa-1"
                        >sa</label
                      >
                      <input
                        class="visually-hidden card__repeat-day-input"
                        type="checkbox"
                        id="repeat-su-1"
                        name="repeat"
                        value="su"
                        checked
                      />
                      <label class="card__repeat-day" for="repeat-su-1"
                        >su</label
                      >
                    </div>
                  </fieldset>
                </div>

                <div class="card__hashtag">
                  <div class="card__hashtag-list"></div>

                  <label>
                    <input
                      type="text"
                      class="card__hashtag-input"
                      name="hashtag-input"
                      placeholder="Type new hashtag here"
                    />
                  </label>
                </div>
              </div>

              <div class="card__colors-inner">
                <h3 class="card__colors-title">Color</h3>
                <div class="card__colors-wrap">
                  <input
                    type="radio"
                    id="color-black-1"
                    class="card__color-input card__color-input--black visually-hidden"
                    name="color"
                    value="black"
                    checked
                  />
                  <label
                    for="color-black-1"
                    class="card__color card__color--black"
                    >black</label
                  >
                  <input
                    type="radio"
                    id="color-yellow-1"
                    class="card__color-input card__color-input--yellow visually-hidden"
                    name="color"
                    value="yellow"
                  />
                  <label
                    for="color-yellow-1"
                    class="card__color card__color--yellow"
                    >yellow</label
                  >
                  <input
                    type="radio"
                    id="color-blue-1"
                    class="card__color-input card__color-input--blue visually-hidden"
                    name="color"
                    value="blue"
                  />
                  <label
                    for="color-blue-1"
                    class="card__color card__color--blue"
                    >blue</label
                  >
                  <input
                    type="radio"
                    id="color-green-1"
                    class="card__color-input card__color-input--green visually-hidden"
                    name="color"
                    value="green"
                  />
                  <label
                    for="color-green-1"
                    class="card__color card__color--green"
                    >green</label
                  >
                  <input
                    type="radio"
                    id="color-pink-1"
                    class="card__color-input card__color-input--pink visually-hidden"
                    name="color"
                    value="pink"
                  />
                  <label
                    for="color-pink-1"
                    class="card__color card__color--pink"
                    >pink</label
                  >
                </div>
              </div>
            </div>

            <div class="card__status-btns">
              <button class="card__save" type="submit">save</button>
              <button class="card__delete" type="button">delete</button>
            </div>
          </div>
        </form>
      </article>
    `;
  };

  const getLoadButton = () => {
    return `
      <button class="load-more" type="button">load more</button>
    `;
  };

  const renderComponent = (container, component) => {
    container.insertAdjacentHTML(`beforeend`, component);
  };

  renderComponent(menuContainer, menuWrapper);
  renderComponent(mainContainer, getSearchMarkup());
  renderComponent(mainContainer, filterWrapper);
  renderComponent(mainContainer, getEditForm());

  for (let i = 0; i < 3; i++) {
    renderComponent(mainContainer, getTaskCard(taskCard));
  }
  renderComponent(mainContainer, getLoadButton());
})();
