using Microsoft.EntityFrameworkCore;

namespace ReactPeopleCars.Data
{
    public class PersonCarsRepository
    {
        private readonly string _connectionString;

        public PersonCarsRepository(string connectionString)
        {
            _connectionString = connectionString;
        }

        public List<Person> GetAll()
        {
            using var context = new PeopleDataContext(_connectionString);
            return context.People.Include(p => p.Cars).ToList();
        }
        public void AddPerson(Person person)
        {
            using var context = new PeopleDataContext(_connectionString);
            context.Add(person);
            context.SaveChanges();
        }
        public void AddCar(Car car)
        {
            using var context = new PeopleDataContext(_connectionString);
            context.Add(car);
            context.SaveChanges();
        }
        public List<Car> GetCarsForPersonId(int id)
        {
            using var context = new PeopleDataContext(_connectionString);
            return context.Cars.Where(c => c.PersonId == id).ToList();
        }
        public void DeleteCarsForPersonId(int id)
        {
            using var context = new PeopleDataContext(_connectionString);
            context.Database.ExecuteSqlInterpolated($"delete cars from People Where PersonId = {id}");
        }
        public Person GetPersonById(int id)
        {
            using var context = new PeopleDataContext(_connectionString);
            return context.People.FirstOrDefault(p => p.Id == id);
        }
    }
}

