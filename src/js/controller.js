import 'core-js/stable';
import 'regenerator-runtime/runtime';
import * as model from '../js/model.js';
import { MODEL_CLOSE_SEC } from './config.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultView from './views/resultsView.js';
import pagenationView from './views/pagenationView.js';
import bookmarkView from './views/bookmarkView.js';

import addRecipeView from './views/addRecipeView.js'; // Ensure this path is correct

///////////////////////////////////////

const controllRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    recipeView.renderSpinner();
    // Loading recipe from API
    await model.loadRecipe(id);
    // Rendering Recipe
    const { recipe } = model.state;
    recipeView.render(recipe);
  } catch (error) {
    recipeView.errorRender();
  }
};

const controlSeachResult = async function () {
  try {
    resultView.renderSpinner();
    // Get search query
    const query = searchView.getQuery();
    if (!query) return;
    // Load search results
    await model.loadSearchResults(query);
    // Render results
    resultView.render(model.getSearchResultPage());
    // Render pagination buttons
    pagenationView.render(model.state.search);
  } catch (error) {
    console.log(error);
  }
};

const controlPagination = function (goToPage) {
  // Render new results
  resultView.render(model.getSearchResultPage(goToPage));
  // Render pagination buttons
  pagenationView.render(model.state.search);
};

const controlServings = function (updateTo) {
  model.updateServings(updateTo);
  recipeView.render(model.state.recipe);
};

const controllAddBookMark = function () {
  if (!model.state.recipe.bookmarked) model.addBookMarks(model.state.recipe);
  else {
    model.deleteBookMark(model.state.recipe.id);
  }
  recipeView.render(model.state.recipe);
  bookmarkView.render(model.state.bookmarks);
};

const controllAddRecipe = async function (newRecipe) {
  try {
    await model.uploadRecipe(newRecipe);
    console.log(model.state.recipe);
    //Render Recipe
    recipeView.render(model.state.recipe);
    //Render Bookmarks
    bookmarkView.render(model.state.bookmarks);

    window.history.pushState(null, '', `#${model.state.recipe.id}`);
    //Sucess Message
    addRecipeView.Message();
    //close Form
    setTimeout(function () {
      addRecipeView.toggleWindow();
    }, MODEL_CLOSE_SEC * 1000);
  } catch (error) {
    addRecipeView.errorRender(error.message);
  }
};

const init = function () {
  recipeView.addHandlerRender(controllRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookMark(controllAddBookMark);
  searchView.addHandlerSearch(controlSeachResult);
  pagenationView.addHandlerClick(controlPagination);
  addRecipeView.addHandlerUpload(controllAddRecipe);
};
init();
