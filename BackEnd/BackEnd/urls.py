"""BackEnd URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.conf.urls import url
from django.contrib import admin
from django.urls import path
from wxDiagnosis import views as wx_views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('login/', wx_views.login),
    path('getOpenId/', wx_views.get_openid),
    path('updatePatientInfo/', wx_views.patient_info_update),
    path('getPatientInfo/<user_id>/', wx_views.patient_info_get)
]
