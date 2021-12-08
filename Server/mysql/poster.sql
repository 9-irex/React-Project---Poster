-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 08, 2021 at 10:06 AM
-- Server version: 10.1.38-MariaDB
-- PHP Version: 7.3.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `poster`
--

DELIMITER $$
--
-- Procedures
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `pr_auth` (IN `Name` VARCHAR(100), IN `Email` VARCHAR(100), IN `Phone` VARCHAR(100), IN `Gender` VARCHAR(100), IN `Birthday` DATE, IN `Username` VARCHAR(100), IN `Passcode` VARCHAR(100), IN `_Status` VARCHAR(100), IN `Avatar` VARCHAR(100), IN `_Date` DATE, IN `Type` VARCHAR(100))  NO SQL
IF(Type = "Register") THEN
IF NOT EXISTS(SELECT * FROM authentication WHERE authentication.Email = Email OR authentication.Phone = Phone OR authentication.Username = Username) THEN
INSERT INTO authentication(authentication.Name, authentication.Email,authentication.Phone,authentication.Gender,authentication.Birthday,authentication.Username,authentication.Password,authentication.Status,authentication.Avatar,authentication.Date) VALUES (Name,Email,Phone,Gender,Birthday,Username,Passcode,_Status,Avatar,_Date);
SELECT "User Registered" AS Message;
ELSEIF EXISTS(SELECT * FROM authentication WHERE authentication.Email = Email AND authentication.Phone = Phone AND authentication.Username = Username) THEN
SELECT "The Email , The Username And The Phone Has Been Used Before! Use Other Credentials" AS Message;
ELSEIF EXISTS(SELECT * FROM authentication WHERE authentication.Email = Email AND authentication.Phone = Phone) THEN
SELECT "The Email And The Phone Has Been Used Before! Use Other Credentials" AS Message;
ELSEIF EXISTS(SELECT * FROM authentication WHERE authentication.Email = Email AND authentication.Username = Username) THEN
SELECT "The Email And The Username Has Been Used Before! Use Other Credentials" AS Message;
ELSEIF EXISTS(SELECT * FROM authentication WHERE authentication.Phone = Phone AND authentication.Username = Username) THEN
SELECT "The Phone And The Username Has Been Used Before! Use Other Credentials" AS Message;
ELSEIF EXISTS(SELECT * FROM authentication WHERE authentication.Email = Email) THEN
SELECT "This Email Is Been Used" AS Message;
ELSEIF EXISTS(SELECT * FROM authentication WHERE authentication.Phone = Phone) THEN
SELECT "This Phone Is Been Used" AS Message;
ELSEIF EXISTS(SELECT * FROM authentication WHERE authentication.Username = Username) THEN
SELECT "This Username Has Been Taken" AS Message;
END IF;
ELSEIF(Type = "Login") THEN
IF EXISTS(SELECT * FROM authentication WHERE authentication.Username = Username) THEN
SELECT * FROM authentication WHERE authentication.Username = Username;
-- After Successful Login -> Status Will be set to active again
UPDATE authentication SET authentication.Status = 'Active' WHERE authentication.Username = Username;
ELSE
SELECT "User Doesn't Exists" AS Message;
END IF;
ELSEIF(Type = "Logout") THEN
UPDATE authentication SET authentication.Status = 'Unactive' WHERE authentication.Username = Username;
ELSE
SELECT "This Type Is Not Valid" AS Message;
END IF$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `pr_post` (IN `PostID` INT(11), IN `Title` VARCHAR(100), IN `Image` VARCHAR(100), IN `UserID` INT(11), IN `__Date` DATE, IN `Type` VARCHAR(100))  NO SQL
IF(Type = "New_Post") THEN
INSERT INTO posts(posts.Title,posts.Image,posts.UserID,posts.Date) VALUES(Title,Image,UserID,__Date);
SELECT "The post has been published" AS Message;
ELSEIF(Type = "Get_Post") THEN
SELECT authentication.Name , authentication.Avatar , posts.Date , posts.Title , posts.Image , posts.PostID FROM posts
JOIN authentication ON authentication.UserID = posts.UserID;
END IF$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `authentication`
--

CREATE TABLE `authentication` (
  `UserID` int(11) NOT NULL,
  `Name` varchar(100) NOT NULL,
  `Email` varchar(100) NOT NULL,
  `Phone` varchar(100) NOT NULL,
  `Gender` varchar(100) NOT NULL,
  `Birthday` date NOT NULL,
  `Username` varchar(100) NOT NULL,
  `Password` varchar(100) NOT NULL,
  `Status` varchar(100) NOT NULL,
  `Avatar` varchar(100) NOT NULL,
  `Last` date NOT NULL,
  `Date` date NOT NULL,
  `Verified` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `authentication`
--

INSERT INTO `authentication` (`UserID`, `Name`, `Email`, `Phone`, `Gender`, `Birthday`, `Username`, `Password`, `Status`, `Avatar`, `Last`, `Date`, `Verified`) VALUES
(1, 'Mustafa Ahmed Ducaale', 'ducaale@gmail.com', '612334455', 'Male', '2000-01-01', 'Ducaale', '$2b$10$LOx/GPtC4n/Ep0klU0HcNOrzeEPSyOEpm4G3TDKNE7mkfzhhXFpNq', 'Active', 'M', '0000-00-00', '2021-11-29', 0),
(2, 'Mohamed Moalim Ali Abdi', 'mohaali@gmail.com', '252-617-340-096', 'Male', '1998-09-12', 'Maheesh', '$2b$10$UE3wLXeLg057sz5.uvb/Qec4pAnqyvZ1b1hL1KCuKiZh5WDzXc9N2', 'Active', 'M', '0000-00-00', '2021-11-28', 0),
(3, 'Layla Hassan Ismail', 'layal@gmail.com', '616663080', 'Female', '2021-12-02', 'Layla', '$2b$10$E2/q24Foy2/pk23iCjFnsOKHrc6Eq0cwjbM.Ty84nT/zh6jAcDwxq', 'Active', 'L', '0000-00-00', '2021-12-02', 0),
(4, 'Abdimaalik Abdullahi Abdirahman', 'aftaacade8@gmail.com', '615632003', 'Male', '1998-01-01', 'Aftaab', '$2b$10$fuKxa44.tws/pOZKpZo4penAiqLEYlUO2v6v4yM6gcIm8lswU03g2', 'Active', 'A', '0000-00-00', '2021-12-07', 0);

-- --------------------------------------------------------

--
-- Table structure for table `posts`
--

CREATE TABLE `posts` (
  `PostID` int(11) NOT NULL,
  `Title` varchar(100) NOT NULL,
  `Image` varchar(100) NOT NULL,
  `UserID` int(11) NOT NULL,
  `Date` date NOT NULL,
  `Modified` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `posts`
--

INSERT INTO `posts` (`PostID`, `Title`, `Image`, `UserID`, `Date`, `Modified`) VALUES
(1, 'First Post', 'Love.jpg', 1, '2012-09-12', '2021-12-08 07:44:06');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `authentication`
--
ALTER TABLE `authentication`
  ADD PRIMARY KEY (`UserID`);

--
-- Indexes for table `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`PostID`),
  ADD KEY `UserID_Post` (`UserID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `authentication`
--
ALTER TABLE `authentication`
  MODIFY `UserID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `posts`
--
ALTER TABLE `posts`
  MODIFY `PostID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `posts`
--
ALTER TABLE `posts`
  ADD CONSTRAINT `UserID_Post` FOREIGN KEY (`UserID`) REFERENCES `authentication` (`UserID`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
