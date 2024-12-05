import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ViewSeatComponent } from './view-seat/view-seat.component';
import { BookSeatComponent } from './book-seat/book-seat.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'view-seat', component: ViewSeatComponent },
    { path: 'book-seat', component: BookSeatComponent },
];
