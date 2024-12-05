import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-view-seat',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './view-seat.component.html',
  styleUrl: './view-seat.component.css'
})
export class ViewSeatComponent {
  seats: {
    id: number;
    booked: boolean;
    details?: { name: string; email: string; phone: string };
  }[] = Array(80)
    .fill(null)
    .map((_, index) => ({ id: index + 1, booked: false, details: undefined }));

  selectedSeat: any = null;

  constructor() {
    const savedSeats = localStorage.getItem('seats');
    if (savedSeats) {
      this.seats = JSON.parse(savedSeats);
    }
  }

  selectSeat(seat: any) {
    this.selectedSeat = seat.booked ? seat : null;
  }

  cancelBooking(seatId: number) {
    const seat = this.seats.find((s) => s.id === seatId);
    if (seat) {
      seat.booked = false;
      seat.details = undefined;
      localStorage.setItem('seats', JSON.stringify(this.seats));
      this.selectedSeat = null; // Reset selected seat
      alert(`Booking for Seat ${seatId} has been cancelled.`);
    }
  }
}
