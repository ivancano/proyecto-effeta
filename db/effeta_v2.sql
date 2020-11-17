-- MySQL dump 10.13  Distrib 8.0.22, for macos10.15 (x86_64)
--
-- Host: localhost    Database: effeta
-- ------------------------------------------------------
-- Server version	8.0.22

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
-- Table structure for table `adonis_schema`
--

DROP TABLE IF EXISTS `adonis_schema`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `adonis_schema` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `batch` int DEFAULT NULL,
  `migration_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `adonis_schema`
--

LOCK TABLES `adonis_schema` WRITE;
/*!40000 ALTER TABLE `adonis_schema` DISABLE KEYS */;
INSERT INTO `adonis_schema` VALUES (1,'1503248427885_user',1,'2020-11-14 14:08:47'),(2,'1503248427886_token',1,'2020-11-14 14:08:47'),(3,'1605362496904_create_permissions_table',1,'2020-11-14 14:08:47'),(4,'1605362496908_create_roles_table',1,'2020-11-14 14:08:47'),(5,'1605362496909_create_permission_role_table',1,'2020-11-14 14:08:47'),(6,'1605362496910_create_permission_user_table',1,'2020-11-14 14:08:47'),(7,'1605362496911_create_role_user_table',1,'2020-11-14 14:08:47'),(8,'1605363057251_contributors_schema',2,'2020-11-14 14:18:49'),(9,'1605363178526_payments_schema',3,'2020-11-14 14:20:45'),(10,'1605363401077_contributions_schema',3,'2020-11-14 14:20:45'),(11,'1605363446269_bank_accounts_schema',3,'2020-11-14 14:20:45');
/*!40000 ALTER TABLE `adonis_schema` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bank_accounts`
--

DROP TABLE IF EXISTS `bank_accounts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bank_accounts` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `contributor_id` int unsigned DEFAULT NULL,
  `cbu` varchar(255) NOT NULL,
  `account_holder` varchar(255) NOT NULL,
  `bank_name` varchar(255) NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `bank_accounts_contributor_id_index` (`contributor_id`),
  CONSTRAINT `bank_accounts_contributor_id_foreign` FOREIGN KEY (`contributor_id`) REFERENCES `contributors` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bank_accounts`
--

LOCK TABLES `bank_accounts` WRITE;
/*!40000 ALTER TABLE `bank_accounts` DISABLE KEYS */;
/*!40000 ALTER TABLE `bank_accounts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contributions`
--

DROP TABLE IF EXISTS `contributions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `contributions` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `contributor_id` int unsigned DEFAULT NULL,
  `payment_id` int unsigned DEFAULT NULL,
  `detail` varchar(255) DEFAULT NULL,
  `type` int NOT NULL,
  `due_date` date NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `contributions_contributor_id_index` (`contributor_id`),
  KEY `contributions_payment_id_index` (`payment_id`),
  CONSTRAINT `contributions_contributor_id_foreign` FOREIGN KEY (`contributor_id`) REFERENCES `contributors` (`id`) ON DELETE CASCADE,
  CONSTRAINT `contributions_payment_id_foreign` FOREIGN KEY (`payment_id`) REFERENCES `payments` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contributions`
--

LOCK TABLES `contributions` WRITE;
/*!40000 ALTER TABLE `contributions` DISABLE KEYS */;
/*!40000 ALTER TABLE `contributions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contributors`
--

DROP TABLE IF EXISTS `contributors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `contributors` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int unsigned DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `lastname` varchar(255) NOT NULL,
  `dni` varchar(255) NOT NULL,
  `type` int NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `contributors_user_id_index` (`user_id`),
  CONSTRAINT `contributors_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=46 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contributors`
--

