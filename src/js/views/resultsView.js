import preView from './preView.js';
import views from './View.js';

class ResultView extends views {
  _parentElement = document.querySelector('.results');
  _errorMessage = 'No recipes found for your query! Please try again :)';
  _generateMarkup() {
    return this._data.map(recipe => preView.render(recipe, false)).join('');
  }
}
export default new ResultView();
