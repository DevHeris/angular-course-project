import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { DataStorageService } from '../features/shared/data-storage.service';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit, OnDestroy {
  private storageService = inject(DataStorageService);
  private authService = inject(AuthService);
  private userSubscription: Subscription;

  isAuthenticated: boolean;

  ngOnInit(): void {
    this.userSubscription = this.authService.user$.subscribe({
      next: (user) => {
        this.isAuthenticated = !!user;
      },
    });
  }

  onSaveData(): void {
    this.storageService.storeRecipes();
  }

  onFetchData(): void {
    this.storageService.fetchRecipes().subscribe();
  }

  onLogout(): void {
    this.authService.logout();
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }
}
