import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import type { Employee } from '../employee';  
import { EmployeeService } from '../employee.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-employee',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent {
  employee: Employee = { id: 0, firstname: '', lastname: '', emailid: '' };  
  successMessage: string = 'Employee created succesfully'; 

  constructor(private employeeService: EmployeeService, private router: Router) {}

  saveEmployee() {
    this.employeeService.createEmployee(this.employee).subscribe(data => {console.log('Employee Created:', data);this.successMessage = "Employee created successfully!";  
    this.goToEmployeeList();
      },
    );
  }

  goToEmployeeList() {
    this.router.navigate(['/Employee list']);
  }

  onSubmit(): void {
    console.log('Employee Form Submitted:', this.employee);
    this.saveEmployee();
  }
}
