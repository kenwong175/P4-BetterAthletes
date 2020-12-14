from django.urls import path
from . import views
from rest_framework_simplejwt.views import (
    TokenRefreshView,
    TokenVerifyView
)

urlpatterns = [
    path('workouts', views.Workouts.as_view(), name="workouts"),
    path('clubs', views.Clubs.as_view(), name="clubs"),
    path('', views.not_found, name='not_found'),
    path('login', views.Login.as_view(), name='login'),
    path('token/refresh', TokenRefreshView.as_view(), name='token_refresh'),
    path('signup', views.UserCreate.as_view(), name='signup'),
    path('token/verify', TokenVerifyView.as_view(), name='token_verify'),
    # path('logout/', api_views.logout, name='logout'),
    # features
    path('testing/', views.dashboard, name='test'),
    # about
    path('profile/<int:id>', views.profile, name='profile'),
    path('club', views.single_club, name='club'),
]
