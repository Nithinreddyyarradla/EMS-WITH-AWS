package net.javaguides.springboot.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import net.javaguides.springboot.model.Employee;
import net.javaguides.springboot.repository.EmployeeRepository;
import net.javaguides.springboot.exception.ResourceNotFoundException;

@CrossOrigin(origins = "http://employee-service-alb-1725556285.us-east-2.elb.amazonaws.com")
@RestController
@RequestMapping("/api/v1/employees")
public class EmployeeController {
    
    private static final Logger logger = LoggerFactory.getLogger(EmployeeController.class);
    private final EmployeeRepository employeeRepository;

    @Autowired
    public EmployeeController(EmployeeRepository employeeRepository) {
        this.employeeRepository = employeeRepository;
    }

    @GetMapping
    public ResponseEntity<List<Employee>> getAllEmployees() {
        logger.info("Fetching all employees...");
        List<Employee> employees = employeeRepository.findAll();
        return ResponseEntity.ok(employees);
    }

    @PostMapping
    public ResponseEntity<Employee> createEmployee(@RequestBody Employee employee) {
        logger.info("Creating new employee: {}", employee);
        Employee savedEmployee = employeeRepository.save(employee);
        return ResponseEntity.ok(savedEmployee);
    }

    @GetMapping("/{id}")  //
    public ResponseEntity<Employee> getEmployeeById(@PathVariable Long id) {
        Employee employee = employeeRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Employee does not exist with id: " + id));
        return ResponseEntity.ok(employee);
    }
    @PutMapping("/{id}")
    public ResponseEntity<Employee> updateEmployee(@PathVariable Long id, @RequestBody Employee employeeDetails){
        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Employee does not exist with id: " + id));
        employee.setFirstname(employeeDetails.getFirstname());
        employee.setLastname(employeeDetails.getLastname());
        employee.setEmailid(employeeDetails.getEmailid());
       
        Employee updatedEmployee = employeeRepository .save(employee);   
        return ResponseEntity.ok(updatedEmployee);    	
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, Boolean>> deleteEmployee(@PathVariable Long id){
    	Employee employee = employeeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Employee does not exist with id: " + id));
    	employeeRepository.delete(employee);
    	Map<String, Boolean> response = new HashMap<>();
    	response.put("deleted",Boolean.TRUE);
    	return ResponseEntity.ok(response);
    	
    }
}
