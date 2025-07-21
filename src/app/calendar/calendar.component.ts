import { Component, OnInit } from '@angular/core';
import {
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  startOfWeek,
  endOfWeek,
  eachHourOfInterval,
  format,
  addDays,
  addHours
} from 'date-fns';

@Component({
  standalone: true,
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css',
  imports: []
})
export class CalendarComponent implements OnInit {
  currentDate: Date = new Date();
  viewMode: 'month' | 'week' | 'day' = 'month';
  daysInMonth: Date[] = [];
  weekDays: Date[] = [];
  hoursInDay: Date[] = [];

  ngOnInit(): void {
    this.generateMonthDays();
  }

  setView(mode: 'month' | 'week' | 'day', date?: Date): void {
    this.viewMode = mode;
    if (date) this.currentDate = date;

    if (mode === 'month') this.generateMonthDays();
    if (mode === 'week') this.generateWeekDays();
    if (mode === 'day') this.generateDayHours();
  }

  prev(): void {
    if (this.viewMode === 'month') {
      this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() - 1, 1);
      this.generateMonthDays();
    } else if (this.viewMode === 'week') {
      this.currentDate = addDays(this.currentDate, -7);
      this.generateWeekDays();
    } else if (this.viewMode === 'day') {
      this.currentDate = addDays(this.currentDate, -1);
      this.generateDayHours();
    }
  }

  next(): void {
    if (this.viewMode === 'month') {
      this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 1);
      this.generateMonthDays();
    } else if (this.viewMode === 'week') {
      this.currentDate = addDays(this.currentDate, 7);
      this.generateWeekDays();
    } else if (this.viewMode === 'day') {
      this.currentDate = addDays(this.currentDate, 1);
      this.generateDayHours();
    }
  }

  generateMonthDays(): void {
    const start = startOfMonth(this.currentDate);
    const end = endOfMonth(this.currentDate);
    this.daysInMonth = eachDayOfInterval({ start, end });
  }

  generateWeekDays(): void {
    const start = startOfWeek(this.currentDate, { weekStartsOn: 1 });
    const end = endOfWeek(this.currentDate, { weekStartsOn: 1 });
    this.weekDays = eachDayOfInterval({ start, end });
  }

  generateDayHours(): void {
    const start = new Date(this.currentDate.setHours(0, 0, 0, 0));
    const end = new Date(this.currentDate.setHours(23, 59, 59, 999));
    this.hoursInDay = eachHourOfInterval({ start, end });
  }

  formatDate(date: Date, fmt: string): string {
    return format(date, fmt);
  }
}