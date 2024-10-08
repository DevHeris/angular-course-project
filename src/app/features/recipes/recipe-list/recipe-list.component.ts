import { Component, EventEmitter, Output } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.css',
})
export class RecipeListComponent {
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
  @Output() recipeSelected = new EventEmitter<Recipe>();

  onSelect(recipe: Recipe) {
    this.recipeSelected.emit(recipe);
  }
}
