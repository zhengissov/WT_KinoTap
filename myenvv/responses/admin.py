from django.contrib import admin

from .models import Movie, Cast, MovieCast, News, UserMovies

admin.site.register(Movie)
admin.site.register(Cast)
admin.site.register(MovieCast)
admin.site.register(News)
admin.site.register(UserMovies)
# Reg	ister your models here.
