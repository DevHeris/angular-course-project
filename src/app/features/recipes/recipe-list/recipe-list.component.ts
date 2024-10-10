import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.css',
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[];

  private recipeSevice = inject(RecipeService);

  ngOnInit(): void {
    this.recipes = this.recipeSevice.getRecipes();
  }

  onSelect(recipe: Recipe) {
    this.recipeSevice.selectRecipe(recipe);
  }
}
