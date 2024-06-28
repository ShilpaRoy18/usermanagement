import { Component, OnInit } from '@angular/core';
import { EmployeesData } from '../employee-details/employee.data';
import { Employee } from '../employee-details/employee.model';
declare var $: any;
@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.scss']
})
export class EmployeeDetailsComponent implements OnInit {
  employees: Employee[] = [];
  displayedColumns: string[] = ['id', 'name', 'email', 'role', 'actions'];
  paginatedEmployees: Employee[] = [];
  filteredEmployees: Employee[] = [];
  pageSize = 10;
  page = 1;
  totalRecords = 0;
  selectedEmployee: Employee | null = null;
  deleteEmployeeId: number | null = null;
  ngOnInit(): void {
    this.updatePaginatedEmployees();
  }

  constructor() {
    this.loadEmployees();
  }

  loadEmployees() {
    const storedEmployees = localStorage.getItem('employees');
    this.employees = storedEmployees ? JSON.parse(storedEmployees) : EmployeesData;
    this.filteredEmployees = [...this.employees]; // Initialize filteredEmployees with all employees
    this.totalRecords = this.employees.length;
    this.updatePaginatedEmployees();
  }

  saveEmployees() {
    localStorage.setItem('employees', JSON.stringify(this.employees));
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();

    if (!filterValue) {
      this.filteredEmployees = [...this.employees]; // Reset to full data if filter is empty
    } else {
      this.filteredEmployees = this.employees.filter((employee: Employee) =>
        employee.name.toLowerCase().includes(filterValue) ||
        employee.email.toLowerCase().includes(filterValue)
      );
    }

    this.totalRecords = this.filteredEmployees.length;
    this.updatePaginatedEmployees();
  }

  updatePaginatedEmployees() {
    const startIndex = (this.page - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedEmployees = this.filteredEmployees.slice(startIndex, endIndex);
  }

  onPageChange(page: number) {
    this.page = page;
    this.updatePaginatedEmployees();
  }

  onEmployeeAdded(newEmployee: Employee) {
    if (this.selectedEmployee) {
      const index = this.employees.findIndex(emp => emp.id === this.selectedEmployee!.id);
      this.employees[index] = newEmployee;
    } else {
      this.employees.push(newEmployee);
    }
    this.saveEmployees();
    this.totalRecords = this.employees.length;
    this.filteredEmployees = [...this.employees]; // Update filteredEmployees after adding or editing
    this.updatePaginatedEmployees();
    this.selectedEmployee = null;
  }

  editEmployee(employee: Employee) {
    this.selectedEmployee = { ...employee };
  }

  setData(id: number) {
    this.deleteEmployeeId = id;
  }

  deleteEmployee() {
    if (this.deleteEmployeeId !== null) {
      this.employees = this.employees.filter(emp => emp.id !== this.deleteEmployeeId);
      this.saveEmployees();
      this.totalRecords = this.employees.length;
      this.filteredEmployees = [...this.employees]; // Update filteredEmployees after deleting
      this.updatePaginatedEmployees();
      $('#deleteModal').modal('hide');
    }
  }

  openAddEmployeeForm() {
    this.selectedEmployee = null;
  }
}
