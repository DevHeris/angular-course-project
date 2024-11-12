import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RecipeService } from '../../features/recipes/recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrl: './recipe-edit.component.css',
})
export class RecipeEditComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private recipeService = inject(RecipeService);
  recipeForm: FormGroup;
  id: string;
  editMode: boolean;

  ngOnInit(): void {
    this.route.params.subscribe({
      next: (params) => {
        this.id = params.id;
        this.editMode = this.id === undefined ? false : true;
        this.initForm();
      },
    });
  }

  private initForm() {
    let recipe = this.editMode ? this.recipeService.getRecipe(+this.id) : null;

    const name = recipe ? recipe.name : null;
    const recipeImageUrl = recipe ? recipe.imagePath : null;
    const recipeDescription = recipe ? recipe.description : null;

    this.recipeForm = new FormGroup({
      recipeName: new FormControl(name),
      recipeImageUrl: new FormControl(recipeImageUrl),
      recipeDescription: new FormControl(recipeDescription),
    });
  }

  onSubmit(): void {
    console.log(this.recipeForm.value);
  }
}
