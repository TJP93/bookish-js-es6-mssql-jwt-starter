

-- delete bookish database, dropping connections first

 use master 
 go

 alter database bookish set single_user with rollback immediate
 GO

drop database bookish
GO

