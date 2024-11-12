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
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrl: './recipe-detail.component.css',
})
export class RecipeDetailComponent implements OnChanges, OnInit {
  @Input() id!: string;

  private recipeService = inject(RecipeService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

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

  onEditRecipe() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }

  onDeleteRecipe(): void {
    this.recipeService.deleteRecipe(+this.id);
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
