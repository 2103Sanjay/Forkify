import icons from 'url:../../img/icons.svg';
import View from './View';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline ');
      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });
  }

  _generateMarkup() {
    const curPage = this._data.page;
    const numOfPage = Math.ceil(
      this._data.result.length / this._data.resultsPerPage
    );
    //Page 1 , and there are other pages
    if (curPage === 1 && numOfPage > 1) {
      return `
          <button data-goto = ${
            curPage + 1
          }  class="btn--inline pagination__btn--next">
            <span>Page ${curPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>`;
    }
    //Last page
    if (curPage === numOfPage && numOfPage > 1) {
      return `
      <button data-goto = ${
        curPage - 1
      } class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${curPage - 1}</span>
          </button>`;
    }
    //Other page
    if (curPage < numOfPage) {
      return `
      <button data-goto = ${
        curPage - 1
      } class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${curPage - 1}</span>
          </button>
          <button data-goto = ${
            curPage + 1
          } class="btn--inline pagination__btn--next">
            <span>Page ${curPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>`;
    }
    return '';
  }
}

export default new PaginationView();
