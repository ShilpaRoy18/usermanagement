import { Injectable } from '@angular/core';
import { Employee } from './employee-details/employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private storageKey = 'employees';

  constructor() {
    if (!localStorage.getItem(this.storageKey)) {
      const initialData: Employee[] = [
        { id: 1, name: 'Ravi Kumar', email: 'ravi.kumar@example.com', role: 'Developer' },
        { id: 2, name: 'Anita Sharma', email: 'anita.sharma@example.com', role: 'Designer' },
        { id: 3, name: 'Vikram Patel', email: 'vikram.patel@example.com', role: 'Manager' },
        { id: 4, name: 'Pooja Reddy', email: 'pooja.reddy@example.com', role: 'Developer' },
        { id: 5, name: 'Rajesh Singh', email: 'rajesh.singh@example.com', role: 'Designer' },
        { id: 6, name: 'Nisha Gupta', email: 'nisha.gupta@example.com', role: 'Manager' },
        { id: 7, name: 'Suresh Mehta', email: 'suresh.mehta@example.com', role: 'Developer' },
        { id: 8, name: 'Kiran Joshi', email: 'kiran.joshi@example.com', role: 'Designer' },
        { id: 9, name: 'Manish Pandey', email: 'manish.pandey@example.com', role: 'Manager' },
        { id: 10, name: 'Priya Agarwal', email: 'priya.agarwal@example.com', role: 'Developer' }
      ];
      localStorage.setItem(this.storageKey, JSON.stringify(initialData));
    }
   }


  getEmployees(): Employee[] {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : [];
  }

  addEmployee(employee: Employee): void {
    const employees = this.getEmployees();
    employees.push(employee);
    localStorage.setItem(this.storageKey, JSON.stringify(employees));
  }
}
