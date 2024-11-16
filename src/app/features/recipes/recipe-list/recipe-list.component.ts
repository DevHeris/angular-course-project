import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.css',
})
export class RecipeListComponent implements OnInit,OnDestroy {
  recipes: Recipe[];

  private recipeService = inject(RecipeService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private recipeUpdatedSubscription: Subscription;

  ngOnInit(): void {
   this.recipeUpdatedSubscription= this.recipeService.recipeUpdated.subscribe({
      next: (recipes) => {
        this.recipes = recipes;
      },
    });
  }

  onNewRecipe() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  ngOnDestroy(): void {
   this.recipeUpdatedSubscription.unsubscribe()
  }
}
