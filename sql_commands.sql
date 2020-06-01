-- ****************** HMS: MySQL ******************;
-- ***************************************************;


DROP SCHEMA IF EXISTS `hms_proj`;

CREATE SCHEMA `hms_proj`;

-- ************************************** `hms_proj`.`coupons`

CREATE TABLE `hms_proj`.`coupons`
(
 `id`              int(11) NOT NULL AUTO_INCREMENT ,
 `discountpercent` int(2) NOT NULL ,
 `validity`        date NOT NULL ,

PRIMARY KEY (`id`)
) AUTO_INCREMENT=1000;

-- ************************************** `hms_proj`.`servicetype`

CREATE TABLE `hms_proj`.`servicetype`
(
 `id`   int(11) NOT NULL AUTO_INCREMENT ,
 `name` varchar(45) NOT NULL ,

PRIMARY KEY (`id`)
);

-- ************************************** `hms_proj`.`customer`

CREATE TABLE `hms_proj`.`customer`
(
 `id`        varchar(45) NOT NULL ,
 `phone_ext` int(4) NOT NULL ,
 `phone`     int(10) NOT NULL ,
 `fname`     varchar(45) NOT NULL ,
 `lname`     varchar(45) NULL ,
 `email`     varchar(45) NOT NULL ,
 `idproof`   varchar(45) NOT NULL ,
 `address`   varchar(90) NOT NULL ,

PRIMARY KEY (`id`)
);

-- ************************************** `hms_proj`.`roomtypes`

CREATE TABLE `hms_proj`.`roomtypes`
(
 `id`    int(11) NOT NULL AUTO_INCREMENT ,
 `name`  varchar(45) NOT NULL ,
 `price` int(6) NOT NULL ,

PRIMARY KEY (`id`)
);

-- ************************************** `hms_proj`.`rooms`

CREATE TABLE `hms_proj`.`rooms`
(
 `id`       int(11) NOT NULL AUTO_INCREMENT ,
 `type_id`  int(11) NOT NULL ,
 `name`     varchar(45) NOT NULL ,
 `booked`   boolean NOT NULL DEFAULT FALSE ,
 `disabled` boolean NOT NULL DEFAULT FALSE ,
 `floor`    int(3) NOT NULL ,

PRIMARY KEY (`id`),
KEY `fkIdx_44` (`type_id`),
CONSTRAINT `FK_44` FOREIGN KEY `fkIdx_44` (`type_id`) REFERENCES `hms_proj`.`roomtypes` (`id`)
);

-- ************************************** `hms_proj`.`bookings`

CREATE TABLE `hms_proj`.`bookings`
(
 `id`          int(11) NOT NULL AUTO_INCREMENT ,
 `cust_id`     varchar(45) NOT NULL ,
 `room_id`     int(11) NOT NULL ,
 `startdate`   datetime NOT NULL ,
 `enddate`     datetime NOT NULL ,
 `coupon_id`   int(11) NULL ,
 `numguests`   int(2) NOT NULL ,
 `paid`        boolean NOT NULL DEFAULT FALSE ,
 `cancelled`   boolean NOT NULL DEFAULT FALSE ,
 `bookingdate` datetime NOT NULL ,

PRIMARY KEY (`id`),
KEY `fkIdx_120` (`coupon_id`),
CONSTRAINT `FK_120` FOREIGN KEY `fkIdx_120` (`coupon_id`) REFERENCES `hms_proj`.`coupons` (`id`),
KEY `fkIdx_21` (`cust_id`),
CONSTRAINT `FK_21` FOREIGN KEY `fkIdx_21` (`cust_id`) REFERENCES `hms_proj`.`customer` (`id`),
KEY `fkIdx_48` (`room_id`),
CONSTRAINT `FK_48` FOREIGN KEY `fkIdx_48` (`room_id`) REFERENCES `hms_proj`.`rooms` (`id`)
) AUTO_INCREMENT=202000;

-- ************************************** `hms_proj`.`paymentinfo`

CREATE TABLE `hms_proj`.`paymentinfo`
(
 `id`      int(11) NOT NULL AUTO_INCREMENT ,
 `cust_id` varchar(45) NOT NULL ,
 `number`  int(16) NOT NULL ,
 `expiry`  date NOT NULL ,

PRIMARY KEY (`id`),
KEY `fkIdx_15` (`cust_id`),
CONSTRAINT `FK_15` FOREIGN KEY `fkIdx_15` (`cust_id`) REFERENCES `hms_proj`.`customer` (`id`)
);

