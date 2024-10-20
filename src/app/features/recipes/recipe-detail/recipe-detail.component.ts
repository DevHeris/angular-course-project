import {
  Component,
  inject,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';

import { Ingredient } from '../../shared/ingredient.model';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrl: './recipe-detail.component.css',
})
export class RecipeDetailComponent implements OnChanges, OnInit {
  @Input() id!: string;
  private recipeService = inject(RecipeService);
  recipe: Recipe;

  ngOnInit(): void {
    this.recipe = this.recipeService.getRecipe(+this.id);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['id'])
      this.recipe = this.recipeService.getRecipe(+changes['id'].currentValue);
  }

  onToShoppingList(ingredients: Ingredient[]): void {
    this.recipeService.onAddToShoppingList(ingredients);
  }
}
