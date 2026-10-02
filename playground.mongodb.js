
use('sigmaDatabase');

// Insert a few documents into the sales collection.
db.getCollection('sales').insertMany([
 [
  {
    "name": "Rahul Sharma",
    "email": "rahul.sharma@example.com",
    "age": 24,
    "city": "Pune",
    "role": "Software Developer",
    "skills": ["JavaScript", "React", "Node.js"],
    "salary": 65000,
    "isActive": true
  },
  {
    "name": "Priya Patel",
    "email": "priya.patel@example.com",
    "age": 22,
    "city": "Mumbai",
    "role": "Frontend Developer",
    "skills": ["HTML", "CSS", "React"],
    "salary": 55000,
    "isActive": true
  },
  {
    "name": "Amit Verma",
    "email": "amit.verma@example.com",
    "age": 27,
    "city": "Delhi",
    "role": "Backend Developer",
    "skills": ["Python", "Django", "MongoDB"],
    "salary": 75000,
    "isActive": true
  },
  {
    "name": "Sneha Kulkarni",
    "email": "sneha.kulkarni@example.com",
    "age": 23,
    "city": "Pune",
    "role": "Full Stack Developer",
    "skills": ["Python", "React", "PostgreSQL"],
    "salary": 70000,
    "isActive": true
  },
  {
    "name": "Rohan Mehta",
    "email": "rohan.mehta@example.com",
    "age": 29,
    "city": "Bangalore",
    "role": "DevOps Engineer",
    "skills": ["Docker", "AWS", "Kubernetes"],
    "salary": 95000,
    "isActive": true
  },
  {
    "name": "Anjali Singh",
    "email": "anjali.singh@example.com",
    "age": 25,
    "city": "Hyderabad",
    "role": "Data Analyst",
    "skills": ["Python", "SQL", "Power BI"],
    "salary": 60000,
    "isActive": true
  },
  {
    "name": "Vikram Joshi",
    "email": "vikram.joshi@example.com",
    "age": 31,
    "city": "Chennai",
    "role": "Software Engineer",
    "skills": ["Java", "Spring Boot", "MySQL"],
    "salary": 85000,
    "isActive": false
  },
  {
    "name": "Neha Deshmukh",
    "email": "neha.deshmukh@example.com",
    "age": 21,
    "city": "Nashik",
    "role": "Intern",
    "skills": ["HTML", "CSS", "JavaScript"],
    "salary": 20000,
    "isActive": true
  },
  {
    "name": "Karan Malhotra",
    "email": "karan.malhotra@example.com",
    "age": 28,
    "city": "Noida",
    "role": "Machine Learning Engineer",
    "skills": ["Python", "TensorFlow", "Machine Learning"],
    "salary": 90000,
    "isActive": true
  },
  {
    "name": "Pooja Nair",
    "email": "pooja.nair@example.com",
    "age": 26,
    "city": "Kochi",
    "role": "UI/UX Designer",
    "skills": ["Figma", "Adobe XD", "UI Design"],
    "salary": 58000,
    "isActive": false
  }]
]);


// Print a message to the output window.
console.log(`done inserting documents.`);


