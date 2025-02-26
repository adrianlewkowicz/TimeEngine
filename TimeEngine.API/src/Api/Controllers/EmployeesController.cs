using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using System.Collections.Generic;
using System.Data;

namespace TimeEngine.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EmployeesController : ControllerBase
    {
        private readonly string _connectionString = "Server=localhost,1433;Database=TestDatabase;User Id=sa;Password=Password123;TrustServerCertificate=True";

        [HttpGet]
        public IActionResult GetEmployees()
        {
            var employees = new List<Employee>();

            using (var connection = new SqlConnection(_connectionString))
            {
                connection.Open();
                var command = new SqlCommand("SELECT ID, Name, Position FROM Employees", connection);
                using (var reader = command.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        employees.Add(new Employee
                        {
                            ID = reader.GetInt32(0),
                            Name = reader.GetString(1),
                            Position = reader.GetString(2)
                        });
                    }
                }
            }

            return Ok(employees);
        }
    }

    public class Employee
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public string Position { get; set; }
    }
}
