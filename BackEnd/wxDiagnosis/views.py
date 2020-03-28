import json

from django.http import HttpResponse, JsonResponse
from django.shortcuts import render

# Create your views here.
import requests
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from wxDiagnosis.models import User
from wxDiagnosis.serializers import UserSerializer


def index(request):
    return HttpResponse(u"你好")


# def create(request):
#     # 新建一个对象的方法有以下几种：
#     Person.objects.create(name='xiaoli', age=18)
#     # p = Person(name="WZ", age=23)
#     # p = Person(name="TWZ")
#     # p.age = 23
#     # p.save()
#     # 这种方法是防止重复很好的方法，但是速度要相对慢些，返回一个元组，第一个为Person对象，
#     # 第二个为True或False, 新建时返回的是True, 已经存在时返回False
#     # Person.objects.get_or_create(name="WZT", age=23)
#     s = Person.objects.get(name='xiaoli')
#     return HttpResponse(str(s))


# @api_view(['GET', 'POST'])
# def getlist(request, format=None):
#     if request.method == 'GET':
#         persons = Person.objects.all()
#         serializer = PersonSerializer(persons, many=True)
#         return Response(serializer.data)
#
#     elif request.method == 'POST':
#         serializer = PersonSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def login(request, format=None):
    usr = request.data.get('username')
    pwd = request.data.get('password')
    openid = request.data.get('openid')
    obj = None
    # 微信授权登录
    if openid:
        User.objects.get_or_create(openid=openid)
        obj = User.objects.get(openid=openid)

        # serializer=UserSerializer(data=request.data)
        # if serializer.is_valid():
        #     serializer.save()
        #     return Response(serializer.data,status=status.HTTP_200_OK)
    # 用户名登陆
    else:
        obj = User.objects.filter(username=usr, password=pwd).first()
    if obj:
        return Response(data={'msg': 'success', 'userid': obj.pk}, status=status.HTTP_200_OK)
    return Response(data={'msg': 'failed'})


@api_view(['POST'])
def sign_up(request, format=None):
    usr = request.data.get('username')
    pwd = request.data.get('password')
    obj = User.objects.filter(username=usr).first()
    if obj:
        return Response(data={'msg': 'rename'})
    User.objects.create(username=usr, password=pwd)
    return Response(data={'msg': 'signed'}, status=status.HTTP_200_OK)


@api_view(['POST'])
def get_openid(request, format=None):
    code = request.POST.get('code')
    print(code)
    url = "https://api.weixin.qq.com/sns/jscode2session?appid=wx0c12e472ccbcc246&" \
          "secret=5295bccf15482c1798e82b5a4c3a7f48&js_code=%s&" \
          "grant_type=authorization_code" % code
    result = requests.get(url).content.decode("utf-8")
    print(result)
    result = json.loads(result)['openid']
    # print(data)
    return Response(data={'openid': result}, status=status.HTTP_200_OK)
