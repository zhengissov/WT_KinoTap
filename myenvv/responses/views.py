from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt

from rest_framework.parsers import JSONParser

from .models import Movie, Cast, MovieCast, News, UserMovies
from .serializers import MovieSerializer, CastSerializer, NewsSerializer, UserMoviesSerializer
from django.views.decorators.csrf import csrf_protect
from django.contrib.auth.models import User
from django.contrib.auth import *
from django.contrib.auth.forms import UserCreationForm

# Create your views here.

@csrf_exempt
def movie(request):
	if request.method == "GET":
	    movie = Movie.objects.all()
	    ser = MovieSerializer(movie, many=True)
	    return JsonResponse(ser.data, safe=False)

def cast(request):
	if request.method == "GET":
	    cast = Cast.objects.all()
	    ser = CastSerializer(cast, many=True)
	    return JsonResponse(ser.data, safe=False)

@csrf_exempt
def movie_detail(request, movie_id):
  try:
    movieDetails = Movie.objects.get(pk=movie_id)
  except Exception as e:
    return JsonResponse({"error": str(e)}, status=404)

  print(request.user)
  if request.method == "GET":
    ser = MovieSerializer(movieDetails)
    return JsonResponse(ser.data)

@csrf_exempt
def cast_detail(request, cast_id):
  try:
    castDetails = Cast.objects.get(pk=cast_id)
  except Exception as e:
    return JsonResponse({"error": str(e)}, status=404)

  if request.method == "GET":
    ser = CastSerializer(castDetails)
    return JsonResponse(ser.data)

@csrf_exempt
def movieCast_detail(request, cast_id):
  try:
    movieIds = MovieCast.objects.filter(cast_id=cast_id)
  except Exception as e:
    return JsonResponse({"error": str(e)}, status=404)
  array = (movieIds.values_list('movie_id', flat=True))
  movieCastDetails = Movie.objects.filter(id__in=array)
  if request.method == "GET":
    ser = MovieSerializer(movieCastDetails, many=True)
    return JsonResponse(ser.data, safe=False)

@csrf_exempt
def castMovie_detail(request, movie_id):
  try:
    castIds = MovieCast.objects.filter(movie_id=movie_id)
  except Exception as e:
    return JsonResponse({"error": str(e)}, status=404)

  array = (castIds.values_list('cast_id', flat=True))
  movieCastDetails = Cast.objects.filter(id__in=array)
  if request.method == "GET":
    ser = CastSerializer(movieCastDetails, many=True)
    return JsonResponse(ser.data, safe=False)

@csrf_exempt
def news(request):
  if request.method == "GET":
      news = News.objects.all()
      ser = NewsSerializer(news, many=True)
      return JsonResponse(ser.data, safe=False)

@csrf_exempt
def news_detail(request, news_id):
  try:
    newsDetails = News.objects.get(pk=news_id)
  except Exception as e:
    return JsonResponse({"error": str(e)}, status=404)

  if request.method == "GET":
    ser = NewsSerializer(newsDetails)
    return JsonResponse(ser.data)

@csrf_exempt
def user_login(request):
    if request.POST:
        username = password = ''
        username = request.POST.get('username')
        password = request.POST.get('password')
        user = authenticate(username=username, password=password)
        print (user)
        if user is not None and user.is_active:
            print("User Login:  Username:" + username + '    Password:' + password)
            login(request, user)
            return JsonResponse({'output' : request.user.username})
        else:
            return JsonResponse({'output' : "Username or Password wrong!"})
    else:
        return JsonResponse({'output' : "404.html"})


@csrf_exempt
def user_register(request):
    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        print (form)
        if form.is_valid():
            new_user = form.save()
            login(request, new_user)
            return HttpResponse('success')
        else:
            return JsonResponse({'output' : "Username or Password wrong!"})
    else:
        return JsonResponse({'output' : "404.html"})

@csrf_exempt
def user_detail(request):
  return JsonResponse({'user_detail' : request.user.username})

@csrf_exempt
def user_movies(request, user_id):
  try:
    movieIds = UserMovies.objects.filter(user_id=user_id)
  except Exception as e:
    return JsonResponse({"error": str(e)}, status=404)

  array = (movieIds.values_list('movieid', flat=True))
  UserMoviesList = Movie.objects.filter(id__in=array)
  if request.method == "GET":
    ser = MovieSerializer(UserMoviesList, many=True)
    return JsonResponse(ser.data, safe=False)
 
@csrf_exempt
def movie_add(request):
    if request.method == 'POST':
      data = request.POST
      print (data)
      ser = UserMoviesSerializer(data=data)
      if ser.is_valid():
        ser.save()
        return JsonResponse(ser.data, status=201)
      return JsonResponse(ser.errors, status=400)
