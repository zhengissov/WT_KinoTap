from django.db import models

# Create your models here.

class Movie(models.Model):
	title = models.CharField(max_length=100)
	original_title = models.CharField(max_length=100)
	poster_path = models.CharField(max_length=200)
	release_date = models.CharField(max_length=200)
	rating = models.FloatField()
	overview = models.CharField(max_length=600)
	runtime = models.IntegerField()
	director = models.CharField(max_length=100)
	budget = models.IntegerField(default=0)
	revenue = models.IntegerField(default=0)

class Cast(models.Model):
	name = models.CharField(max_length=100)
	profile_path = models.CharField(max_length=200)
	job = models.CharField(max_length=200, default="Актер")
	gender = models.CharField(max_length=200, default="Еркек")
	birth_date = models.CharField(max_length=200, default="1989-11-11")
	birth_place = models.CharField(max_length=200, default="АҚШ")

class MovieCast(models.Model):
	movie_id = models.IntegerField(default=0)
	cast_id = models.IntegerField(default=0)

class News(models.Model):
	title = models.CharField(max_length=200)
	concept = models.CharField(max_length=200)
	poster_path = models.CharField(max_length=200)
	release_date = models.CharField(max_length=200)
	overview = models.CharField(max_length=2000)
	viewCnt = models.IntegerField(default=0)

class Seen(models.Model):
    username = models.CharField(max_length=150)
    movieid = models.ForeignKey('Movie', default=1, on_delete=models.CASCADE)