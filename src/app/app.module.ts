import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ShoppingListComponent } from './features/shopping/shopping-list/shopping-list.component';
import { ShoppingListEditComponent } from './features/shopping/shopping-list-edit/shopping-list-edit.component';
import { RecipeListComponent } from './features/recipe/recipe-list/recipe-list.component';
import { RecipeItemComponent } from './features/recipe/recipe-item/recipe-item.component';
import { RecipeDetailComponent } from './features/recipe/recipe-detail/recipe-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ShoppingListComponent,
    ShoppingListEditComponent,
    RecipeListComponent,
    RecipeItemComponent,
    RecipeDetailComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
