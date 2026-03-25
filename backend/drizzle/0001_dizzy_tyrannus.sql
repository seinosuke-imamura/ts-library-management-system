PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_rentals` (
	`id` text PRIMARY KEY NOT NULL,
	`userId` text NOT NULL,
	`bookId` text NOT NULL,
	`rentedDate` integer NOT NULL,
	`dueDate` integer NOT NULL,
	`returnDate` integer
);
--> statement-breakpoint
INSERT INTO `__new_rentals`("id", "userId", "bookId", "rentedDate", "dueDate", "returnDate") SELECT "id", "userId", "bookId", "rentedDate", "dueDate", "returnDate" FROM `rentals`;--> statement-breakpoint
DROP TABLE `rentals`;--> statement-breakpoint
ALTER TABLE `__new_rentals` RENAME TO `rentals`;--> statement-breakpoint
PRAGMA foreign_keys=ON;