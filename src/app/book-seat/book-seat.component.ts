import { Component, NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-book-seat',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './book-seat.component.html',
  styleUrl: './book-seat.component.css'
})
export class BookSeatComponent {
  seats: { id: number; booked: boolean }[] = Array(80)
    .fill(null)
    .map((_, index) => ({ id: index + 1, booked: false }));

  seatsToBook = 1;
  userDetails = {
    name: '',
    email: '',
    phone: '',
    preferredRow: '',
  };

  constructor(private router: Router) {
    // Load seat data from localStorage if available
    const savedSeats = localStorage.getItem('seats');
    if (savedSeats) {
      this.seats = JSON.parse(savedSeats);
    }
  }

  bookSeats() {
    if (!this.validateForm()) {
      alert('Please fill all required fields.');
      return;
    }

    let bookedCount = 0;
    const preferredRow = parseInt(this.userDetails.preferredRow, 10);

    for (let i = 0; i < this.seats.length; i++) {
      const seat = this.seats[i];
      const rowIndex = Math.floor(i / 7);

      if (!seat.booked && (isNaN(preferredRow) || rowIndex === preferredRow - 1)) {
        seat.booked = true;
        bookedCount++;
      }

      if (bookedCount >= this.seatsToBook) break;
    }

    if (bookedCount < this.seatsToBook) {
      alert('Not enough seats available in your preferred row or nearby.');
      return;
    }

    // Save updated seat data
    localStorage.setItem('seats', JSON.stringify(this.seats));

    // Reset form and redirect
    alert(`Seats booked successfully!`);
    this.router.navigate(['/view-sheet']);
  }

  validateForm(): boolean {
    const { name, email, phone } = this.userDetails;
    return !!(name && email && phone);
  }
}
