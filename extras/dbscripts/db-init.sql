--DROP DATABASE IF EXISTS "demo_task_manager";
--CREATE DATABASE "demo_task_manager";


DROP TABLE IF EXISTS "user" CASCADE;
CREATE TABLE "user" (
	"id" SERIAL PRIMARY KEY,
	"user_name" VARCHAR(150) NOT NULL DEFAULT '',
	"user_email" VARCHAR(150) NOT NULL DEFAULT '',
	"user_role" CHAR(10) NOT NULL DEFAULT 'user'
);

DROP TABLE IF EXISTS "task" CASCADE;
CREATE TABLE "task" (
	"id" SERIAL PRIMARY KEY,
	"task_id" VARCHAR(50) NOT NULL DEFAULT '0',
	"parent_id" INTEGER NULL DEFAULT NULL,
	"summary" VARCHAR(100) NOT NULL DEFAULT 'Un-Initialized',
	"description" TEXT NULL DEFAULT 'Un-Initialized',
	"status" VARCHAR(10) NOT NULL DEFAULT 'open',
	"created_by" INTEGER NOT NULL,
	"assignee" INTEGER NOT NULL,
	"comment" JSON NULL DEFAULT NULL,
	"due_date" DATE NULL DEFAULT NULL,
	"createdAt" TIMESTAMP NOT NULL,
	"updatedAt" TIMESTAMP NOT NULL,
	CONSTRAINT "FK__assignee" FOREIGN KEY ("assignee") REFERENCES "user" ("id"),
	CONSTRAINT "FK__created_by" FOREIGN KEY ("created_by") REFERENCES "user" ("id")
);

DROP TABLE IF EXISTS "comment";
CREATE TABLE "comment" (
	"id" SERIAL PRIMARY KEY,
	"task_id" INTEGER NOT NULL DEFAULT 0,
	"user_id" INTEGER NOT NULL DEFAULT '0',
	"content" TEXT NOT NULL DEFAULT '0',
	"createdAt" TIMESTAMP NOT NULL,
	"updatedAt" TIMESTAMP NOT NULL,
	CONSTRAINT "FK__taskid" FOREIGN KEY ("task_id") REFERENCES "task" ("id"),
	CONSTRAINT "FK__user" FOREIGN KEY ("user_id") REFERENCES "user" ("id")
);

DROP TABLE IF EXISTS "session";
CREATE TABLE "session" (
	"id" SERIAL PRIMARY KEY,
	"user_id" INTEGER NOT NULL,
	"gauth_token" TEXT NOT NULL DEFAULT '',
	"jwt_token" TEXT NOT NULL DEFAULT '',
	"createdAt" TIMESTAMP NOT NULL,
	"updatedAt" TIMESTAMP NOT NULL,
	CONSTRAINT "FK__session_user" FOREIGN KEY ("user_id") REFERENCES "user" ("id")
);

ALTER TABLE "user"
RENAME TO "users";