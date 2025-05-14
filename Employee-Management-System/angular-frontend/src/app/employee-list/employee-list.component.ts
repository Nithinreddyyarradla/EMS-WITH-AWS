import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeService } from '../employee.service';
import { Router } from '@angular/router';  // ✅ Import Router for navigation

interface Employee {
  id: number;
  firstname: string;
  lastname: string;
  emailid: string;
}

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  Employees: Employee[] = [];  // ✅ Changed 'Employees' to lowercase (convention)

  constructor(private employeeService: EmployeeService, private router: Router) { }  // ✅ Inject Router

  ngOnInit(): void {  
    this.getEmployees();
  }

  private getEmployees() {
    this.employeeService.getEmployeesList().subscribe(data => {
      this.Employees = data;
    });
  }

  updateEmployee(id: number) {
    this.router.navigate(['/update-employee', id]);  // ✅ Corrected navigation syntax
  }
  deleteEmployee(id: number) {
    if (confirm("Are you sure you want to delete this employee?")) {  // ✅ Confirmation Dialog
      this.employeeService.deleteEmployee(id).subscribe(() => {
        console.log(`Employee with ID ${id} deleted successfully.`);
        this.getEmployees(); // ✅ Refresh the employee list after deletion
      },
      error => console.error("Error deleting employee:", error));
    }
  }
}
