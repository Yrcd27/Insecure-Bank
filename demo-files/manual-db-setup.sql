-- CleverCloud MySQL Database Setup
-- Copy and paste this into CleverCloud's database manager

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

-- Note: Database already exists in CleverCloud, no need to create it

-- Drop existing tables if they exist (optional - remove if you want to keep existing data)
DROP TABLE IF EXISTS `transactions`;
DROP TABLE IF EXISTS `users`;

-- Users table
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `full_name` varchar(100) NOT NULL,
  `balance` decimal(15,2) DEFAULT 1000.00,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Transactions table
CREATE TABLE `transactions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `type` enum('deposit','withdraw','transfer') NOT NULL,
  `amount` decimal(15,2) NOT NULL,
  `recipient_id` int(11) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `recipient_id` (`recipient_id`),
  CONSTRAINT `transactions_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `transactions_ibfk_2` FOREIGN KEY (`recipient_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Insert users with current data from XAMPP
INSERT INTO `users` (`id`, `username`, `email`, `password`, `full_name`, `balance`, `created_at`) VALUES
(1, 'admin', 'admin@bank.com', 'admin123', 'Administrator', 41300.00, '2025-10-24 05:04:23'),
(2, 'john_doe', 'john@example.com', 'password', '<script>alert(\"XSS in Full Name\")</script>', 3200.00, '2025-10-24 05:04:23'),
(3, 'jane_smith', 'jane@example.com', '123456', 'Jane Smith', 2950.00, '2025-10-24 05:04:23'),
(4, 'bob_wilson', 'bob@example.com', 'Bobbbbb', 'Bob Wilson', 2000.00, '2025-10-24 05:04:23'),
(5, 'ycp27', 'yasiru@gmail.com', 'ycp123', 'Yasiru Chandupa', 11550.00, '2025-10-24 05:22:33');

-- Insert transactions with current data from XAMPP
INSERT INTO `transactions` (`id`, `user_id`, `type`, `amount`, `recipient_id`, `description`, `created_at`) VALUES
(1, 1, 'deposit', 10000.00, NULL, 'Initial deposit', '2025-10-24 05:04:23'),
(2, 2, 'deposit', 2000.00, NULL, 'Salary deposit', '2025-10-24 05:04:23'),
(3, 3, 'transfer', 500.00, 2, 'Payment for services', '2025-10-24 05:04:23'),
(4, 2, 'withdraw', 200.00, NULL, 'ATM withdrawal', '2025-10-24 05:04:23'),
(5, 4, 'transfer', 100.00, 1, 'Monthly fee payment', '2025-10-24 05:04:23'),
(6, 2, 'transfer', 100.00, 1, 'CSRF Attack - Educational Demo', '2025-10-26 15:29:28'),
(7, 2, 'transfer', 100.00, 1, 'CSRF Attack - Educational Demo', '2025-10-26 15:30:31'),
(8, 2, 'transfer', 100.00, 1, 'CSRF Attack - Educational Demo', '2025-10-26 15:32:40'),
(9, 3, 'transfer', 50.00, 1, 'Auto CSRF - Page Load Attack', '2025-10-26 15:32:57'),
(10, 2, 'transfer', 100.00, 1, 'CSRF Attack - Educational Demo', '2025-10-26 15:33:57'),
(11, 2, 'transfer', 100.00, 1, 'CSRF Attack - Educational Demo', '2025-10-26 15:34:04'),
(12, 2, 'transfer', 100.00, 1, 'CSRF Attack - Educational Demo', '2025-10-26 15:38:32'),
(13, 2, 'transfer', 100.00, 1, 'CSRF Attack - Educational Demo', '2025-10-26 15:39:23'),
(14, 2, 'transfer', 100.00, 1, 'CSRF Attack - Educational Demo', '2025-10-26 15:56:54'),
(15, 2, 'transfer', 100.00, 1, 'CSRF Attack - Educational Demo', '2025-10-26 16:02:32'),
(16, 5, 'transfer', 100.00, 1, 'CSRF Attack - Educational Demo', '2025-10-26 16:02:45'),
(17, 5, 'transfer', 100.00, 1, 'CSRF Attack - Educational Demo', '2025-10-26 16:02:57'),
(18, 5, 'transfer', 50.00, 1, 'Auto CSRF - Page Load Attack', '2025-10-26 16:03:06'),
(19, 5, 'transfer', 100.00, 1, 'CSRF Attack - Educational Demo', '2025-10-26 16:05:54'),
(20, 5, 'transfer', 100.00, 1, 'CSRF Attack - Educational Demo', '2025-10-27 10:16:56'),
(21, 5, 'transfer', 100.00, 1, 'CSRF Attack - Educational Demo', '2025-10-27 10:17:02'),
(22, 2, 'transfer', 1000.00, 5, '', '2025-10-27 10:54:07'),
(23, 1, 'transfer', 10000.00, 5, '', '2025-10-27 13:17:28'),
(24, 1, 'transfer', 500.00, 5, '', '2025-10-27 13:22:59'),
(25, 5, 'transfer', 100.00, 1, 'CSRF Attack - Educational Demo', '2025-10-29 12:59:17'),
(26, 5, 'transfer', 100.00, 1, 'CSRF Attack - Educational Demo', '2025-10-29 12:59:27'),
(27, 5, 'transfer', 100.00, 1, 'CSRF Attack - Educational Demo', '2025-10-29 13:00:20'),
(28, 5, 'transfer', 100.00, 2, '', '2025-10-29 13:06:08');

-- Set AUTO_INCREMENT values
ALTER TABLE `users` AUTO_INCREMENT=86;
ALTER TABLE `transactions` AUTO_INCREMENT=29;

COMMIT;