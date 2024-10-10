import { Component, inject, input } from '@angular/core';
import { Recipe } from '../recipe.model';

import { Ingredient } from '../../shared/ingredient.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrl: './recipe-detail.component.css',
})
export class RecipeDetailComponent {
  recipe = input<Recipe>();

  private recipeService = inject(RecipeService);

  onToShoppingList(ingredients: Ingredient[]): void {
    this.recipeService.onAddToShoppingList(ingredients);
  }
}
