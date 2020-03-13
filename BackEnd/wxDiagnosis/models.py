# -*- coding: utf-8 -*-
from django.db import models


class WxdiagnosisPerson(models.Model):
    name = models.CharField(max_length=30)
    age = models.IntegerField()

    class Meta:
        managed = False
        db_table = 'wxdiagnosis_person'