LOCK TABLES `contributors` WRITE;
/*!40000 ALTER TABLE `contributors` DISABLE KEYS */;
INSERT INTO `contributors` VALUES (1,2,'Elsie','Ceder','00000',1,'2020-11-16 21:53:20','2020-11-16 21:53:20'),(2,3,'Ruth','Adams','00001',1,'2020-11-16 21:53:20','2020-11-16 21:53:20'),(3,4,'Curtis','Klein','00002',1,'2020-11-16 21:53:20','2020-11-16 21:53:20'),(4,5,'Cordelia','Pasquini','00003',1,'2020-11-16 21:53:20','2020-11-16 21:53:20'),(5,6,'Evelyn','Santoni','00004',1,'2020-11-16 21:53:20','2020-11-16 21:53:20'),(6,7,'Allen','Parsons','00005',1,'2020-11-16 21:53:20','2020-11-16 21:53:20'),(7,8,'Chester','Iandelli','00006',1,'2020-11-16 21:53:21','2020-11-16 21:53:21'),(8,9,'Luis','Forti','00007',1,'2020-11-16 21:53:21','2020-11-16 21:53:21'),(9,10,'Rodney','Wilkinson','00008',1,'2020-11-16 21:53:21','2020-11-16 21:53:21'),(10,11,'Lawrence','Rossetti','00009',1,'2020-11-16 21:53:21','2020-11-16 21:53:21'),(31,32,'Cecelia','Flowers','00000',2,'2020-11-16 21:55:17','2020-11-16 21:55:17'),(32,33,'Louisa','Cerbai','00001',2,'2020-11-16 21:55:17','2020-11-16 21:55:17'),(33,34,'Victoria','Pesci','00002',2,'2020-11-16 21:55:17','2020-11-16 21:55:17'),(34,35,'Ian','Gil','00003',2,'2020-11-16 21:55:17','2020-11-16 21:55:17'),(35,36,'Lura','Cresti','00004',2,'2020-11-16 21:55:18','2020-11-16 21:55:18'),(36,37,'Amy','Livi','00005',2,'2020-11-16 21:55:18','2020-11-16 21:55:18'),(37,38,'Christian','van den Bosch','00006',2,'2020-11-16 21:55:18','2020-11-16 21:55:18'),(38,39,'Teresa','Payet','00007',2,'2020-11-16 21:55:18','2020-11-16 21:55:18'),(39,40,'Julia','Dumitru','00008',2,'2020-11-16 21:55:18','2020-11-16 21:55:18'),(40,41,'Isaac','Morandini','00009',2,'2020-11-16 21:55:18','2020-11-16 21:55:18'),(41,42,'Johanna','Horton','00000',3,'2020-11-16 21:55:42','2020-11-16 21:55:42'),(42,43,'Inez','van Veen','00001',3,'2020-11-16 21:55:42','2020-11-16 21:55:42'),(43,44,'Leona','Bruce','00002',3,'2020-11-16 21:55:42','2020-11-16 21:55:42'),(44,45,'Allen','Sims','00003',3,'2020-11-16 21:55:42','2020-11-16 21:55:42'),(45,46,'Christopher','François','00004',3,'2020-11-16 21:55:43','2020-11-16 21:55:43');
/*!40000 ALTER TABLE `contributors` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payments`
--

DROP TABLE IF EXISTS `payments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `payments` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `source` varchar(255) NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payments`
--

LOCK TABLES `payments` WRITE;
/*!40000 ALTER TABLE `payments` DISABLE KEYS */;
/*!40000 ALTER TABLE `payments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `permission_role`
--

DROP TABLE IF EXISTS `permission_role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `permission_role` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `permission_id` int unsigned DEFAULT NULL,
  `role_id` int unsigned DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `permission_role_permission_id_index` (`permission_id`),
  KEY `permission_role_role_id_index` (`role_id`),
  CONSTRAINT `permission_role_permission_id_foreign` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE,
  CONSTRAINT `permission_role_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `permission_role`
--

LOCK TABLES `permission_role` WRITE;
/*!40000 ALTER TABLE `permission_role` DISABLE KEYS */;
/*!40000 ALTER TABLE `permission_role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `permission_user`
--

DROP TABLE IF EXISTS `permission_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `permission_user` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `permission_id` int unsigned DEFAULT NULL,
  `user_id` int unsigned DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `permission_user_permission_id_index` (`permission_id`),
  KEY `permission_user_user_id_index` (`user_id`),
  CONSTRAINT `permission_user_permission_id_foreign` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE,
  CONSTRAINT `permission_user_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `permission_user`
--

LOCK TABLES `permission_user` WRITE;
/*!40000 ALTER TABLE `permission_user` DISABLE KEYS */;
/*!40000 ALTER TABLE `permission_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `permissions`
--

DROP TABLE IF EXISTS `permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `permissions` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `slug` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `permissions_slug_unique` (`slug`),
  UNIQUE KEY `permissions_name_unique` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `permissions`
--

LOCK TABLES `permissions` WRITE;
/*!40000 ALTER TABLE `permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role_user`
--

DROP TABLE IF EXISTS `role_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `role_user` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `role_id` int unsigned DEFAULT NULL,
  `user_id` int unsigned DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `role_user_role_id_index` (`role_id`),
  KEY `role_user_user_id_index` (`user_id`),
  CONSTRAINT `role_user_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE,
  CONSTRAINT `role_user_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role_user`
--

LOCK TABLES `role_user` WRITE;
/*!40000 ALTER TABLE `role_user` DISABLE KEYS */;
INSERT INTO `role_user` VALUES (1,1,1,NULL,NULL);
/*!40000 ALTER TABLE `role_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `slug` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `roles_slug_unique` (`slug`),
  UNIQUE KEY `roles_name_unique` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'administrativo','Administrativo','','2020-11-14 12:27:48','2020-11-14 12:27:48'),(2,'aportante','Aportante','','2020-11-14 12:27:48','2020-11-14 12:27:48');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tokens`
--

DROP TABLE IF EXISTS `tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tokens` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int unsigned DEFAULT NULL,
  `token` varchar(255) NOT NULL,
  `type` varchar(80) NOT NULL,
  `is_revoked` tinyint(1) DEFAULT '0',
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `tokens_token_unique` (`token`),
  KEY `tokens_user_id_foreign` (`user_id`),
  KEY `tokens_token_index` (`token`),
  CONSTRAINT `tokens_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tokens`
--

LOCK TABLES `tokens` WRITE;
/*!40000 ALTER TABLE `tokens` DISABLE KEYS */;
INSERT INTO `tokens` VALUES (1,1,'55a80b645212f974d630490f371ed698YyrhQKaSaJHh6YVR6X32v1FQwmbHA15GGZFtL5RKE2Q=','email',0,'2020-11-14 12:40:23','2020-11-14 12:40:23');
/*!40000 ALTER TABLE `tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `email` varchar(254) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `account_status` varchar(250) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_username_unique` (`username`),
  UNIQUE KEY `users_email_unique` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'administrativo1','administrativo1@effeta.com','$2a$10$i3P/LQHdl4qv6ND/Mep3qOncfuuDlTC5tkVirMpySpOWmnrv.TRMS','2020-11-14 12:40:23','2020-11-14 12:40:23','pending'),(2,'culoup@mejelfe.mh','culoup@mejelfe.mh','$2a$10$4MI9NRhSuOo0SWEaPebzeOWsDZuAFWLYixJgGDHgRqFcT3V.bcQoy','2020-11-16 21:53:20','2020-11-16 21:53:20','pending'),(3,'refitek@hesfed.aw','refitek@hesfed.aw','$2a$10$J4A2jEky2tY6.5byV9P9oO8OrqYFC0bS8AhnEFcKckBXF4n5q/Mbu','2020-11-16 21:53:20','2020-11-16 21:53:20','pending'),(4,'ricjifum@ujenohdo.tm','ricjifum@ujenohdo.tm','$2a$10$NXXNmR8BBV0BpVl4OHvlL.q9MiXnXA5PLRr7owIc5yKwpgEBUctWm','2020-11-16 21:53:20','2020-11-16 21:53:20','pending'),(5,'tazozru@uti.cx','tazozru@uti.cx','$2a$10$uwQzvrULBgsFXbslqczhvudmQJqTAD/HR08Zyi5i7fRtouGwZpOwS','2020-11-16 21:53:20','2020-11-16 21:53:20','pending'),(6,'joruhup@fuvaod.vn','joruhup@fuvaod.vn','$2a$10$7IjtqA6vklQZeTP5TQ1mtu/MHj29HiIeAHYMCMYC6HXDSJHlp4uiC','2020-11-16 21:53:20','2020-11-16 21:53:20','pending'),(7,'kacvunos@jaboner.tz','kacvunos@jaboner.tz','$2a$10$pXicCjwjYahsc0CG/dWwnuqLl4p/C48S0h8MXuXM11yI13W.u1CO2','2020-11-16 21:53:20','2020-11-16 21:53:20','pending'),(8,'vewvakvip@ced.dm','vewvakvip@ced.dm','$2a$10$UFPxPsq/1EB8cbXO59ZYfuRWsLc9AvE9M1qOWLiP5.KNnt5ShLo2S','2020-11-16 21:53:21','2020-11-16 21:53:21','pending'),(9,'parviwho@ja.il','parviwho@ja.il','$2a$10$Y2Ox84am3.l2rxFcJgerd.4M1YwjUhye1aDDj2ASUyHzzzcMXXrhm','2020-11-16 21:53:21','2020-11-16 21:53:21','pending'),(10,'je@pevsav.gi','je@pevsav.gi','$2a$10$IJBCQg1qPBCaDhbqqeASvejBR/kHlDnHIzeu6pCttI/ppF7udExCW','2020-11-16 21:53:21','2020-11-16 21:53:21','pending'),(11,'ar@culistap.pr','ar@culistap.pr','$2a$10$FvkC4N1CnV14NByK7TH4W.4qnE1XDhfuh6zs/PktZSfOJLTdn2yMa','2020-11-16 21:53:21','2020-11-16 21:53:21','pending'),(32,'iro@luera.tm','iro@luera.tm','$2a$10$EDt2HKkIZs3aB5ehtTgCEu0xoFw5awFxYBeFsQsS3r7r/1exmNrfi','2020-11-16 21:55:17','2020-11-16 21:55:17','pending'),(33,'peurce@dug.gb','peurce@dug.gb','$2a$10$4WNkp9quppSghaiazJPb5ekbJN1oOvHsx3fyowdQXl.ZlJyeUuZYm','2020-11-16 21:55:17','2020-11-16 21:55:17','pending'),(34,'nekhibzes@hamcek.bn','nekhibzes@hamcek.bn','$2a$10$prkAiRoTzarOAiUkloGJp.LEx6rWPNuAqN7tEz.1e4w6UeS3IejEy','2020-11-16 21:55:17','2020-11-16 21:55:17','pending'),(35,'uv@ep.hn','uv@ep.hn','$2a$10$NMZD9fZOkGimhO/lNpgcl.UgZ6Vsx3bLU8tYmFWsIrzi6a/1I5Ayq','2020-11-16 21:55:17','2020-11-16 21:55:17','pending'),(36,'hiwacver@leta.cr','hiwacver@leta.cr','$2a$10$yizBoyEYeZcVwuHf1Uco...vJZcjvk0mSHOM5YJXCaJuvnUSjTZr.','2020-11-16 21:55:18','2020-11-16 21:55:18','pending'),(37,'bibeno@oha.uk','bibeno@oha.uk','$2a$10$UfX6JmFTErYk5Dk6D/1Vqee0ClgQl4LNwzCLIXeePlwdGNKMjCfnu','2020-11-16 21:55:18','2020-11-16 21:55:18','pending'),(38,'ked@ga.lt','ked@ga.lt','$2a$10$Sf1m/HBeinh8u9l3g3Oy6eZGI.Q4wQ8WnEgzfle07/7l/CvOyEbP6','2020-11-16 21:55:18','2020-11-16 21:55:18','pending'),(39,'josu@obil.pf','josu@obil.pf','$2a$10$0aSiLp4zYXmNbcnaOpUuVOUfXYZvh.gLH7dkKoT0jfeiWdH/ljS2W','2020-11-16 21:55:18','2020-11-16 21:55:18','pending'),(40,'ambes@sag.al','ambes@sag.al','$2a$10$1rU6ou4xmSU1jyK4JD6VAOzEmiqYajivVqZ5emFhpmxM7/06xryOW','2020-11-16 21:55:18','2020-11-16 21:55:18','pending'),(41,'vofgip@is.ht','vofgip@is.ht','$2a$10$PZyY2GuQ16PK/CwtoURTD.IVV6ZvskVETrhjzpAQc5iijo0VG/TFm','2020-11-16 21:55:18','2020-11-16 21:55:18','pending'),(42,'alukohava@sif.ss','alukohava@sif.ss','$2a$10$Rb52Jbh0NJNzVDAYMENqOe65xF5j4MDwduTq1AiTkTsidubALwtrO','2020-11-16 21:55:42','2020-11-16 21:55:42','pending'),(43,'kalomwi@si.se','kalomwi@si.se','$2a$10$4K2WJ3xXytsO6xAc/szIee/n89jnkoXsXU74E8NocSoKQgHe26a9m','2020-11-16 21:55:42','2020-11-16 21:55:42','pending'),(44,'kuhno@vedo.ck','kuhno@vedo.ck','$2a$10$e6WdblgZijqZ1oKHgqjnseUjWcRCBZUEKBbi30HCp2FL9XnisEJJO','2020-11-16 21:55:42','2020-11-16 21:55:42','pending'),(45,'ziwirvo@uze.pf','ziwirvo@uze.pf','$2a$10$bVFE/4W0yCLlTH55XFXv1.n8QqTLzz2NVZXBI8UyI0.c5a38RCiVS','2020-11-16 21:55:42','2020-11-16 21:55:42','pending'),(46,'lic@etopip.kz','lic@etopip.kz','$2a$10$s0txb1.K6hnOMHblqLeJEeSFUFhJxuLoABC.1BSJAqkC/1GnNqvxe','2020-11-16 21:55:43','2020-11-16 21:55:43','pending');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-11-16 22:08:38
