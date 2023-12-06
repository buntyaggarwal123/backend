# backend
TFG Assignment

Setup tfg_test db with localhost with password:- root and user:- root
create table users with column id,username,email,password and perform register and login

using below sotored procedures:
----------------------------------------------------------------------
CREATE DEFINER=`root`@`localhost` PROCEDURE `user_signUp`(
IN _name VARCHAR(150),
IN _email VARCHAR(150),
IN _password VARCHAR(150)
)
BEGIN
IF NOT EXISTS(SELECT 1 FROM users WHERE email=_email) THEN
INSERT INTO users (username,email,password) VALUE (_name,_email,_password);
SET @userId:= last_insert_id();
SELECT @userId AS userId;
ELSE 
SET @dbError:="ALREADY_EXISTS";
SELECT @dbError AS dbError;
END IF;
END

-----------------------------------------------------------------------

CREATE DEFINER=`root`@`localhost` PROCEDURE `user_signIn`(
IN _email VARCHAR(150)
)
BEGIN
IF EXISTS (SELECT 1 FROM users WHERE email=_email) THEN
SELECT id AS userId,email,password FROM users WHERE email=_email;
ELSE 
SET @dbError:="INVALID_USER";
SELECT @dbError AS dbError;
END IF;
END

--------------------------------------------------------------------------

using mongodb compass with db test_tgf and create colletion game and perform insert, update, get, delete opertions according to requirement as:
1. insert the game data like if i play first game then my userid and my score insert
2. on repeat play same i can update the score of mine.
3. get my game details like my score of a particular game,
4. reset stats of my game.

-----------------------------------------------------------------------------

Setup rabbitMq locally but some issues are not resolved in it.