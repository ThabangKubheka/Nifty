INSERT INTO Users (UserID, Username, Password, UserType, Email, ProfilePicture)
VALUES 
    (1, 'contractor1', 'password1', 'Contractor', 'contractor1@example.com', '/profile_pics/contractor1.jpg'),
    (2, 'contractor2', 'password2', 'Contractor', 'contractor2@example.com', '/profile_pics/contractor2.jpg'),
    (3, 'customer1', 'password3', 'Customer', 'customer1@example.com', '/profile_pics/customer1.jpg'),
    (4, 'customer2', 'password4', 'Customer', 'customer2@example.com', '/profile_pics/customer2.jpg');

INSERT INTO Contractors (ContractorID, UserID, CompanyName, ServicesOffered, Ratings)
VALUES 
    (1, 1, 'ABC Contractors', 'Plumbing, Electrical, Painting', 4.5),
    (2, 2, 'XYZ Builders', 'Carpentry, Roofing, Flooring', 4.0);

INSERT INTO Customers (CustomerID, UserID, CustomerName)
VALUES 
    (1, 3, 'John Doe'),
    (2, 4, 'Jane Smith');

INSERT INTO Jobs (JobID, ContractorID, JobTitle, JobDescription, JobPictures, JobPostedDate, JobStatus)
VALUES 
    (1, 1, 'Fix leaky faucet', 'Need to fix a leaky faucet in the kitchen.', '/job_pics/leaky_faucet.jpg', '2024-02-15', 'open'),
    (2, 2, 'Install new roof', 'Need to install a new roof for the house.', '/job_pics/new_roof.jpg', '2024-02-16', 'open');

INSERT INTO Appointments (AppointmentID, CustomerID, ContractorID, AppointmentType, AppointmentDate, AppointmentTime, AppointmentLocation, AppointmentCost, ProblemDescription, AppointmentStatus)
VALUES 
    (1, 1, 1, 'Fix', '2024-02-20', '10:00:00', '123 Main St, City', 200.00, 'Leaky faucet in the kitchen', 'confirmed'),
    (2, 2, 2, 'Inspection', '2024-02-25', '14:00:00', '456 Elm St, Town', 0.00, 'Evaluate roof for replacement', 'pending');

INSERT INTO Reviews (ReviewID, CustomerID, ContractorID, Rating, ReviewText, ReviewDate)
VALUES 
    (1, 1, 1, 4.0, 'Did a great job fixing the faucet.', '2024-02-21'),
    (2, 2, 2, 3.5, 'Roof inspection was thorough.', '2024-02-26');
```
