CREATE DATABASE  IF NOT EXISTS `hms_proj` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `hms_proj`;
-- MySQL dump 10.13  Distrib 8.0.18, for Win64 (x86_64)
--
-- Host: localhost    Database: hms_proj
-- ------------------------------------------------------
-- Server version	8.0.18

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `bills`
--

DROP TABLE IF EXISTS `bills`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bills` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'null',
  `booking_id` int(11) NOT NULL COMMENT 'null',
  `payment_id` int(11) DEFAULT NULL COMMENT 'null',
  `amount` double NOT NULL COMMENT 'null',
  `pdf_download_url` varchar(45) NOT NULL COMMENT 'null',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `booking_id` (`booking_id`),
  KEY `bills_ibfk_2` (`payment_id`),
  CONSTRAINT `bills_ibfk_1` FOREIGN KEY (`booking_id`) REFERENCES `bookings` (`id`),
  CONSTRAINT `bills_ibfk_2` FOREIGN KEY (`payment_id`) REFERENCES `paymentinfo` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bills`
--

LOCK TABLES `bills` WRITE;
/*!40000 ALTER TABLE `bills` DISABLE KEYS */;
/*!40000 ALTER TABLE `bills` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bookings`
--

DROP TABLE IF EXISTS `bookings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bookings` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'null',
  `cust_id` varchar(45) NOT NULL COMMENT 'null',
  `room_id` int(11) NOT NULL COMMENT 'null',
  `startdate` datetime NOT NULL COMMENT 'null',
  `enddate` datetime NOT NULL COMMENT 'null',
  `coupon_id` int(11) DEFAULT NULL COMMENT 'null',
  `numguests` int(2) NOT NULL COMMENT 'null',
  `paid` int(1) NOT NULL DEFAULT '0' COMMENT 'null',
  `cancelled` int(1) NOT NULL DEFAULT '0' COMMENT 'null',
  `checkedin` int(1) NOT NULL DEFAULT '0' COMMENT 'null',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `checkedout` int(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `cust_id` (`cust_id`),
  KEY `room_id` (`room_id`),
  KEY `coupon_id` (`coupon_id`),
  CONSTRAINT `bookings_ibfk_1` FOREIGN KEY (`cust_id`) REFERENCES `customer` (`id`),
  CONSTRAINT `bookings_ibfk_2` FOREIGN KEY (`room_id`) REFERENCES `rooms` (`id`),
  CONSTRAINT `bookings_ibfk_3` FOREIGN KEY (`coupon_id`) REFERENCES `coupons` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bookings`
--

LOCK TABLES `bookings` WRITE;
/*!40000 ALTER TABLE `bookings` DISABLE KEYS */;
INSERT INTO `bookings` VALUES (1,'A1',1,'2020-06-21 00:00:00','2020-06-24 00:00:00',NULL,3,0,0,0,'2020-05-29 02:57:43','2020-05-29 02:57:43',0),(2,'A2',1,'2020-06-26 00:00:00','2020-06-29 00:00:00',NULL,3,0,0,1,'2020-05-29 03:04:37','2020-05-29 15:05:17',0),(4,'A2',8,'2020-06-26 00:00:00','2020-06-29 00:00:00',NULL,3,1,1,1,'2020-05-29 04:39:51','2020-05-29 16:28:02',1);
/*!40000 ALTER TABLE `bookings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `coupons`
--

DROP TABLE IF EXISTS `coupons`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `coupons` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'null',
  `discountpercent` int(2) NOT NULL COMMENT 'null',
  `validity` date NOT NULL COMMENT 'null',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `coupons`
--

LOCK TABLES `coupons` WRITE;
/*!40000 ALTER TABLE `coupons` DISABLE KEYS */;
/*!40000 ALTER TABLE `coupons` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customer`
--

DROP TABLE IF EXISTS `customer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customer` (
  `id` varchar(45) NOT NULL COMMENT 'null',
  `phone_ext` int(4) NOT NULL COMMENT 'null',
  `phone` varchar(15) NOT NULL COMMENT 'null',
  `fname` varchar(45) NOT NULL COMMENT 'null',
  `lname` varchar(45) DEFAULT NULL COMMENT 'null',
  `email` varchar(45) NOT NULL COMMENT 'null',
  `idproof` varchar(45) NOT NULL COMMENT 'null',
  `address` varchar(90) NOT NULL COMMENT 'null',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customer`
--

LOCK TABLES `customer` WRITE;
/*!40000 ALTER TABLE `customer` DISABLE KEYS */;
INSERT INTO `customer` VALUES ('A1',91,'7007612342','Anmol','Srivastava','anmol150srivastava@gmail.com','aadhaarr88r','asdasdasdasdqeq12312rwef waa23  f aw3','2020-05-29 01:49:14','2020-05-29 01:53:56'),('A123',91,'70612342','Anmol','Srivastava','anmol150srivastava@gmail.com','aadhaarrr','asdasdasdasdqeq12312rwef waa23  f aw3','2020-05-29 01:45:17','2020-05-29 01:45:17'),('A2',91,'7007612342','Anmol','Srivastava','anmol150srivastava@gmail.com','aadhaarr88r','asdasdasdasdqeq12312rwef waa23  f aw3','2020-05-29 03:04:01','2020-05-29 03:04:01'),('Aa1',91,'7007612342','Anmol','Srivastava','anmol150srivastava@gmail.com','aadhaarr88r','asdasdasdasdqeq12312rwef waa23  f aw3','2020-05-29 03:03:56','2020-05-29 03:03:56');
/*!40000 ALTER TABLE `customer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employee`
--

DROP TABLE IF EXISTS `employee`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employee` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'null',
  `fname` varchar(45) NOT NULL COMMENT 'null',
  `lname` varchar(45) NOT NULL COMMENT 'null',
  `designation` varchar(45) NOT NULL COMMENT 'null',
  `service_id` int(11) NOT NULL COMMENT 'null',
  `phone` varchar(15) NOT NULL COMMENT 'null',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `service_id` (`service_id`),
  CONSTRAINT `employee_ibfk_1` FOREIGN KEY (`service_id`) REFERENCES `servicetype` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employee`
--

LOCK TABLES `employee` WRITE;
/*!40000 ALTER TABLE `employee` DISABLE KEYS */;
INSERT INTO `employee` VALUES (1,'asd','asd','asd',2,'1231231321','2020-05-29 13:30:16','2020-05-29 13:35:41'),(2,'asd','asd','asd',1,'1231231321','2020-05-29 13:30:23','2020-05-29 13:30:23'),(3,'asd','asd','asd',1,'1231231321','2020-05-29 13:30:24','2020-05-29 13:30:24');
/*!40000 ALTER TABLE `employee` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `guest`
--

DROP TABLE IF EXISTS `guest`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `guest` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'null',
  `booking_id` int(11) NOT NULL COMMENT 'null',
  `name` varchar(45) NOT NULL COMMENT 'null',
  `idproof` varchar(45) NOT NULL COMMENT 'null',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `booking_id` (`booking_id`),
  CONSTRAINT `guest_ibfk_1` FOREIGN KEY (`booking_id`) REFERENCES `bookings` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `guest`
--

LOCK TABLES `guest` WRITE;
/*!40000 ALTER TABLE `guest` DISABLE KEYS */;
/*!40000 ALTER TABLE `guest` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `paymentinfo`
--

DROP TABLE IF EXISTS `paymentinfo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `paymentinfo` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'null',
  `cust_id` varchar(45) NOT NULL COMMENT 'null',
  `number` int(16) NOT NULL COMMENT 'null',
  `expiry` date NOT NULL COMMENT 'null',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `cust_id` (`cust_id`),
  CONSTRAINT `paymentinfo_ibfk_1` FOREIGN KEY (`cust_id`) REFERENCES `customer` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `paymentinfo`
--

LOCK TABLES `paymentinfo` WRITE;
/*!40000 ALTER TABLE `paymentinfo` DISABLE KEYS */;
INSERT INTO `paymentinfo` VALUES (2,'A1',23424234,'1970-01-01','2020-05-29 02:05:47','2020-05-29 02:05:47'),(3,'A1',234124234,'1970-01-01','2020-05-29 02:05:57','2020-05-29 02:05:57'),(4,'A1',234124234,'1970-01-01','2020-05-29 02:05:59','2020-05-29 02:05:59'),(5,'A1',234124234,'1970-01-01','2020-05-29 02:06:00','2020-05-29 02:06:00'),(6,'A1',234124234,'1970-01-01','2020-05-29 02:06:00','2020-05-29 02:06:00');
/*!40000 ALTER TABLE `paymentinfo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roomportalusers`
--

DROP TABLE IF EXISTS `roomportalusers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roomportalusers` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'null',
  `booking_id` int(11) NOT NULL COMMENT 'null',
  `username` varchar(45) NOT NULL COMMENT 'null',
  `password` varchar(45) NOT NULL COMMENT 'null',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `booking_id` (`booking_id`),
  CONSTRAINT `roomportalusers_ibfk_1` FOREIGN KEY (`booking_id`) REFERENCES `bookings` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roomportalusers`
--

LOCK TABLES `roomportalusers` WRITE;
/*!40000 ALTER TABLE `roomportalusers` DISABLE KEYS */;
/*!40000 ALTER TABLE `roomportalusers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rooms`
--

DROP TABLE IF EXISTS `rooms`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rooms` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'null',
  `type_id` int(11) NOT NULL COMMENT 'null',
  `name` varchar(45) NOT NULL COMMENT 'null',
  `booked` int(1) NOT NULL DEFAULT '0' COMMENT 'null',
  `disabled` int(1) NOT NULL DEFAULT '0' COMMENT 'null',
  `floor` int(3) NOT NULL COMMENT 'null',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `type_id` (`type_id`),
  CONSTRAINT `rooms_ibfk_1` FOREIGN KEY (`type_id`) REFERENCES `roomtypes` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rooms`
--

LOCK TABLES `rooms` WRITE;
/*!40000 ALTER TABLE `rooms` DISABLE KEYS */;
INSERT INTO `rooms` VALUES (1,2,'B2',1,0,2,'2020-05-29 00:35:33','2020-05-29 03:04:37'),(2,1,'B2',0,0,2,'2020-05-29 00:39:03','2020-05-29 00:39:03'),(4,3,'D15',0,0,3,'2020-05-29 03:49:07','2020-05-29 03:49:07'),(5,4,'D45',0,0,4,'2020-05-29 03:49:20','2020-05-29 03:49:20'),(6,4,'D4',0,0,1,'2020-05-29 03:49:26','2020-05-29 03:49:26'),(7,3,'D8',0,0,1,'2020-05-29 03:49:32','2020-05-29 03:49:32'),(8,2,'D8',1,0,1,'2020-05-29 04:39:33','2020-05-29 04:39:51'),(9,2,'D8',0,0,1,'2020-05-29 04:39:37','2020-05-29 04:39:37');
/*!40000 ALTER TABLE `rooms` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roomtypes`
--

DROP TABLE IF EXISTS `roomtypes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roomtypes` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'null',
  `name` varchar(45) NOT NULL COMMENT 'null',
  `price` int(6) NOT NULL COMMENT 'null',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roomtypes`
--

LOCK TABLES `roomtypes` WRITE;
/*!40000 ALTER TABLE `roomtypes` DISABLE KEYS */;
INSERT INTO `roomtypes` VALUES (1,'y0o',1233,'2020-05-29 00:32:22','2020-05-29 00:32:22'),(2,'y0osdf',1233,'2020-05-29 01:35:14','2020-05-29 01:35:24'),(3,'y0os1df',1233,'2020-05-29 03:48:33','2020-05-29 03:48:33'),(4,'4d1',1233,'2020-05-29 03:48:36','2020-05-29 03:48:36');
/*!40000 ALTER TABLE `roomtypes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `servicerequests`
--

DROP TABLE IF EXISTS `servicerequests`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `servicerequests` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'null',
  `booking_id` int(11) NOT NULL COMMENT 'null',
  `servicetype_id` int(11) NOT NULL COMMENT 'null',
  `assigned_to` int(11) DEFAULT NULL COMMENT 'null',
  `description` varchar(400) NOT NULL COMMENT 'null',
  `preferredtime` datetime NOT NULL COMMENT 'null',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `booking_id` (`booking_id`),
  KEY `servicetype_id` (`servicetype_id`),
  KEY `assigned_to` (`assigned_to`),
  CONSTRAINT `servicerequests_ibfk_1` FOREIGN KEY (`booking_id`) REFERENCES `bookings` (`id`),
  CONSTRAINT `servicerequests_ibfk_2` FOREIGN KEY (`servicetype_id`) REFERENCES `servicetype` (`id`),
  CONSTRAINT `servicerequests_ibfk_3` FOREIGN KEY (`assigned_to`) REFERENCES `employee` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `servicerequests`
--

LOCK TABLES `servicerequests` WRITE;
/*!40000 ALTER TABLE `servicerequests` DISABLE KEYS */;
INSERT INTO `servicerequests` VALUES (2,4,1,NULL,'YOOO','2020-05-23 00:00:00','2020-05-29 13:13:01','2020-05-29 13:13:01');
/*!40000 ALTER TABLE `servicerequests` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `servicetype`
--

DROP TABLE IF EXISTS `servicetype`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `servicetype` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'null',
  `name` varchar(45) NOT NULL COMMENT 'null',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `servicetype`
--

LOCK TABLES `servicetype` WRITE;
/*!40000 ALTER TABLE `servicetype` DISABLE KEYS */;
INSERT INTO `servicetype` VALUES (1,'YO','2020-05-29 13:12:46','2020-05-29 13:12:46'),(2,'YO','2020-05-29 13:12:54','2020-05-29 13:12:54');
/*!40000 ALTER TABLE `servicetype` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-05-29 22:03:02
