import { Component, inject } from '@angular/core';
import { DataStorageService } from '../features/shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  private storageService = inject(DataStorageService);

  onSaveData(): void {
    this.storageService.storeRecipes();
  }
  onFetchData(): void {
    this.storageService.fetchRecipes().subscribe();
  }
}
