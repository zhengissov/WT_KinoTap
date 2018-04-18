from django.urls import path
from . import views

urlpatterns = [
    path('movie/', views.movie),
    path('cast/<int:cast_id>/', views.cast_detail),
    path('movie/<int:movie_id>/', views.movie_detail),
    path('movie/cast/<int:cast_id>/', views.movieCast_detail),
    path('cast/movie/<int:movie_id>/', views.castMovie_detail),
    path('news/', views.news),
    path('news/<int:news_id>/', views.news_detail),
    path('auth/login/', views.user_login),
    path('auth/join/', views.user_register),
    path('user_detail/', views.user_detail),
]