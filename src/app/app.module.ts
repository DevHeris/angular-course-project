import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ShoppingListComponent } from './features/shopping-list/shopping-list.component';

import { RecipeListComponent } from './features/recipes/recipe-list/recipe-list.component';
import { RecipeItemComponent } from './features/recipes/recipe-list/recipe-item/recipe-item.component';
import { RecipeDetailComponent } from './features/recipes/recipe-detail/recipe-detail.component';
import { RecipesComponent } from './features/recipes/recipes.component';
import { ShoppingListEditComponent } from './features/shopping-list/shopping-list-edit/shopping-list-edit.component';
import { BasicHighlightDirective } from './directives/basic-highlight.directive';
import { TextClearDirective } from './directives/text-clear.directive';
import { UnlessDirective } from './directives/unless.directive';
import { DropdownDirective } from './directives/dropdown.directive';
import { AppRoutingModule } from './app-routing.module';
import { BetterHighlightDirective } from './directives/better-highlight.directive';
import { RecipeStartComponent } from './recipes/recipe-start/recipe-start.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { provideHttpClient, withFetch } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ShoppingListComponent,
    ShoppingListEditComponent,
    RecipeListComponent,
    RecipeItemComponent,
    RecipeDetailComponent,
    RecipesComponent,
    BasicHighlightDirective,
    BetterHighlightDirective,
    TextClearDirective,
    UnlessDirective,
    DropdownDirective,
    RecipeStartComponent,
    RecipeEditComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, ReactiveFormsModule],
  providers: [provideHttpClient(withFetch())],
  bootstrap: [AppComponent],
})
export class AppModule {}
