import { Component, EventEmitter, Output, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { EmployeesData } from '../employee-details/employee.data';
import { Employee } from '../employee-details/employee.model';
import { NgForm } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-employee-insert',
  templateUrl: './employee-insert.component.html',
  styleUrls: ['./employee-insert.component.scss']
})
export class EmployeeInsertComponent{
  @Output() employeeAdded = new EventEmitter<Employee>();
  @Input() employee: Employee | null = null;
  employeeForm: FormGroup;
  roles = ['Developer', 'Designer', 'Manager', 'Admin', 'User']; // role list

  constructor(private fb: FormBuilder) { //validation of form
    this.employeeForm = this.fb.group({
      id: [''],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      role: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void { 
    if (changes['employee'] && this.employee) {
      this.employeeForm.patchValue(this.employee);
    } else {
      this.employeeForm.reset();
    }
  }

  generateUniqueId(): number { // here i have generated unique id for each employee 
    const employees = JSON.parse(localStorage.getItem('employees') || '[]');
    return employees.length > 0 ? Math.max(...employees.map((e: Employee) => e.id)) + 1 : 1;
  }

  addEmployee() { 
    if (this.employeeForm.valid) {
      const newEmployee: Employee = {
        ...this.employeeForm.value,
        id: this.employeeForm.value.id || this.generateUniqueId(),
      };
      this.employeeAdded.emit(newEmployee);
      this.employeeForm.reset();
    } else {
      alert('Please Fill Form Properly');
    }
  }
}
