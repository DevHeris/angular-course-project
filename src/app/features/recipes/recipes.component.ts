import { Component, inject } from '@angular/core';
import { Recipe } from './recipe.model';
import { RecipeService } from './recipe.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrl: './recipes.component.css',
})
export class RecipesComponent {
  selectedRecipe: Recipe;

  private recipeService = inject(RecipeService);

  constructor() {
    this.recipeService.newRecipeSelected.subscribe({
      next: (recipe: Recipe) => (this.selectedRecipe = recipe),
    });
  }
}
