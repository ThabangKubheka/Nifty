CREATE TABLE Users (
    UserID INT PRIMARY KEY,
    Username NVARCHAR(100),
    Password NVARCHAR(255),
    UserType NVARCHAR(50),
    Email NVARCHAR(100),
    ProfilePicture NVARCHAR(255)
);

CREATE TABLE Contractors (
    ContractorID INT PRIMARY KEY,
    UserID INT,
    CompanyName NVARCHAR(100),
    ServicesOffered TEXT,
    Ratings DECIMAL(5, 2),
    FOREIGN KEY (UserID) REFERENCES Users(UserID)
);

CREATE TABLE Customers (
    CustomerID INT PRIMARY KEY,
    UserID INT,
    CustomerName NVARCHAR(100),
    FOREIGN KEY (UserID) REFERENCES Users(UserID)
);

CREATE TABLE Jobs (
    JobID INT PRIMARY KEY,
    ContractorID INT,
    JobTitle NVARCHAR(100),
    JobDescription TEXT,
    JobPictures TEXT,
    JobPostedDate DATETIME,
    JobStatus NVARCHAR(50),
    FOREIGN KEY (ContractorID) REFERENCES Contractors(ContractorID)
);

CREATE TABLE Appointments (
    AppointmentID INT PRIMARY KEY,
    CustomerID INT,
    ContractorID INT,
    AppointmentType NVARCHAR(100),
    AppointmentDate DATE,
    AppointmentTime TIME,
    AppointmentLocation NVARCHAR(255),
    AppointmentCost DECIMAL(10, 2),
    ProblemDescription TEXT,
    AppointmentStatus NVARCHAR(50),
    FOREIGN KEY (CustomerID) REFERENCES Customers(CustomerID),
    FOREIGN KEY (ContractorID) REFERENCES Contractors(ContractorID)
);

CREATE TABLE Reviews (
    ReviewID INT PRIMARY KEY,
    CustomerID INT,
    ContractorID INT,
    Rating DECIMAL(3, 2),
    ReviewText TEXT,
    ReviewDate DATETIME,
    FOREIGN KEY (CustomerID) REFERENCES Customers(CustomerID),
    FOREIGN KEY (ContractorID) REFERENCES Contractors(ContractorID)
);
