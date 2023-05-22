using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ReactPeopleCars.Data;

namespace ReactPeopleCars.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PeopleController : ControllerBase
    {
        private string _connectionString;

        public PeopleController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("ConStr");
        }

        [HttpGet]
        [Route("getall")]
        public List<Person> GetAll()
        {
            var repo = new PersonCarsRepository(_connectionString);
            return repo.GetAll();
        }
        [HttpPost]
        [Route("addperson")]
        public void AddPerson(Person person)
        {
            var repo = new PersonCarsRepository(_connectionString);
            repo.AddPerson(person);
        }
        [HttpPost]
        [Route("addcar")]
        public void AddCar(Car car)
        {
            var repo = new PersonCarsRepository(_connectionString);
            repo.AddCar(car);
        }
        [HttpGet]
        [Route("getcarsforpersonid")]
        public List<Car> GetCarsForPersonId(int id)
        {
            var repo = new PersonCarsRepository(_connectionString);
            return repo.GetCarsForPersonId(id);
        }
        [HttpPost]
        [Route("deletecarsforpersonid")]
        public void DeleteCarsForPersonId(int id)
        {
            var repo = new PersonCarsRepository(_connectionString);
            repo.DeleteCarsForPersonId(id);
        }


        [HttpGet]
        [Route("getbyid")]
        public Person GetById(int id)
        {
            var repo = new PersonCarsRepository(_connectionString);
            return repo.GetPersonById(id);
        }

    }
}
