CREATE TABLE "mockInterview" (
	"id" serial PRIMARY KEY NOT NULL,
	"jobPosition" text,
	"jobDesc" text,
	"jobExperience" varchar(50),
	"jsonMockResp" text,
	"mockId" varchar(255),
	"createdAt" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "userAnswer" (
	"id" serial PRIMARY KEY NOT NULL,
	"mockId" text,
	"question" text,
	"correctAnswer" text,
	"userAnswer" text,
	"confidence" integer,
	"mlScore" integer,
	"feedback" text,
	"createdAt" timestamp DEFAULT now()
);
