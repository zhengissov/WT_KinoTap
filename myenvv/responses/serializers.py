from rest_framework import serializers
from .models import Movie, Cast, News


class MovieSerializer(serializers.ModelSerializer):
  
  class Meta:
    model = Movie
    fields = "__all__"

class CastSerializer(serializers.ModelSerializer):
  
  class Meta:
    model = Cast
    fields = "__all__"

class NewsSerializer(serializers.ModelSerializer):
  
  class Meta:
    model = News
    fields = "__all__"

