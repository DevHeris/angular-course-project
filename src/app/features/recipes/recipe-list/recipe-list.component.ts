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

  private recipeService = inject(RecipeService);

  ngOnInit(): void {
    this.recipes = this.recipeService.getRecipes();
  }
}