-- ************************************** `hms_proj`.`bills`

CREATE TABLE `hms_proj`.`bills`
(
 `id`               int(11) NOT NULL AUTO_INCREMENT ,
 `booking_id`       int(11) NOT NULL ,
 `payment_id`       int(11) NOT NULL ,
 `amount`           double NOT NULL ,
 `pdf_download_url` varchar(45) NOT NULL ,

PRIMARY KEY (`id`),
KEY `fkIdx_81` (`booking_id`),
CONSTRAINT `FK_81` FOREIGN KEY `fkIdx_81` (`booking_id`) REFERENCES `hms_proj`.`bookings` (`id`),
KEY `fkIdx_84` (`payment_id`),
CONSTRAINT `FK_84` FOREIGN KEY `fkIdx_84` (`payment_id`) REFERENCES `hms_proj`.`paymentinfo` (`id`)
) AUTO_INCREMENT=1000;

-- ************************************** `hms_proj`.`employee`

CREATE TABLE `hms_proj`.`employee`
(
 `id`          int(11) NOT NULL AUTO_INCREMENT ,
 `fname`       varchar(45) NOT NULL ,
 `lname`       varchar(45) NOT NULL ,
 `designation` varchar(45) NOT NULL ,
 `service_id`  int(11) NOT NULL ,
 `phone`       int(10) NOT NULL ,

PRIMARY KEY (`id`),
KEY `fkIdx_95` (`service_id`),
CONSTRAINT `FK_95` FOREIGN KEY `fkIdx_95` (`service_id`) REFERENCES `hms_proj`.`servicetype` (`id`)
) AUTO_INCREMENT=1000;

-- ************************************** `hms_proj`.`guest`

CREATE TABLE `hms_proj`.`guest`
(
 `id`         int(11) NOT NULL AUTO_INCREMENT ,
 `booking_id` int(11) NOT NULL ,
 `name`       varchar(45) NOT NULL ,
 `idproof`    varchar(45) NOT NULL ,

PRIMARY KEY (`id`),
KEY `fkIdx_57` (`booking_id`),
CONSTRAINT `FK_57` FOREIGN KEY `fkIdx_57` (`booking_id`) REFERENCES `hms_proj`.`bookings` (`id`)
);

-- ************************************** `hms_proj`.`roomportalusers`

CREATE TABLE `hms_proj`.`roomportalusers`
(
 `id`         int(11) NOT NULL AUTO_INCREMENT ,
 `booking_id` int(11) NOT NULL ,
 `username`   varchar(45) NOT NULL ,
 `password`   varchar(45) NOT NULL ,

PRIMARY KEY (`id`),
KEY `fkIdx_128` (`booking_id`),
CONSTRAINT `FK_128` FOREIGN KEY `fkIdx_128` (`booking_id`) REFERENCES `hms_proj`.`bookings` (`id`)
);

-- ************************************** `hms_proj`.`servicerequests`

CREATE TABLE `hms_proj`.`servicerequests`
(
 `id`             int(11) NOT NULL AUTO_INCREMENT ,
 `booking_id`     int(11) NOT NULL ,
 `servicetype_id` int(11) NOT NULL ,
 `assigned_to`    int(11) NULL ,
 `description`    varchar(400) NOT NULL ,
 `preferredtime`  datetime NOT NULL ,

PRIMARY KEY (`id`),
KEY `fkIdx_103` (`booking_id`),
CONSTRAINT `FK_103` FOREIGN KEY `fkIdx_103` (`booking_id`) REFERENCES `hms_proj`.`bookings` (`id`),
KEY `fkIdx_106` (`servicetype_id`),
CONSTRAINT `FK_106` FOREIGN KEY `fkIdx_106` (`servicetype_id`) REFERENCES `hms_proj`.`servicetype` (`id`),
KEY `fkIdx_110` (`assigned_to`),
CONSTRAINT `FK_110` FOREIGN KEY `fkIdx_110` (`assigned_to`) REFERENCES `hms_proj`.`employee` (`id`)
);










