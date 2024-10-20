import {
  Component,
  inject,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrl: './recipe-edit.component.css',
})
export class RecipeEditComponent implements OnInit {
  private route = inject(ActivatedRoute);
  id: string;
  editMode: boolean;

  ngOnInit(): void {
    this.route.params.subscribe({
      next: (params) => {
        this.id = params.id;
        this.editMode = this.id === undefined ? false : true;
        console.log(this.editMode);
      },
    });
  }
}
