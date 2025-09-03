-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: mysql
-- Thời gian đã tạo: Th8 29, 2025 lúc 12:48 PM
-- Phiên bản máy phục vụ: 8.0.41
-- Phiên bản PHP: 8.2.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";

START TRANSACTION;

SET time_zone = "+00:00";

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */
;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */
;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */
;
/*!40101 SET NAMES utf8mb4 */
;

--
-- Cơ sở dữ liệu: `BlogDB`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `Articles`
--

CREATE TABLE `Articles` (
    `id` int UNSIGNED NOT NULL,
    `title` varchar(255) NOT NULL,
    `content` text,
    `userId` int UNSIGNED NOT NULL,
    `categoryId` int UNSIGNED NOT NULL,
    `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

--
-- Đang đổ dữ liệu cho bảng `Articles`
--

INSERT INTO
    `Articles` (
        `id`,
        `title`,
        `content`,
        `userId`,
        `categoryId`,
        `createdAt`,
        `updatedAt`
    )
VALUES (
        1,
        'Ha Long Bay',
        'This is the article talk about how to travel to HaLong Bay',
        1,
        3,
        '2025-08-29 12:47:35',
        '2025-08-29 12:47:35'
    ),
    (
        2,
        'Recruit backend developer',
        'FPT Software is recruiting some backend developers in this month',
        2,
        1,
        '2025-08-29 12:47:35',
        '2025-08-29 12:47:35'
    ),
    (
        3,
        'Price keeps increasing',
        'Because fuel price keeps increasing, all goods also increase…',
        3,
        2,
        '2025-08-29 12:47:35',
        '2025-08-29 12:47:35'
    );

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `Categories`
--

CREATE TABLE `Categories` (
    `id` int UNSIGNED NOT NULL,
    `name` varchar(100) NOT NULL,
    `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

--
-- Đang đổ dữ liệu cho bảng `Categories`
--

INSERT INTO
    `Categories` (
        `id`,
        `name`,
        `createdAt`,
        `updatedAt`
    )
VALUES (
        1,
        'Jobs',
        '2025-08-29 12:47:35',
        '2025-08-29 12:47:35'
    ),
    (
        2,
        'Economic',
        '2025-08-29 12:47:35',
        '2025-08-29 12:47:35'
    ),
    (
        3,
        'Travels',
        '2025-08-29 12:47:35',
        '2025-08-29 12:47:35'
    );

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `Users`
--

CREATE TABLE `Users` (
    `id` int UNSIGNED NOT NULL,
    `fullName` varchar(100) NOT NULL,
    `username` varchar(50) NOT NULL,
    `email` varchar(255) NOT NULL,
    `hash_pwd` varchar(255) NOT NULL,
    `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

--
-- Đang đổ dữ liệu cho bảng `Users`
--

INSERT INTO
    `Users` (
        `id`,
        `fullName`,
        `username`,
        `email`,
        `hash_pwd`,
        `createdAt`,
        `updatedAt`
    )
VALUES (
        1,
        'Khai Nguyen',
        'khainguyen',
        'khainguyen@gmail.com',
        'faw#%@‘oaf',
        '2025-08-29 12:47:35',
        '2025-08-29 12:47:35'
    ),
    (
        2,
        'Khanh Ngoc',
        'khanhngoc',
        'khanhngoc@gmail.com',
        'ghawd#’[S6]@S!',
        '2025-08-29 12:47:35',
        '2025-08-29 12:47:35'
    ),
    (
        3,
        'Binh Nguyen',
        'binhnguyen',
        'binhnguyen@gmail.com',
        '#!gats@#af%',
        '2025-08-29 12:47:35',
        '2025-08-29 12:47:35'
    );

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `Articles`
--
ALTER TABLE `Articles`
ADD PRIMARY KEY (`id`),
ADD KEY `idx_articles_userId` (`userId`),
ADD KEY `idx_articles_categoryId` (`categoryId`);

--
-- Chỉ mục cho bảng `Categories`
--
ALTER TABLE `Categories`
ADD PRIMARY KEY (`id`),
ADD UNIQUE KEY `uk_categories_name` (`name`);

--
-- Chỉ mục cho bảng `Users`
--
ALTER TABLE `Users`
ADD PRIMARY KEY (`id`),
ADD UNIQUE KEY `uk_users_username` (`username`),
ADD UNIQUE KEY `uk_users_email` (`email`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `Articles`
--
ALTER TABLE `Articles`
MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
AUTO_INCREMENT = 4;

--
-- AUTO_INCREMENT cho bảng `Categories`
--
ALTER TABLE `Categories`
MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
AUTO_INCREMENT = 4;

--
-- AUTO_INCREMENT cho bảng `Users`
--
ALTER TABLE `Users`
MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
AUTO_INCREMENT = 4;

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `Articles`
--
ALTER TABLE `Articles`
ADD CONSTRAINT `fk_articles_category` FOREIGN KEY (`categoryId`) REFERENCES `Categories` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
ADD CONSTRAINT `fk_articles_user` FOREIGN KEY (`userId`) REFERENCES `Users` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */
;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */
;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */
;