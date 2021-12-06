CREATE TABLE "songs" (
	"song_id" serial NOT NULL,
	"song_name" TEXT NOT NULL,
	"song_url" TEXT NOT NULL,
	"rating" integer NOT NULL,
	CONSTRAINT "songs_pk" PRIMARY KEY ("song_id")
);





