from rest_framework import serializers

from wxDiagnosis.models import WxdiagnosisPerson


class PersonSerializer(serializers.ModelSerializer):
    # ModelSerializer和Django中ModelForm功能相似
    # Serializer和Django中Form功能相似
    class Meta:
        model = WxdiagnosisPerson
        # 和"__all__"等价
        fields = ('id', 'name', 'age')