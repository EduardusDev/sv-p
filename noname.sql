-- --------------------------------------------------------
-- Хост:                         127.0.0.1
-- Версия сервера:               10.4.12-MariaDB-log - mariadb.org binary distribution
-- Операционная система:         Win64
-- HeidiSQL Версия:              11.2.0.6213
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

-- Дамп структуры для таблица noname.accounts
CREATE TABLE IF NOT EXISTS `accounts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(35) NOT NULL,
  `email` text NOT NULL,
  `password` varchar(256) NOT NULL,
  `socialclub` varchar(255) NOT NULL,
  `ip` varchar(50) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

-- Экспортируемые данные не выделены.

-- Дамп структуры для таблица noname.bags
CREATE TABLE IF NOT EXISTS `bags` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `items` text NOT NULL DEFAULT '[]',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Экспортируемые данные не выделены.

-- Дамп структуры для таблица noname.characters
CREATE TABLE IF NOT EXISTS `characters` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `socialclub` int(11) DEFAULT NULL,
  `adminlvl` int(10) DEFAULT NULL,
  `xyz` text NOT NULL,
  `firstname` text NOT NULL,
  `lastname` text NOT NULL,
  `lvl` int(11) NOT NULL DEFAULT 0,
  `exp` int(11) NOT NULL DEFAULT 0,
  `health` int(3) DEFAULT NULL,
  `licenses` int(11) DEFAULT NULL,
  `money` int(11) NOT NULL DEFAULT 1000,
  `bank` int(11) DEFAULT NULL,
  `bank_num` int(11) DEFAULT NULL,
  `organization` int(11) DEFAULT NULL,
  `accid` varchar(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;

-- Экспортируемые данные не выделены.

-- Дамп структуры для таблица noname.customization
CREATE TABLE IF NOT EXISTS `customization` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `gender` text NOT NULL,
  `parents` text NOT NULL,
  `features` text NOT NULL,
  `appearance` text NOT NULL,
  `hair` text NOT NULL,
  `clothes` text NOT NULL,
  `accessory` text NOT NULL,
  `tattoos` text NOT NULL,
  `eyebrowc` text NOT NULL,
  `beardc` text NOT NULL,
  `eyec` text NOT NULL,
  `blushc` text NOT NULL,
  `lipstickc` text NOT NULL,
  `chesthairc` text NOT NULL,
  `iscreated` text NOT NULL,
  `personid` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;

-- Экспортируемые данные не выделены.

-- Дамп структуры для таблица noname.inventorys
CREATE TABLE IF NOT EXISTS `inventorys` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `items` text NOT NULL DEFAULT '[]',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Экспортируемые данные не выделены.

-- Дамп структуры для таблица noname.vehicles
CREATE TABLE IF NOT EXISTS `vehicles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `holder` int(11) NOT NULL,
  `model` text NOT NULL,
  `health` int(11) NOT NULL,
  `fuel` int(3) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Экспортируемые данные не выделены.

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
