-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- 생성 시간: 24-12-22 07:25
-- 서버 버전: 10.4.32-MariaDB
-- PHP 버전: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 데이터베이스: `igagu`
--

-- --------------------------------------------------------

--
-- 테이블 구조 `cart`
--

CREATE TABLE `cart` (
  `id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `price` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `size` varchar(50) DEFAULT NULL,
  `color` varchar(50) DEFAULT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- 테이블 구조 `inquiries`
--

CREATE TABLE `inquiries` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `contact` varchar(100) NOT NULL,
  `category` varchar(50) NOT NULL,
  `message` text NOT NULL,
  `answer` text DEFAULT NULL,
  `status` enum('pending','answered') DEFAULT 'pending',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `user_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- 테이블의 덤프 데이터 `inquiries`
--

INSERT INTO `inquiries` (`id`, `name`, `contact`, `category`, `message`, `answer`, `status`, `created_at`, `user_id`) VALUES
(1, '1', '1', '가구', '11', NULL, 'pending', '2024-12-20 02:55:25', 2),
(2, '1', '1', '가구', '22', '종강 언제 오나요 ', 'answered', '2024-12-20 02:55:45', 2),
(3, '휴먼1', '01011112222', '가구', '111', NULL, 'pending', '2024-12-20 03:23:35', 2),
(4, '1', '01022222222', '인테리어', 'ㄴㅇㅁ', NULL, 'pending', '2024-12-20 03:25:07', 2),
(5, '휴먼1', '01011112222', '가구', '1234', NULL, 'pending', '2024-12-21 02:19:59', 1),
(6, '휴먼1', '01011112222', '가구', '11', NULL, 'pending', '2024-12-21 04:09:33', 13);

-- --------------------------------------------------------

--
-- 테이블 구조 `notices`
--

CREATE TABLE `notices` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `created_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- 테이블의 덤프 데이터 `notices`
--

INSERT INTO `notices` (`id`, `title`, `content`, `created_at`) VALUES
(3, '8월 리프레쉬 이벤트 당첨자 안내', '당첨자 내용...', '2024-09-13 09:30:00'),
(4, '서비스 이용약관 개정 안내', '약관 변경 내용...', '2024-09-10 12:00:00'),
(8, '<span style=\"color: red;\">[공지]</span> 공지테스트', '테스트내용~~!', '2024-12-19 19:45:19'),
(11, '<span style=\"color: red;\">[공지]</span> 55', '555555555555555\n555555555\n55\n\n\n\n\n\n\n\n\n55555', '2024-12-19 20:38:53'),
(12, '<span style=\"color: red;\">[공지]</span> 1515', '1515', '2024-12-20 10:24:41'),
(13, '<span style=\"color: red;\">[공지]</span> 1234', '1234', '2024-12-21 11:19:08');

-- --------------------------------------------------------

--
-- 테이블 구조 `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `order_number` varchar(255) NOT NULL,
  `order_date` date NOT NULL,
  `product_name` varchar(255) NOT NULL,
  `size` varchar(50) DEFAULT NULL,
  `color` varchar(50) DEFAULT NULL,
  `quantity` int(11) NOT NULL,
  `price` int(11) DEFAULT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- 테이블의 덤프 데이터 `orders`
--

INSERT INTO `orders` (`id`, `order_number`, `order_date`, `product_name`, `size`, `color`, `quantity`, `price`, `user_id`) VALUES
(26, '987655166', '2024-12-21', '소파 B', '0', 'Black', 1, 670000, 6),
(27, '987654560', '2024-12-21', '소파 B', '0', 'Black', 1, 670000, 11),
(28, '987654618', '2024-12-21', '침대 A', '0', 'White', 1, 1200000, 11);

-- --------------------------------------------------------

--
-- 테이블 구조 `popular_searches`
--

CREATE TABLE `popular_searches` (
  `id` int(11) NOT NULL,
  `term` varchar(255) NOT NULL,
  `count` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- 테이블의 덤프 데이터 `popular_searches`
--

INSERT INTO `popular_searches` (`id`, `term`, `count`, `created_at`, `updated_at`) VALUES
(1, '침대', 120, '2024-12-08 09:45:41', '2024-12-08 09:45:41'),
(2, '소파', 95, '2024-12-08 09:45:41', '2024-12-08 09:45:41'),
(3, '책상', 87, '2024-12-08 09:45:41', '2024-12-08 09:45:41'),
(4, '의자', 65, '2024-12-08 09:45:41', '2024-12-08 09:45:41'),
(5, '옷장', 50, '2024-12-08 09:45:41', '2024-12-08 09:45:41');

-- --------------------------------------------------------

--
-- 테이블 구조 `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `brand` varchar(255) NOT NULL,
  `category` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `popularity` int(11) DEFAULT 0,
  `reviews` int(11) DEFAULT 0,
  `created_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- 테이블의 덤프 데이터 `products`
--

INSERT INTO `products` (`id`, `name`, `price`, `brand`, `category`, `description`, `image_url`, `popularity`, `reviews`, `created_at`) VALUES
(1, '소파 A', 920000.00, 'innocent', '가구', '편안한 고급 소파', 'image/gagu/gagu100.jpg', 10, 35, '2024-12-08 10:00:00'),
(2, '소파 B', 670000.00, 'krencia', '가구', '세련된 디자인의 소파', 'image/gagu/gagu200.jpg', 15, 20, '2024-12-08 11:00:00'),
(3, '침대 A', 1200000.00, 'preenhome', '가구', '편안한 고급 침대', 'image/gagu/gagu3.jpg', 20, 30, '2024-12-08 12:00:00'),
(4, '책상 A', 750000.00, 'sortiedesign', '가구', '세련된 디자인의 책상', 'image/gagu/gagu4.jpg', 10, 10, '2024-12-08 13:00:00'),
(5, '소파 C', 850000.00, 'kcompany', '가구', '아늑한 소파', 'image/gagu/gagu100.jpg', 20, 25, '2024-12-09 14:00:00'),
(6, '침대 B', 1350000.00, 'doar', '가구', '럭셔리한 침대', 'image/gagu/gagu3.jpg', 18, 40, '2024-12-09 15:00:00'),
(7, '책상 B', 800000.00, 'sollo', '가구', '모던한 책상', 'image/gagu/gagu4.jpg', 12, 15, '2024-12-09 16:00:00'),
(8, '소파 D', 600000.00, 'livwood', '가구', '다양한 색상의 소파', 'image/gagu/gagu200.jpg', 25, 35, '2024-12-09 17:00:00'),
(9, '침대 C', 1250000.00, 'cocomi', '가구', '컴포트 침대', 'image/gagu/gagu3.jpg', 30, 28, '2024-12-09 18:00:00'),
(10, '책상 C', 950000.00, 'vaian', '가구', '세련된 디자인의 책상', 'image/gagu/gagu4.jpg', 22, 38, '2024-12-09 19:00:00'),
(11, '소파 E', 980000.00, 'baumist', '가구', '컴팩트한 소파', 'image/gagu/gagu100.jpg', 12, 15, '2024-12-09 20:00:00'),
(12, '침대 D', 1400000.00, 'rotie', '가구', '편안한 침대', 'image/gagu/gagu3.jpg', 8, 10, '2024-12-09 21:00:00'),
(13, '책상 D', 880000.00, 'innocent', '가구', '스마트한 책상', 'image/gagu/gagu4.jpg', 14, 20, '2024-12-09 22:00:00'),
(14, '소파 F', 1050000.00, 'preenhome', '가구', '편안한 소파', 'image/gagu/gagu100.jpg', 18, 25, '2024-12-09 23:00:00'),
(15, '침대 E', 1100000.00, 'sortiedesign', '가구', '편안한 침대', 'image/gagu/gagu3.jpg', 20, 30, '2024-12-10 10:00:00'),
(16, '책상 E', 700000.00, 'kcompany', '가구', '모던한 책상', 'image/gagu/gagu4.jpg', 15, 22, '2024-12-10 11:00:00'),
(17, '소파 G', 890000.00, 'doar', '가구', '세련된 소파', 'image/gagu/gagu100.jpg', 10, 30, '2024-12-10 12:00:00'),
(18, '침대 F', 1150000.00, 'livwood', '가구', '럭셔리한 침대', 'image/gagu/gagu3.jpg', 22, 28, '2024-12-10 13:00:00'),
(19, '책상 F', 850000.00, 'sollo', '가구', '프리미엄 책상', 'image/gagu/gagu4.jpg', 25, 35, '2024-12-10 14:00:00'),
(20, '소파 H', 950000.00, 'vaian', '가구', '모던 소파', 'image/gagu/gagu200.jpg', 18, 22, '2024-12-10 15:00:00'),
(21, '침대 G', 1450000.00, 'baumist', '가구', '고급 침대', 'image/gagu/gagu3.jpg', 20, 25, '2024-12-10 16:00:00'),
(22, '책상 G', 920000.00, 'krencia', '가구', '실용적인 책상', 'image/gagu/gagu4.jpg', 12, 18, '2024-12-10 17:00:00'),
(23, '소파 I', 1100000.00, 'doar', '가구', '깔끔한 소파', 'image/gagu/gagu100.jpg', 14, 22, '2024-12-10 18:00:00'),
(24, '침대 H', 1200000.00, 'preenhome', '가구', '고급 침대', 'image/gagu/gagu3.jpg', 16, 30, '2024-12-10 19:00:00'),
(25, '책상 H', 760000.00, 'livwood', '가구', '다용도 책상', 'image/gagu/gagu4.jpg', 10, 15, '2024-12-10 20:00:00'),
(101, '욕조 A', 450000.00, 'innocent', '욕실', '고급 소재로 제작된 편안한 욕조', 'image/gagu/bathitem1-1.jpg', 10, 25, '2024-12-09 10:00:00'),
(102, '변기 A', 250000.00, 'krencia', '욕실', '세련된 디자인의 변기', 'image/gagu/bathitem2.jpg', 8, 30, '2024-12-11 17:00:00'),
(103, '배스밤 A', 55000.00, 'preenhome', '욕실', '우주의 별처럼 반짝이는 배스밤', 'image/gagu/bathitem3.jpg', 12, 35, '2024-12-15 19:00:00'),
(104, '배스밤 B', 54000.00, 'sortiedesign', '욕실', '버블버블 배스밤', 'image/gagu/bathitem4.jpg', 15, 28, '2024-12-21 07:00:00'),
(105, '욕조 B', 470000.00, 'innocent', '욕실', '편안한 고급 욕조', 'image/gagu/bathitem1-1.jpg', 18, 22, '2024-12-22 10:00:00'),
(106, '변기 B', 270000.00, 'krencia', '욕실', '모던한 디자인의 변기', 'image/gagu/bathitem2.jpg', 9, 19, '2024-12-22 11:00:00'),
(107, '배스밤 C', 59000.00, 'preenhome', '욕실', '화려한 색상의 배스밤', 'image/gagu/bathitem3.jpg', 13, 45, '2024-12-22 12:00:00'),
(108, '배스밤 C', 53000.00, 'sortiedesign', '욕실', '버블 효과가 뛰어난 배스밤', 'image/gagu/bathitem4.jpg', 17, 26, '2024-12-22 13:00:00'),
(109, '욕조 C', 490000.00, 'innocent', '욕실', '매우 편안한 욕조', 'image/gagu/bathitem1-1.jpg', 14, 23, '2024-12-22 14:00:00'),
(110, '변기 C', 230000.00, 'krencia', '욕실', '미니멀한 디자인의 변기', 'image/gagu/bathitem2.jpg', 11, 18, '2024-12-22 15:00:00'),
(111, '배스밤 D', 60000.00, 'preenhome', '욕실', '향기로운 배스밤', 'image/gagu/bathitem3.jpg', 20, 30, '2024-12-22 16:00:00'),
(112, '배스밤 D', 57000.00, 'sortiedesign', '욕실', '고급스러운 배스밤', 'image/gagu/bathitem4.jpg', 14, 25, '2024-12-22 17:00:00'),
(113, '욕조 D', 510000.00, 'innocent', '욕실', '편안한 고급 욕조', 'image/gagu/bathitem1-1.jpg', 16, 20, '2024-12-22 18:00:00'),
(114, '변기 D', 290000.00, 'krencia', '욕실', '고급스러운 디자인의 변기', 'image/gagu/bathitem2.jpg', 13, 22, '2024-12-22 19:00:00'),
(115, '배스밤 E', 65000.00, 'preenhome', '욕실', '심플한 디자인의 배스밤', 'image/gagu/bathitem3.jpg', 18, 40, '2024-12-22 20:00:00'),
(116, '배스밤 E', 62000.00, 'sortiedesign', '욕실', '부드러운 질감의 배스밤', 'image/gagu/bathitem4.jpg', 19, 28, '2024-12-22 21:00:00'),
(117, '욕조 E', 530000.00, 'innocent', '욕실', '편안한 욕조', 'image/gagu/bathitem1-1.jpg', 11, 17, '2024-12-22 22:00:00'),
(118, '변기 E', 310000.00, 'krencia', '욕실', '디자인이 뛰어난 변기', 'image/gagu/bathitem2.jpg', 9, 15, '2024-12-22 23:00:00'),
(119, '배스밤 F', 70000.00, 'preenhome', '욕실', '다양한 향기의 배스밤', 'image/gagu/bathitem3.jpg', 25, 30, '2024-12-23 10:00:00'),
(120, '배스밤 F', 68000.00, 'sortiedesign', '욕실', '향긋한 배스밤', 'image/gagu/bathitem4.jpg', 14, 18, '2024-12-23 11:00:00'),
(121, '욕조 F', 550000.00, 'innocent', '욕실', '세련된 디자인의 욕조', 'image/gagu/bathitem1-1.jpg', 20, 25, '2024-12-23 12:00:00'),
(122, '변기 F', 330000.00, 'krencia', '욕실', '모던한 디자인 변기', 'image/gagu/bathitem2.jpg', 22, 35, '2024-12-23 13:00:00'),
(123, '배스밤 G', 75000.00, 'preenhome', '욕실', '상쾌한 향기의 배스밤', 'image/gagu/bathitem3.jpg', 19, 30, '2024-12-23 14:00:00'),
(124, '배스밤 G', 72000.00, 'sortiedesign', '욕실', '달콤한 향기의 배스밤', 'image/gagu/bathitem4.jpg', 17, 20, '2024-12-23 15:00:00'),
(125, '욕조 G', 570000.00, 'innocent', '욕실', '편안하고 고급스러운 욕조', 'image/gagu/bathitem1-1.jpg', 23, 30, '2024-12-23 16:00:00'),
(201, '조명 A', 92000.00, 'innocent', '홈', '편안함을 주는 조명', 'image/gagu/home1.jpg', 10, 35, '2024-12-20 10:00:00'),
(202, '조명 B', 67000.00, 'krencia', '홈', '무드등', 'image/gagu/home3.jpg', 15, 20, '2024-12-05 11:00:00'),
(203, '홈데코 A', 12000.00, 'preenhome', '홈', '우리집 호캉스', 'image/gagu/home4.jpg', 20, 30, '2024-12-14 12:00:00'),
(204, '홈데코 B', 95000.00, 'sortiedesign', '홈', '편안한 우리집', 'image/gagu/home2.jpg', 10, 10, '2024-12-02 13:00:00'),
(205, '조명 C', 83000.00, 'kcompany', '홈', '아늑한 분위기를 위한 조명', 'image/gagu/home1.jpg', 12, 25, '2024-12-10 09:00:00'),
(206, '홈데코 C', 15000.00, 'jpix', '홈', '편안한 휴식 공간', 'image/gagu/home3.jpg', 18, 28, '2024-12-12 14:00:00'),
(207, '조명 D', 76000.00, 'doar', '홈', '모던한 디자인의 조명', 'image/gagu/home2.jpg', 14, 22, '2024-12-18 15:00:00'),
(208, '홈데코 D', 11000.00, 'sollo', '홈', '우리집에 꼭 필요한 아이템', 'image/gagu/home4.jpg', 8, 16, '2024-12-04 08:00:00'),
(209, '조명 E', 72000.00, 'livwood', '홈', '탁월한 품질의 조명', 'image/gagu/home3.jpg', 25, 40, '2024-12-15 13:00:00'),
(210, '홈데코 E', 20000.00, 'cocomi', '홈', '우리 집을 빛내줄 아이템', 'image/gagu/home2.jpg', 30, 50, '2024-12-13 11:00:00'),
(211, '조명 F', 85000.00, 'innocent', '홈', '다채로운 색의 조명', 'image/gagu/home1.jpg', 10, 30, '2024-12-25 14:00:00'),
(212, '홈데코 F', 13000.00, 'krencia', '홈', '세련된 거실 인테리어', 'image/gagu/home4.jpg', 18, 24, '2024-12-24 12:00:00'),
(213, '조명 G', 72000.00, 'preenhome', '홈', '편안한 분위기의 조명', 'image/gagu/home2.jpg', 22, 40, '2024-12-23 10:00:00'),
(214, '홈데코 G', 19000.00, 'sortiedesign', '홈', '편안한 침실 인테리어', 'image/gagu/home3.jpg', 16, 32, '2024-12-22 09:00:00'),
(215, '조명 H', 65000.00, 'kcompany', '홈', '고급스러운 디자인의 조명', 'image/gagu/home4.jpg', 12, 18, '2024-12-21 08:00:00'),
(216, '홈데코 H', 14000.00, 'jpix', '홈', '우리집 리모델링', 'image/gagu/home1.jpg', 24, 50, '2024-12-20 11:00:00'),
(217, '조명 I', 88000.00, 'doar', '홈', '화이트 톤의 조명', 'image/gagu/home2.jpg', 15, 22, '2024-12-19 14:00:00'),
(218, '홈데코 I', 11000.00, 'sollo', '홈', '모던한 인테리어', 'image/gagu/home3.jpg', 30, 60, '2024-12-18 13:00:00'),
(219, '조명 J', 95000.00, 'livwood', '홈', '고급스러운 조명', 'image/gagu/home4.jpg', 18, 25, '2024-12-17 10:00:00'),
(220, '홈데코 J', 20000.00, 'cocomi', '홈', '포근한 분위기의 인테리어', 'image/gagu/home1.jpg', 10, 30, '2024-12-16 11:00:00'),
(221, '조명 K', 78000.00, 'innocent', '홈', '어두운 공간을 밝히는 조명', 'image/gagu/home2.jpg', 22, 28, '2024-12-14 10:00:00'),
(222, '홈데코 K', 16000.00, 'krencia', '홈', '편안한 집 인테리어', 'image/gagu/home3.jpg', 25, 40, '2024-12-13 09:00:00'),
(223, '조명 L', 83000.00, 'preenhome', '홈', '실용적인 조명', 'image/gagu/home4.jpg', 14, 20, '2024-12-12 08:00:00'),
(224, '홈데코 L', 12000.00, 'sortiedesign', '홈', '현대적인 집 인테리어', 'image/gagu/home1.jpg', 18, 30, '2024-12-11 14:00:00'),
(225, '조명 M', 70000.00, 'kcompany', '홈', '빛의 색을 조절하는 조명', 'image/gagu/home2.jpg', 20, 35, '2024-12-10 13:00:00'),
(301, '인테리어 A', 1920000.00, 'innocent', '인테리어', '집중력을 올리는 사무실', 'image/gagu/interior1.jpg', 10, 35, '2024-12-18 10:00:00'),
(302, '인테리어 B', 460000.00, 'krencia', '인테리어', '아름다운 욕실과 주방', 'image/gagu/interior2.jpg', 15, 20, '2024-12-18 11:00:00'),
(303, '인테리어 C', 530000.00, 'preenhome', '인테리어', '신혼부부를 위한 특별전', 'image/gagu/interior3.jpg', 20, 30, '2024-12-15 12:00:00'),
(304, '인테리어 D', 950000.00, 'sortiedesign', '인테리어', '생활을 바꾸는 이가구', 'image/gagu/interior4.jpg', 10, 10, '2024-12-04 13:00:00'),
(305, '인테리어 E', 780000.00, 'innocent', '인테리어', '아름다운 욕실과 주방', 'image/gagu/interior2.jpg', 25, 18, '2024-12-10 14:00:00'),
(306, '인테리어 F', 850000.00, 'krencia', '인테리어', '생활을 바꾸는 이가구', 'image/gagu/interior4.jpg', 30, 40, '2024-12-01 15:00:00'),
(307, '인테리어 G', 670000.00, 'preenhome', '인테리어', '신혼부부를 위한 특별전', 'image/gagu/interior3.jpg', 22, 50, '2024-11-20 16:00:00'),
(308, '인테리어 H', 1300000.00, 'sortiedesign', '인테리어', '집중력을 올리는 사무실', 'image/gagu/interior1.jpg', 18, 22, '2024-11-05 17:00:00'),
(309, '인테리어 I', 780000.00, 'kcompany', '인테리어', '아름다운 욕실과 주방', 'image/gagu/interior2.jpg', 12, 27, '2024-11-15 18:00:00'),
(310, '인테리어 J', 900000.00, 'doar', '인테리어', '생활을 바꾸는 이가구', 'image/gagu/interior4.jpg', 8, 15, '2024-10-22 19:00:00'),
(311, '인테리어 K', 620000.00, 'sollo', '인테리어', '신혼부부를 위한 특별전', 'image/gagu/interior3.jpg', 35, 60, '2024-10-10 20:00:00'),
(312, '인테리어 L', 720000.00, 'livwood', '인테리어', '집중력을 올리는 사무실', 'image/gagu/interior1.jpg', 10, 12, '2024-09-28 21:00:00'),
(313, '인테리어 M', 850000.00, 'cocomi', '인테리어', '생활을 바꾸는 이가구', 'image/gagu/interior4.jpg', 28, 45, '2024-09-15 22:00:00'),
(314, '인테리어 N', 1200000.00, 'vaian', '인테리어', '신혼부부를 위한 특별전', 'image/gagu/interior3.jpg', 18, 20, '2024-08-22 23:00:00'),
(315, '인테리어 O', 1050000.00, 'baumist', '인테리어', '아름다운 욕실과 주방', 'image/gagu/interior2.jpg', 24, 30, '2024-08-05 10:00:00'),
(316, '인테리어 P', 890000.00, 'rotie', '인테리어', '생활을 바꾸는 이가구', 'image/gagu/interior4.jpg', 33, 50, '2024-07-25 11:00:00'),
(317, '인테리어 Q', 1300000.00, 'sortiedesign', '인테리어', '집중력을 올리는 사무실', 'image/gagu/interior1.jpg', 18, 22, '2024-11-05 17:00:00'),
(318, '인테리어 R', 800000.00, 'kcompany', '인테리어', '아름다운 욕실과 주방', 'image/gagu/interior2.jpg', 20, 25, '2024-11-15 18:00:00'),
(319, '인테리어 S', 750000.00, 'doar', '인테리어', '생활을 바꾸는 이가구', 'image/gagu/interior4.jpg', 15, 30, '2024-10-22 19:00:00'),
(320, '인테리어 T', 680000.00, 'sollo', '인테리어', '신혼부부를 위한 특별전', 'image/gagu/interior3.jpg', 28, 50, '2024-10-10 20:00:00'),
(321, '인테리어 U', 710000.00, 'livwood', '인테리어', '집중력을 올리는 사무실', 'image/gagu/interior1.jpg', 18, 28, '2024-09-28 21:00:00'),
(322, '인테리어 V', 690000.00, 'cocomi', '인테리어', '생활을 바꾸는 이가구', 'image/gagu/interior4.jpg', 25, 35, '2024-09-15 22:00:00'),
(344, '테스트 상품 수정', 30000.00, 'krencia', '수납', '30', 'image/gagu/bathitem3.jpg', 0, 0, '2024-12-21 18:13:09'),
(345, '테스트 상품1', 110000.00, 'gorae', '아웃도어', '11', 'image/gagu/home1.jpg', 0, 0, '2024-12-21 18:33:20'),
(347, '테스트 상품222', 2220000.00, 'krencia', '패브릭', '22233', 'image/gagu/gagu3.jpg', 0, 0, '2024-12-21 21:42:53'),
(348, '올비아 6인식탁 2000', 1390000.00, 'baumist', '가구', '독특한 디자인, 따뜻한 색상의 다이닝가구입니다.', 'image/gagu/ta.jpg', 33, 0, '2024-12-22 13:24:29');

-- --------------------------------------------------------

--
-- 테이블 구조 `product_details`
--

CREATE TABLE `product_details` (
  `product_id` int(11) NOT NULL,
  `detailed_desc` text DEFAULT NULL,
  `size_options` longtext DEFAULT NULL CHECK (json_valid(`size_options`)),
  `color_options` longtext DEFAULT NULL CHECK (json_valid(`color_options`)),
  `benefits` longtext DEFAULT NULL CHECK (json_valid(`benefits`)),
  `detail_images` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- 테이블의 덤프 데이터 `product_details`
--

INSERT INTO `product_details` (`product_id`, `detailed_desc`, `size_options`, `color_options`, `benefits`, `detail_images`) VALUES
(1, '고급 소재로 제작된 편안한 소파입니다.', '[\"Medium\", \"Large\"]', '[\"Gray\", \"White\"]', '[\"무이자 12개월\", \"무료 배송\"]', 'image/gagu/gagu_detail100.jpg'),
(2, '세련된 디자인의 소파입니다.', '[\"Medium\", \"Large\"]', '[\"Black\", \"Blue\", \"White\"]', '[\"카카오페이 할인\", \"무료 조립 서비스\"]', 'image/gagu/gagu_detail200.jpg'),
(3, '고급 소재로 제작된 편안한 침대입니다.', '[\"Queen\", \"King\"]', '[\"Gray\", \"White\"]', '[\"무이자 12개월\", \"무료 배송\"]', 'image/gagu/gagu_detail3.jpg'),
(4, '세련된 디자인의 책상입니다.', '[\"Standard\", \"Large\"]', '[\"Gray\", \"White\"]', '[\"카카오페이 할인\", \"무료 조립 서비스\"]', 'image/gagu/gagu_detail4.jpg'),
(5, '아늑한 소파입니다.', '[\"Medium\", \"Large\"]', '[\"Black\", \"Gray\", \"White\"]', '[\"무이자 12개월\", \"무료 배송\"]', 'image/gagu/gagu_detail100.jpg'),
(6, '럭셔리한 침대입니다.', '[\"Queen\", \"King\"]', '[\"Gray\", \"White\"]', '[\"무이자 12개월\", \"무료 배송\"]', 'image/gagu/gagu_detail3.jpg'),
(7, '모던한 책상입니다.', '[\"Standard\", \"Large\"]', '[\"Gray\", \"White\"]', '[\"카카오페이 할인\", \"무료 조립 서비스\"]', 'image/gagu/gagu_detail4.jpg'),
(8, '다양한 색상의 소파입니다.', '[\"Medium\", \"Large\"]', '[\"Gray\", \"White\", \"Blue\"]', '[\"무이자 12개월\", \"무료 배송\"]', 'image/gagu/gagu_detail200.jpg'),
(9, '편안한 침대입니다.', '[\"Queen\", \"King\"]', '[\"Gray\", \"White\"]', '[\"무이자 12개월\", \"무료 배송\"]', 'image/gagu/gagu_detail3.jpg'),
(10, '세련된 책상입니다.', '[\"Standard\", \"Large\"]', '[\"Gray\", \"White\"]', '[\"카카오페이 할인\", \"무료 조립 서비스\"]', 'image/gagu/gagu_detail4.jpg'),
(11, '컴팩트한 소파입니다.', '[\"Medium\", \"Large\"]', '[\"Black\", \"White\"]', '[\"무이자 12개월\", \"무료 배송\"]', 'image/gagu/gagu_detail100.jpg'),
(12, '편안한 침대입니다.', '[\"Queen\", \"King\"]', '[\"Gray\", \"White\"]', '[\"무이자 12개월\", \"무료 배송\"]', 'image/gagu/gagu_detail3.jpg'),
(13, '스마트한 책상입니다.', '[\"Standard\", \"Large\"]', '[\"Gray\", \"White\"]', '[\"카카오페이 할인\", \"무료 조립 서비스\"]', 'image/gagu/gagu_detail4.jpg'),
(14, '세련된 소파입니다.', '[\"Medium\", \"Large\"]', '[\"Black\", \"White\"]', '[\"무이자 12개월\", \"무료 배송\"]', 'image/gagu/gagu_detail100.jpg'),
(15, '편안한 침대입니다.', '[\"Queen\", \"King\"]', '[\"Gray\", \"White\"]', '[\"무이자 12개월\", \"무료 배송\"]', 'image/gagu/gagu_detail3.jpg'),
(16, '프리미엄 책상입니다.', '[\"Standard\", \"Large\"]', '[\"Gray\", \"White\"]', '[\"카카오페이 할인\", \"무료 조립 서비스\"]', 'image/gagu/gagu_detail4.jpg'),
(17, '세련된 소파입니다.', '[\"Medium\", \"Large\"]', '[\"Black\", \"White\"]', '[\"무이자 12개월\", \"무료 배송\"]', 'image/gagu/gagu_detail100.jpg'),
(18, '고급 침대입니다.', '[\"Queen\", \"King\"]', '[\"Gray\", \"White\"]', '[\"무이자 12개월\", \"무료 배송\"]', 'image/gagu/gagu_detail3.jpg'),
(19, '실용적인 책상입니다.', '[\"Standard\", \"Large\"]', '[\"Gray\", \"White\"]', '[\"카카오페이 할인\", \"무료 조립 서비스\"]', 'image/gagu/gagu_detail4.jpg'),
(20, '깔끔한 소파입니다.', '[\"Medium\", \"Large\"]', '[\"Gray\", \"White\"]', '[\"무이자 12개월\", \"무료 배송\"]', 'image/gagu/gagu_detail100.jpg'),
(21, '고급 침대입니다.', '[\"Queen\", \"King\"]', '[\"Gray\", \"White\"]', '[\"무이자 12개월\", \"무료 배송\"]', 'image/gagu/gagu_detail3.jpg'),
(22, '프리미엄 책상입니다.', '[\"Standard\", \"Large\"]', '[\"Gray\", \"White\"]', '[\"카카오페이 할인\", \"무료 조립 서비스\"]', 'image/gagu/gagu_detail4.jpg'),
(23, '깔끔한 소파입니다.', '[\"Medium\", \"Large\"]', '[\"Black\", \"White\"]', '[\"무이자 12개월\", \"무료 배송\"]', 'image/gagu/gagu_detail100.jpg'),
(24, '고급 침대입니다.', '[\"Queen\", \"King\"]', '[\"Gray\", \"White\"]', '[\"무이자 12개월\", \"무료 배송\"]', 'image/gagu/gagu_detail3.jpg'),
(25, '다용도 책상입니다.', '[\"Standard\", \"Large\"]', '[\"Gray\", \"White\"]', '[\"카카오페이 할인\", \"무료 조립 서비스\"]', 'image/gagu/gagu_detail4.jpg'),
(101, '고급 소재로 제작된 편안한 욕조입니다.', '[\"Medium\", \"Large\"]', '[\"Gray\", \"White\"]', '[\"무이자 12개월\", \"무료 배송\"]', 'image/gagu/bathitem_detail1.jpg'),
(102, '세련된 디자인의 변기입니다.', '[\"Medium\", \"Large\"]', '[\"White\"]', '[\"카카오페이 할인\", \"무료 조립 서비스\"]', 'image/gagu/bathitem_detail2.jpg'),
(103, '우주의 별처럼 반짝이는 배스밤입니다.', '[\"free\"]', '[\"purple\"]', '[\"무료 배송\"]', 'image/gagu/bathitem_detail3.jpg'),
(104, '버블버블 배스밤입니다.', '[\"free\"]', '[\"blue\", \"White\"]', '[\"카카오페이 할인\", \"무료 배송\"]', 'image/gagu/bathitem_detail4.jpg'),
(105, '아늑한 욕조입니다.', '[\"Medium\", \"Large\"]', '[\"Gray\", \"White\"]', '[\"무이자 12개월\", \"무료 배송\"]', 'image/gagu/bathitem_detail1.jpg'),
(106, '럭셔리한 변기입니다.', '[\"Medium\", \"Large\"]', '[\"White\"]', '[\"카카오페이 할인\", \"무료 조립 서비스\"]', 'image/gagu/bathitem_detail2.jpg'),
(107, '편안한 배스밤입니다.', '[\"free\"]', '[\"purple\"]', '[\"무료 배송\"]', 'image/gagu/bathitem_detail3.jpg'),
(108, '고급 배스밤입니다.', '[\"free\"]', '[\"blue\", \"White\"]', '[\"카카오페이 할인\", \"무료 배송\"]', 'image/gagu/bathitem_detail4.jpg'),
(109, '프리미엄 욕조입니다.', '[\"Medium\", \"Large\"]', '[\"Gray\", \"White\"]', '[\"무이자 12개월\", \"무료 배송\"]', 'image/gagu/bathitem_detail1.jpg'),
(110, '디자인 변기입니다.', '[\"Medium\", \"Large\"]', '[\"White\"]', '[\"카카오페이 할인\", \"무료 조립 서비스\"]', 'image/gagu/bathitem_detail2.jpg'),
(111, '향기로운 배스밤입니다.', '[\"free\"]', '[\"purple\"]', '[\"무료 배송\"]', 'image/gagu/bathitem_detail3.jpg'),
(112, '부드러운 배스밤입니다.', '[\"free\"]', '[\"blue\", \"White\"]', '[\"카카오페이 할인\", \"무료 배송\"]', 'image/gagu/bathitem_detail4.jpg'),
(113, '고급 욕조입니다.', '[\"Medium\", \"Large\"]', '[\"Gray\", \"White\"]', '[\"무이자 12개월\", \"무료 배송\"]', 'image/gagu/bathitem_detail1.jpg'),
(114, '디자인 책상입니다.', '[\"Medium\", \"Large\"]', '[\"Gray\", \"White\"]', '[\"카카오페이 할인\", \"무료 조립 서비스\"]', 'image/gagu/bathitem_detail4.jpg'),
(115, '럭셔리한 배스밤입니다.', '[\"free\"]', '[\"purple\"]', '[\"무료 배송\"]', 'image/gagu/bathitem_detail3.jpg'),
(116, '프리미엄 배스밤입니다.', '[\"free\"]', '[\"blue\", \"White\"]', '[\"카카오페이 할인\", \"무료 배송\"]', 'image/gagu/bathitem_detail4.jpg'),
(117, '세련된 욕조입니다.', '[\"Medium\", \"Large\"]', '[\"Gray\", \"White\"]', '[\"무이자 12개월\", \"무료 배송\"]', 'image/gagu/bathitem_detail1.jpg'),
(118, '모던 변기입니다.', '[\"Medium\", \"Large\"]', '[\"White\"]', '[\"카카오페이 할인\", \"무료 조립 서비스\"]', 'image/gagu/bathitem_detail2.jpg'),
(119, '향기로운 배스밤입니다.', '[\"free\"]', '[\"purple\"]', '[\"무료 배송\"]', 'image/gagu/bathitem_detail3.jpg'),
(120, '부드러운 배스밤입니다.', '[\"free\"]', '[\"blue\", \"White\"]', '[\"카카오페이 할인\", \"무료 배송\"]', 'image/gagu/bathitem_detail4.jpg'),
(121, '고급 욕조입니다.', '[\"Medium\", \"Large\"]', '[\"Gray\", \"White\"]', '[\"무이자 12개월\", \"무료 배송\"]', 'image/gagu/bathitem_detail1.jpg'),
(122, '디자인 변기입니다.', '[\"Medium\", \"Large\"]', '[\"White\"]', '[\"카카오페이 할인\", \"무료 조립 서비스\"]', 'image/gagu/bathitem_detail2.jpg'),
(123, '향기로운 배스밤입니다.', '[\"free\"]', '[\"purple\"]', '[\"무료 배송\"]', 'image/gagu/bathitem_detail3.jpg'),
(124, '부드러운 배스밤입니다.', '[\"free\"]', '[\"blue\", \"White\"]', '[\"카카오페이 할인\", \"무료 배송\"]', 'image/gagu/bathitem_detail4.jpg'),
(125, '고급 욕조입니다.', '[\"Medium\", \"Large\"]', '[\"Gray\", \"White\"]', '[\"무이자 12개월\", \"무료 배송\"]', 'image/gagu/bathitem_detail1.jpg'),
(201, '편안함을 주는 조명.', '[\"3000K\", \"5000K\"]', '[\"Black\", \"White\"]', '[\"무이자 12개월\", \"무료 배송\"]', 'image/gagu/home_detail1.jpg'),
(202, '무드등.', '[\"8000K\", \"3000K\"]', '[\"Black\", \"White\"]', '[\"카카오페이 할인\", \"무료 조립 서비스\"]', 'image/gagu/home_detail3.jpg'),
(203, '우리집 호캉스.', '[\"Small\", \"Large\"]', '[\"Gray\", \"White\"]', '[\"무이자 12개월\", \"무료 배송\"]', 'image/gagu/home_detail4.jpg'),
(204, '편안한 우리집.', '[\"Standard\", \"Large\"]', '[\"Gray\", \"White\"]', '[\"카카오페이 할인\", \"무료 조립 서비스\"]', 'image/gagu/home_detail2.jpg'),
(205, '아늑한 분위기를 위한 조명.', '[\"3000K\", \"5000K\"]', '[\"Gray\", \"Black\"]', '[\"무이자 24개월\", \"무료 배송\"]', 'image/gagu/home_detail1.jpg'),
(206, '편안한 휴식 공간.', '[\"Small\", \"Medium\"]', '[\"Black\", \"Gray\"]', '[\"무이자 12개월\", \"무료 조립 서비스\"]', 'image/gagu/home_detail3.jpg'),
(207, '모던한 디자인의 조명.', '[\"3000K\", \"4000K\"]', '[\"White\", \"Gray\"]', '[\"카카오페이 할인\", \"무료 배송\"]', 'image/gagu/home_detail2.jpg'),
(208, '우리집에 꼭 필요한 아이템.', '[\"Medium\", \"Large\"]', '[\"White\", \"Black\"]', '[\"무이자 36개월\", \"무료 배송\"]', 'image/gagu/home_detail4.jpg'),
(209, '탁월한 품질의 조명.', '[\"5000K\", \"6000K\"]', '[\"White\", \"Black\"]', '[\"무이자 12개월\", \"무료 배송\"]', 'image/gagu/home_detail3.jpg'),
(210, '우리 집을 빛내줄 아이템.', '[\"Standard\", \"Large\"]', '[\"White\", \"Gray\"]', '[\"카카오페이 할인\", \"무료 조립 서비스\"]', 'image/gagu/home_detail2.jpg'),
(211, '다채로운 색의 조명.', '[\"3000K\", \"5000K\"]', '[\"White\", \"Black\"]', '[\"무이자 24개월\", \"무료 배송\"]', 'image/gagu/home_detail1.jpg'),
(212, '세련된 거실 인테리어.', '[\"Standard\", \"Medium\"]', '[\"Black\", \"White\"]', '[\"무이자 36개월\", \"무료 배송\"]', 'image/gagu/home_detail4.jpg'),
(213, '편안한 분위기의 조명.', '[\"3000K\", \"5000K\"]', '[\"Black\", \"Gray\"]', '[\"카카오페이 할인\", \"무료 조립 서비스\"]', 'image/gagu/home_detail3.jpg'),
(214, '편안한 침실 인테리어.', '[\"Large\", \"Medium\"]', '[\"Gray\", \"White\"]', '[\"무료 배송\", \"무료 조립 서비스\"]', 'image/gagu/home_detail2.jpg'),
(215, '고급스러운 디자인의 조명.', '[\"4000K\", \"5000K\"]', '[\"White\", \"Gray\"]', '[\"카카오페이 할인\", \"무료 배송\"]', 'image/gagu/home_detail4.jpg'),
(216, '우리집 리모델링.', '[\"Small\", \"Medium\"]', '[\"White\", \"Black\"]', '[\"무이자 12개월\", \"무료 배송\"]', 'image/gagu/home_detail1.jpg'),
(217, '화이트 톤의 조명.', '[\"5000K\", \"6000K\"]', '[\"White\", \"Gray\"]', '[\"카카오페이 할인\", \"무료 조립 서비스\"]', 'image/gagu/home_detail3.jpg'),
(218, '모던한 인테리어.', '[\"Medium\", \"Standard\"]', '[\"Gray\", \"Black\"]', '[\"무료 배송\", \"무료 조립 서비스\"]', 'image/gagu/home_detail2.jpg'),
(219, '고급스러운 조명.', '[\"3000K\", \"4000K\"]', '[\"Black\", \"White\"]', '[\"무이자 24개월\", \"무료 배송\"]', 'image/gagu/home_detail4.jpg'),
(220, '포근한 분위기의 인테리어.', '[\"Small\", \"Medium\"]', '[\"Gray\", \"White\"]', '[\"무료 조립 서비스\", \"무료 배송\"]', 'image/gagu/home_detail1.jpg'),
(221, '어두운 공간을 밝히는 조명.', '[\"5000K\", \"6000K\"]', '[\"Black\", \"White\"]', '[\"카카오페이 할인\", \"무료 배송\"]', 'image/gagu/home_detail2.jpg'),
(222, '편안한 집 인테리어.', '[\"Small\", \"Medium\"]', '[\"Gray\", \"White\"]', '[\"무이자 12개월\", \"무료 조립 서비스\"]', 'image/gagu/home_detail3.jpg'),
(223, '실용적인 조명.', '[\"3000K\", \"5000K\"]', '[\"White\", \"Black\"]', '[\"무료 배송\", \"카카오페이 할인\"]', 'image/gagu/home_detail4.jpg'),
(224, '현대적인 집 인테리어.', '[\"Medium\", \"Large\"]', '[\"Gray\", \"Black\"]', '[\"무료 배송\", \"무료 조립 서비스\"]', 'image/gagu/home_detail1.jpg'),
(225, '빛의 색을 조절하는 조명.', '[\"3000K\", \"5000K\"]', '[\"White\", \"Gray\"]', '[\"카카오페이 할인\", \"무료 배송\"]', 'image/gagu/home_detail2.jpg'),
(301, '집중력을 올리는 사무실.', '[\"Standard\"]', '[\"Black\", \"White\"]', '[\"무이자 36개월\", \"무료 배송\"]', 'image/gagu/interior_detail1.jpg'),
(302, '아름다운 욕실과 주방.', '[\"Standard\"]', '[\"Black\", \"White\"]', '[\"무이자 24개월\", \"무료 조립 서비스\"]', 'image/gagu/interior_detail2.jpg'),
(303, '신혼부부를 위한 특별전.', '[\"Standard\"]', '[\"Gray\", \"White\"]', '[\"무이자 24개월\", \"무료 배송\"]', 'image/gagu/interior_detail3.jpg'),
(304, '생활을 바꾸는 이가구.', '[\"Standard\"]', '[\"Gray\", \"White\"]', '[\"무료 조립 서비스\"]', 'image/gagu/interior_detail4.jpg'),
(305, '아름다운 욕실과 주방.', '[\"Standard\"]', '[\"Black\", \"White\"]', '[\"무이자 24개월\", \"무료 조립 서비스\"]', 'image/gagu/interior_detail2.jpg'),
(306, '생활을 바꾸는 이가구.', '[\"Standard\"]', '[\"Gray\", \"White\"]', '[\"무료 조립 서비스\"]', 'image/gagu/interior_detail4.jpg'),
(307, '신혼부부를 위한 특별전.', '[\"Standard\"]', '[\"Gray\", \"White\"]', '[\"무이자 24개월\", \"무료 배송\"]', 'image/gagu/interior_detail3.jpg'),
(308, '집중력을 올리는 사무실.', '[\"Standard\"]', '[\"Black\", \"White\"]', '[\"무이자 36개월\", \"무료 배송\"]', 'image/gagu/interior_detail1.jpg'),
(309, '아름다운 욕실과 주방.', '[\"Standard\"]', '[\"Black\", \"White\"]', '[\"무이자 24개월\", \"무료 조립 서비스\"]', 'image/gagu/interior_detail2.jpg'),
(310, '생활을 바꾸는 이가구.', '[\"Standard\"]', '[\"Gray\", \"White\"]', '[\"무료 조립 서비스\"]', 'image/gagu/interior_detail4.jpg'),
(311, '신혼부부를 위한 특별전.', '[\"Standard\"]', '[\"Gray\", \"White\"]', '[\"무이자 24개월\", \"무료 배송\"]', 'image/gagu/interior_detail3.jpg'),
(312, '집중력을 올리는 사무실.', '[\"Standard\"]', '[\"Black\", \"White\"]', '[\"무이자 36개월\", \"무료 배송\"]', 'image/gagu/interior_detail1.jpg'),
(313, '생활을 바꾸는 이가구.', '[\"Standard\"]', '[\"Gray\", \"White\"]', '[\"무료 조립 서비스\"]', 'image/gagu/interior_detail4.jpg'),
(314, '신혼부부를 위한 특별전.', '[\"Standard\"]', '[\"Black\", \"White\"]', '[\"무이자 24개월\", \"무료 조립 서비스\"]', 'image/gagu/interior_detail3.jpg'),
(315, '아름다운 욕실과 주방.', '[\"Standard\"]', '[\"Black\", \"White\"]', '[\"무료 조립 서비스\"]', 'image/gagu/interior_detail2.jpg'),
(316, '생활을 바꾸는 이가구.', '[\"Standard\"]', '[\"Gray\", \"White\"]', '[\"무이자 24개월\", \"무료 배송\"]', 'image/gagu/interior_detail4.jpg'),
(317, '집중력을 올리는 사무실.', '[\"Standard\"]', '[\"Black\", \"White\"]', '[\"무이자 36개월\", \"무료 배송\"]', 'image/gagu/interior_detail1.jpg'),
(318, '아름다운 욕실과 주방.', '[\"Standard\"]', '[\"Black\", \"White\"]', '[\"무이자 24개월\", \"무료 조립 서비스\"]', 'image/gagu/interior_detail2.jpg'),
(319, '생활을 바꾸는 이가구.', '[\"Standard\"]', '[\"Gray\", \"White\"]', '[\"무료 조립 서비스\"]', 'image/gagu/interior_detail4.jpg'),
(320, '신혼부부를 위한 특별전.', '[\"Standard\"]', '[\"Gray\", \"White\"]', '[\"무이자 24개월\", \"무료 배송\"]', 'image/gagu/interior_detail3.jpg'),
(321, '집중력을 올리는 사무실.', '[\"Standard\"]', '[\"Black\", \"White\"]', '[\"무이자 36개월\", \"무료 배송\"]', 'image/gagu/interior_detail1.jpg'),
(322, '생활을 바꾸는 이가구.', '[\"Standard\"]', '[\"Gray\", \"White\"]', '[\"무료 조립 서비스\"]', 'image/gagu/interior_detail4.jpg'),
(344, '30', '[\"Standard\",\"Queen\",\"King\"]', '[\"White\",\"Black\"]', '[\"\\ubb34\\uc774\\uc790 12\\uac1c\\uc6d4\",\"\\ubb34\\ub8cc \\ubc30\\uc1a1\",\"\\ubb34\\ub8cc \\uc870\\ub9bd \\uc11c\\ube44\\uc2a4\"]', 'image/gagu/bathitem_detail3.jpg'),
(345, '11', '[\"Small\",\"Medium\"]', '[\"Red\",\"Blue\"]', '[\"무이자 12개월\",\"우리카드 할인\"]', 'image/gagu/home_detail1.jpg'),
(347, '0022', '[\"Standard\",\"Queen\",\"King\"]', '[\"Gray\",\"White\",\"Black\"]', '[\"\\ubb34\\uc774\\uc790 12\\uac1c\\uc6d4\",\"\\ubb34\\ub8cc \\ubc30\\uc1a1\",\"\\ubb34\\ub8cc \\uc870\\ub9bd \\uc11c\\ube44\\uc2a4\"]', 'image/gagu/gagu_detail3.jpg'),
(348, '독특한 디자인, 따뜻한 색상의 다이닝가구입니다.', '[\"Standard\"]', '[\"White\"]', '[\"무이자 12개월\",\"카카오페이 할인\",\"우리카드 할인\"]', 'image/gagu/gagu_detail3.jpg');

-- --------------------------------------------------------

--
-- 테이블 구조 `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `address` text DEFAULT NULL,
  `receive_info` tinyint(1) DEFAULT 0,
  `receive_events` tinyint(1) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `grade` enum('BRONZE','SILVER','GOID','DIAMON','VIP') DEFAULT 'BRONZE'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- 테이블의 덤프 데이터 `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `name`, `email`, `phone`, `address`, `receive_info`, `receive_events`, `created_at`, `grade`) VALUES
(14, 'bibi12', '$2y$10$8zdzRSPcEEWOE./aSdMNVOZhwiemhSYlI9DNm.8CpAVK38evBp2X6', '김강현', 'gang11@naver.com', '01041413232', '경기도 성남시 분당구 정자동', 0, 0, '2024-12-22 01:26:39', 'BRONZE'),
(16, 'admin', '$2y$10$hE/HXd88LLj5ILicjc4eTOUogxEBW7Fwo/YbQA53lkE99298jDu3K', '관리자', 'admin1@naver.com', '01011111111', '관리자', 0, 0, '2024-12-22 01:37:17', 'VIP');

--
-- 덤프된 테이블의 인덱스
--

--
-- 테이블의 인덱스 `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_id` (`product_id`);

--
-- 테이블의 인덱스 `inquiries`
--
ALTER TABLE `inquiries`
  ADD PRIMARY KEY (`id`);

--
-- 테이블의 인덱스 `notices`
--
ALTER TABLE `notices`
  ADD PRIMARY KEY (`id`);

--
-- 테이블의 인덱스 `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`);

--
-- 테이블의 인덱스 `popular_searches`
--
ALTER TABLE `popular_searches`
  ADD PRIMARY KEY (`id`);

--
-- 테이블의 인덱스 `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- 테이블의 인덱스 `product_details`
--
ALTER TABLE `product_details`
  ADD PRIMARY KEY (`product_id`);

--
-- 테이블의 인덱스 `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- 덤프된 테이블의 AUTO_INCREMENT
--

--
-- 테이블의 AUTO_INCREMENT `cart`
--
ALTER TABLE `cart`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;

--
-- 테이블의 AUTO_INCREMENT `inquiries`
--
ALTER TABLE `inquiries`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- 테이블의 AUTO_INCREMENT `notices`
--
ALTER TABLE `notices`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- 테이블의 AUTO_INCREMENT `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- 테이블의 AUTO_INCREMENT `popular_searches`
--
ALTER TABLE `popular_searches`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- 테이블의 AUTO_INCREMENT `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=349;

--
-- 테이블의 AUTO_INCREMENT `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- 덤프된 테이블의 제약사항
--

--
-- 테이블의 제약사항 `cart`
--
ALTER TABLE `cart`
  ADD CONSTRAINT `cart_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
