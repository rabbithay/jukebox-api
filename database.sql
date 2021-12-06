CREATE TABLE "songs" (
	"song_id" serial NOT NULL,
	"song_name" TEXT NOT NULL,
	"song_url" TEXT NOT NULL,
	"song_score" integer NOT NULL,
	CONSTRAINT "songs_pk" PRIMARY KEY ("song_id")
);

CREATE TABLE "genres" (
	"genre_id" serial NOT NULL,
	"genre_name" TEXT NOT NULL,
	CONSTRAINT "genres_pk" PRIMARY KEY ("genre_id")
);

CREATE TABLE "songs_genres" (
	"song_genre_id" serial NOT NULL,
	"song_id" integer NOT NULL,
	"genre_id" integer NOT NULL,
	CONSTRAINT "songs_genres_pk" PRIMARY KEY ("song_genre_id")
);

ALTER TABLE "songs_genres" ADD CONSTRAINT "songs_genres_fk0" FOREIGN KEY ("song_id") REFERENCES "songs"("song_id");
ALTER TABLE "songs_genres" ADD CONSTRAINT "songs_genres_fk1" FOREIGN KEY ("genre_id") REFERENCES "genres"("genre_id");




