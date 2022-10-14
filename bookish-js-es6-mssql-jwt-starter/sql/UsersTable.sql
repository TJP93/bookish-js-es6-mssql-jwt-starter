
USE bookish
GO

CREATE TABLE users (
	username nvarchar(20) NOT NULL PRIMARY KEY,
	displayname nvarchar(200) NOT NULL,
	password nvarchar(100) NOT NULL
)

GO

