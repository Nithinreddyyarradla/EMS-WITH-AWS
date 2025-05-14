import { Routes } from '@angular/router';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { CreateEmployeeComponent } from './create-employee/create-employee.component';
import { Component } from '@angular/core';
import { UpdateEmployeeComponent } from './update-employee/update-employee.component';

export const routes: Routes = [
  {path: "Employee list", component: EmployeeListComponent},
  {path:"Create-employee",component: CreateEmployeeComponent},
  {path: "",redirectTo:"Employee list", pathMatch:"full"},
  {path: "update-employee/:id", component: UpdateEmployeeComponent}
];
