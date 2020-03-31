# -*- coding: utf-8 -*-
from django.db import models


class WxdiagnosisPerson(models.Model):
    name = models.CharField(max_length=30)
    age = models.IntegerField()

    class Meta:
        managed = False
        db_table = 'wxdiagnosis_person'


class User(models.Model):
    username = models.CharField(max_length=20, blank=True, null=True)
    password = models.CharField(max_length=20, blank=True, null=True)
    openid = models.CharField(max_length=40, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'user'

class PatientBasicinfo(models.Model):
    userid = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=20)
    careid = models.CharField(max_length=20)
    idcard = models.CharField(db_column='IDcard', max_length=20)  # Field name made lowercase.
    birthday = models.DateField()
    gender = models.CharField(max_length=1)
    age = models.IntegerField()
    nation = models.CharField(max_length=20)
    tel = models.CharField(max_length=20)
    emername = models.CharField(db_column='emerName', max_length=20)  # Field name made lowercase.
    emertel = models.CharField(db_column='emerTel', max_length=20)  # Field name made lowercase.
    familydisease = models.CharField(db_column='familyDisease', max_length=1)  # Field name made lowercase.
    marriage = models.CharField(max_length=1)
    region = models.CharField(max_length=100)
    address = models.CharField(max_length=255)

    class Meta:
        managed = False
        db_table = 'patient_basicinfo'
