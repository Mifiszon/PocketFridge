from background_task import background
from .utils import send_expiry_reminder_email
from django.http import HttpResponse

@background(schedule=60)
def daily_expiry_check():
    send_expiry_reminder_email()

def some_view(request):
    # Uruchomienie zadania w tle natychmiastowo
    daily_expiry_check(schedule=60)  # lub zamiast schedule=60: daily_expiry_check.run_soon()
    return HttpResponse("Zadanie zostało zaplanowane!")