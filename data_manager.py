from typing import List, Dict

from psycopg2 import sql
from psycopg2.extras import RealDictCursor
import random
import database_common
import time


@database_common.connection_handler
def register_user(cursor:  RealDictCursor,submission_time, email_user, password_user) -> list:
    if email_exist(email_user):
        return False
    query="""
    INSERT INTO users(submission_time, email_user, password_user,count_questions,count_answers,count_comments,reputation)  VALUES (%(submission_time)s,%(email_user)s,%(password_user)s,0,0,0,0);
    """
    data={'submission_time':submission_time,'email_user':email_user,'password_user':password_user}
    cursor.execute(query,data)

@database_common.connection_handler
def check_login_user(cursor:  RealDictCursor, email_user, password_user) -> list:
    query="""
        SELECT email_user
        FROM users
        WHERE email_user=%(email_user)s AND password_user=%(password_user)s;
    """
    data={'email_user':email_user,'password_user':password_user }
    cursor.execute(query,data)
    return cursor.fetchone()

