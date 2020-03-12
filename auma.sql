-- phpMyAdmin SQL Dump
-- version 4.7.9
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: 22-Maio-2019 às 12:25
-- Versão do servidor: 5.7.21
-- PHP Version: 7.1.16

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `auma`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `avenue`
--

DROP TABLE IF EXISTS `avenue`;
CREATE TABLE IF NOT EXISTS `avenue` (
  `id` tinyint(4) NOT NULL AUTO_INCREMENT,
  `description` char(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `avenue`
--

INSERT INTO `avenue` (`id`, `description`) VALUES
(1, 'A'),
(2, 'B'),
(3, 'C');

-- --------------------------------------------------------

--
-- Estrutura da tabela `bag`
--

DROP TABLE IF EXISTS `bag`;
CREATE TABLE IF NOT EXISTS `bag` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `entryDate` datetime NOT NULL,
  `outDate` datetime DEFAULT NULL,
  `idLocation` smallint(6) NOT NULL,
  `idUser` smallint(6) NOT NULL,
  `lot` varchar(35) NOT NULL,
  `weight` smallint(6) NOT NULL,
  `producerName` varchar(65) NOT NULL,
  `producerFarm` varchar(65) NOT NULL,
  `idCity` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `city_bag_fk` (`idCity`),
  KEY `location_bag_fk` (`idLocation`),
  KEY `user_bag_fk` (`idUser`)
) ENGINE=MyISAM AUTO_INCREMENT=106 DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `bag`
--

INSERT INTO `bag` (`id`, `entryDate`, `outDate`, `idLocation`, `idUser`, `lot`, `weight`, `producerName`, `producerFarm`, `idCity`) VALUES
(53, '2019-04-15 17:38:03', NULL, 1, 1, 'MG - 785123B', 1400, 'Ze', 'Fazenda', 2),
(104, '2019-05-18 16:12:05', NULL, 3, 1, '123', 123, '123', '123', 1),
(105, '2019-05-18 16:25:18', NULL, 2, 1, '123', 123, '123', '123', 4),
(30, '2019-04-15 19:10:36', '2019-04-30 11:35:18', 1, 1, 'MG - 78548A', 1400, 'Ze', 'Fazenda', 2);

-- --------------------------------------------------------

--
-- Estrutura da tabela `bagtypecoffe`
--

DROP TABLE IF EXISTS `bagtypecoffe`;
CREATE TABLE IF NOT EXISTS `bagtypecoffe` (
  `idTypeCoffe` smallint(6) NOT NULL,
  `idBag` int(11) NOT NULL,
  PRIMARY KEY (`idTypeCoffe`,`idBag`),
  KEY `bag_bagtypecoffe_fk` (`idBag`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `bagtypecoffe`
--

INSERT INTO `bagtypecoffe` (`idTypeCoffe`, `idBag`) VALUES
(1, 53),
(1, 104),
(2, 30),
(2, 104),
(3, 53),
(4, 30),
(4, 65),
(4, 104),
(5, 30),
(5, 65),
(5, 99),
(5, 104),
(5, 105);

-- --------------------------------------------------------

--
-- Estrutura da tabela `city`
--

DROP TABLE IF EXISTS `city`;
CREATE TABLE IF NOT EXISTS `city` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `description` varchar(65) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `city`
--

INSERT INTO `city` (`id`, `description`) VALUES
(1, 'Patos de Minas'),
(2, 'Lagoa Formosa'),
(3, 'Presidente Olegário'),
(4, 'Carmo do Paranaíba');

-- --------------------------------------------------------

--
-- Estrutura da tabela `floor`
--

DROP TABLE IF EXISTS `floor`;
CREATE TABLE IF NOT EXISTS `floor` (
  `id` tinyint(4) NOT NULL AUTO_INCREMENT,
  `description` varchar(7) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `floor`
--

INSERT INTO `floor` (`id`, `description`) VALUES
(1, '1'),
(2, '2'),
(3, '3'),
(4, '4');

-- --------------------------------------------------------

--
-- Estrutura da tabela `forklift`
--

DROP TABLE IF EXISTS `forklift`;
CREATE TABLE IF NOT EXISTS `forklift` (
  `id` tinyint(4) NOT NULL AUTO_INCREMENT,
  `description` varchar(65) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `forklift`
--

INSERT INTO `forklift` (`id`, `description`) VALUES
(9, 'Empilhadeira 02'),
(10, 'Empilhadeira 03');

-- --------------------------------------------------------

--
-- Estrutura da tabela `location`
--

DROP TABLE IF EXISTS `location`;
CREATE TABLE IF NOT EXISTS `location` (
  `id` smallint(6) NOT NULL AUTO_INCREMENT,
  `idAvenue` tinyint(4) NOT NULL,
  `idStreet` tinyint(4) NOT NULL,
  `idPosition` smallint(6) NOT NULL,
  `idFloor` tinyint(4) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `avenue_location_fk` (`idAvenue`),
  KEY `street_location_fk` (`idStreet`),
  KEY `position_location_fk` (`idPosition`),
  KEY `floor_location_fk` (`idFloor`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `location`
--

INSERT INTO `location` (`id`, `idAvenue`, `idStreet`, `idPosition`, `idFloor`) VALUES
(1, 1, 1, 1, 1),
(2, 2, 1, 1, 1),
(3, 2, 1, 1, 2),
(4, 2, 2, 2, 1);

-- --------------------------------------------------------

--
-- Estrutura da tabela `position`
--

DROP TABLE IF EXISTS `position`;
CREATE TABLE IF NOT EXISTS `position` (
  `id` smallint(6) NOT NULL AUTO_INCREMENT,
  `description` smallint(6) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `position`
--

INSERT INTO `position` (`id`, `description`) VALUES
(1, 202),
(2, 201),
(3, 203);

-- --------------------------------------------------------

--
-- Estrutura da tabela `solicitation`
--

DROP TABLE IF EXISTS `solicitation`;
CREATE TABLE IF NOT EXISTS `solicitation` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idStatus` tinyint(4) NOT NULL,
  `idForklift` tinyint(4) NOT NULL,
  `idBag` int(11) NOT NULL,
  `idUser` smallint(6) NOT NULL,
  `dateTime` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `status_solicitation_fk` (`idStatus`),
  KEY `forklift_solicitation_fk` (`idForklift`),
  KEY `bag_solicitation_fk` (`idBag`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estrutura da tabela `status`
--

DROP TABLE IF EXISTS `status`;
CREATE TABLE IF NOT EXISTS `status` (
  `id` tinyint(4) NOT NULL AUTO_INCREMENT,
  `description` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `status`
--

INSERT INTO `status` (`id`, `description`) VALUES
(1, 'Concluído'),
(2, 'Em Andamento'),
(3, 'Cancelado');

-- --------------------------------------------------------

--
-- Estrutura da tabela `street`
--

DROP TABLE IF EXISTS `street`;
CREATE TABLE IF NOT EXISTS `street` (
  `id` tinyint(4) NOT NULL AUTO_INCREMENT,
  `description` char(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `street`
--

INSERT INTO `street` (`id`, `description`) VALUES
(1, 'A'),
(2, 'B');

-- --------------------------------------------------------

--
-- Estrutura da tabela `typecoffe`
--

DROP TABLE IF EXISTS `typecoffe`;
CREATE TABLE IF NOT EXISTS `typecoffe` (
  `id` smallint(6) NOT NULL AUTO_INCREMENT,
  `description` varchar(35) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `typecoffe`
--

INSERT INTO `typecoffe` (`id`, `description`) VALUES
(1, '080'),
(4, '082'),
(2, '081'),
(5, '083');

-- --------------------------------------------------------

--
-- Estrutura da tabela `typeuser`
--

DROP TABLE IF EXISTS `typeuser`;
CREATE TABLE IF NOT EXISTS `typeuser` (
  `id` tinyint(4) NOT NULL AUTO_INCREMENT,
  `description` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `typeuser`
--

INSERT INTO `typeuser` (`id`, `description`) VALUES
(1, 'Administrador'),
(2, 'Funcionário');

-- --------------------------------------------------------

--
-- Estrutura da tabela `user`
--

DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `id` smallint(6) NOT NULL AUTO_INCREMENT,
  `idTypeUser` tinyint(4) NOT NULL,
  `name` varchar(65) NOT NULL,
  `email` varchar(65) NOT NULL,
  `password` varchar(65) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `typeuser_user_fk` (`idTypeUser`)
) ENGINE=MyISAM AUTO_INCREMENT=18 DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `user`
--

INSERT INTO `user` (`id`, `idTypeUser`, `name`, `email`, `password`) VALUES
(1, 1, 'Administrador', 'admin@admin.com', '$2a$10$vpi3Osx3e7lUHAPAmivtIupURcYGVi.9W.cbwlDBUB7NJEPGo9WnO'),
(16, 2, 'Funcionário', 'funcionario@funcionario.com', '$2a$10$qGsju/GMAK1BwbeR9q7xLOOP9pBEiwUS/ZTENXvUMeyWvKLz01ZLa');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
