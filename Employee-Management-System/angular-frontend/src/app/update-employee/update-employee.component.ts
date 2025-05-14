import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import type { Employee } from '../employee';  
import { EmployeeService } from '../employee.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update-employee',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.css']
})
export class UpdateEmployeeComponent {
  employee: Employee = { id: 0, firstname: '', lastname: '', emailid: '' };  
  successMessage: string = 'Employee updated successfully!'; // ✅ Added Success Message

  constructor(
    private employeeService: EmployeeService, 
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id')); // ✅ Get Employee ID from URL
    this.getEmployee(id);
  }

  getEmployee(id: number) {
    this.employeeService.getEmployeeById(id).subscribe(
      (data) => {
        this.employee = data;
      },
      (error) => console.error('Error fetching employee:', error)
    );
  }

  saveEmployee() { 
    this.employeeService.updateEmployee(this.employee.id, this.employee).subscribe(
      (data) => {
        console.log('Employee Updated:', data);
        this.successMessage = "Employee updated successfully!";  
        this.goToEmployeeList();
      }
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
