import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-book-seat',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './book-seat.component.html',
  styleUrls: ['./book-seat.component.css'],
})
export class BookSeatComponent {
  seats: {
    id: number;
    booked: boolean;
    details?: { name: string; email: string; phone: string };
  }[] = Array(80)
    .fill(null)
    .map((_, index) => ({ id: index + 1, booked: false, details: undefined }));

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
    // Validate the form input
    if (!this.validateForm()) {
      alert('Please fill all required fields.');
      return;
    }

    if (this.seatsToBook < 1 || this.seatsToBook > 7) {
      alert('You can book a minimum of 1 seat and a maximum of 7 seats.');
      return;
    }

    // Find seats based on preferred row or nearby
    const availableSeats = this.findSeats();
    if (availableSeats.length < this.seatsToBook) {
      alert('Not enough seats available to fulfill your request.');
      return;
    }

    // Book the seats and assign details
    for (let i = 0; i < this.seatsToBook; i++) {
      const seat = availableSeats[i];
      seat.booked = true;
      seat.details = {
        name: this.userDetails.name,
        email: this.userDetails.email,
        phone: this.userDetails.phone,
      };
    }

    // Save updated seat data
    localStorage.setItem('seats', JSON.stringify(this.seats));

    // Reset form and redirect
    alert(`Successfully booked ${this.seatsToBook} seat(s).`);
    this.router.navigate(['/view-sheet']);
  }

  findSeats(): any[] {
    const preferredRow = parseInt(this.userDetails.preferredRow, 10);

    // If preferred row is valid, prioritize seats in the row
    if (!isNaN(preferredRow)) {
      const rowSeats = this.getSeatsInRow(preferredRow);
      if (rowSeats.length >= this.seatsToBook) {
        return rowSeats;
      }
    }

    // Fallback: Search for nearest available seats across the coach
    return this.getAllAvailableSeats();
  }

  getSeatsInRow(row: number): any[] {
    const start = (row - 1) * 7; // Start index of the row
    const end = row === 12 ? start + 3 : start + 7; // Handle last row
    return this.seats.slice(start, end).filter((seat) => !seat.booked);
  }

  getAllAvailableSeats(): any[] {
    return this.seats.filter((seat) => !seat.booked);
  }

  validateForm(): boolean {
    const { name, email, phone } = this.userDetails;
    return !!(name && email && phone);
  }
}
