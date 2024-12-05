import { NgClass, NgFor } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-view-seat',
  standalone: true,
  imports: [NgFor, NgClass],
  templateUrl: './view-seat.component.html',
  styleUrl: './view-seat.component.css'
})
export class ViewSeatComponent {
  seats: { id: number; booked: boolean }[] = Array(80)
    .fill(null)
    .map((_, index) => ({ id: index + 1, booked: false }));

  constructor() {
    // Load seat data from localStorage if available
    const savedSeats = localStorage.getItem('seats');
    if (savedSeats) {
      this.seats = JSON.parse(savedSeats);
    }
  }
}
