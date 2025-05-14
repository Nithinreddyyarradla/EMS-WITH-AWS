import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import type { Employee } from './employee';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private baseURL = `${environment.apiBaseUrl}/api/v1/employees`;

  constructor(private httpClient: HttpClient) { }

  getEmployeesList(): Observable<Employee[]> {
    return this.httpClient.get<Employee[]>(this.baseURL);
  }

  createEmployee(employee: Employee): Observable<Employee> {
    return this.httpClient.post<Employee>(this.baseURL, employee);
  }

  getEmployeeById(id: number): Observable<Employee> {
    return this.httpClient.get<Employee>(`${this.baseURL}/${id}`);
  }

  updateEmployee(id: number, employee: Employee): Observable<Employee> {
    return this.httpClient.put<Employee>(`${this.baseURL}/${id}`, employee);
  }

  deleteEmployee(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.baseURL}/${id}`);
  }
}
