import { EventEmitter, Injectable } from '@angular/core';
import { Recipe } from './recipe.model';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  recipes: Recipe[] = [
    new Recipe(
      'A test Recipe',
      'https://img.freepik.com/free-photo/top-view-table-full-delicious-food-composition_23-2149141352.jpg?t=st=1727346062~exp=1727349662~hmac=4eef42dc9a5ff819a6d7858d2d916b20efd9af7d03a64fae65a45fdf66d581b2&w=740',
      'This is simply a test'
    ),
    new Recipe(
      'Another test Recipe',
      'https://img.freepik.com/free-photo/top-view-table-full-delicious-food-composition_23-2149141352.jpg?t=st=1727346062~exp=1727349662~hmac=4eef42dc9a5ff819a6d7858d2d916b20efd9af7d03a64fae65a45fdf66d581b2&w=740',
      'This is a different test'
    ),
  ];

  selectedRecipe: Recipe;
  newRecipeSelected = new EventEmitter<Recipe>();

  getRecipes(): Recipe[] {
    // THE SLICE IS SO THE ACTUAL RECIPE ARRAY ISN'T GIVEN OUT BUT JUST A COPY OF IT
    return this.recipes.slice();
  }

  getSeletedRecipe(): Recipe {
    return this.selectedRecipe;
  }

  selectRecipe(recipe: Recipe) {
    this.newRecipeSelected.emit(recipe);
    this.selectedRecipe = recipe;
  }
}
