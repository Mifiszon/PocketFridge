from background_task import background
from .utils import send_expiry_reminder_email
from django.http import HttpResponse

#zadanie zdefniowane do wykonywania w tle po 60 sekundach
@background(schedule=60)
def daily_expiry_check():
    send_expiry_reminder_email()