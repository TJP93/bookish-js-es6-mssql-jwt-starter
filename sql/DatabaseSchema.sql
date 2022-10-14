

USE bookish
GO

CREATE TABLE books (
	id int IDENTITY NOT NULL PRIMARY KEY,
	title nvarchar(MAX) NOT NULL,
	author nvarchar(MAX) NULL,
	isbn nchar(14) NULL) -- ISBNs are 10 or 13 characters, but are sometimes written with a "-" after the first 3 digits so we allow 14 characters
GO

CREATE TABLE copies (
	id int IDENTITY NOT NULL PRIMARY KEY, -- This is used as the barcode, which will be printed and stuck on the book copy
	bookid int,
	borrower nvarchar(MAX) NULL, -- Only set if the book is borrowed
	duedate datetime NULL -- Only set if the book is borrowed
)
GO

ALTER TABLE copies ADD CONSTRAINT fk_copies_book FOREIGN KEY (bookid) REFERENCES Books (id)
GO
