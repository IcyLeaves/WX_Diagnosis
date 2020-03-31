from rest_framework import serializers

from wxDiagnosis.models import User
from wxDiagnosis.models import PatientBasicinfo


class UserSerializer(serializers.ModelSerializer):
    # ModelSerializer和Django中ModelForm功能相似
    # Serializer和Django中Form功能相似
    class Meta:
        model = User
        # 和"__all__"等价
        fields = ('id', 'username', 'password', 'openid')


class PatientInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = PatientBasicinfo
        fields = ('userid', 'name', 'careid', 'idcard', 'birthday', 'gender', 'age', 'nation', 'tel', 'emername',
                  'emertel', 'familydisease', 'marriage', 'region', 'address')
