from django.core.mail import send_mail
from django.conf import settings
from datetime import timedelta
from django.utils import timezone
from .models import Product

def send_expiry_reminder_email():
    now = timezone.now()
    today = now.date()
    in_three_days = today + timedelta(days=3)

    products = Product.objects.filter(
        expirationDate__date__gte=today,
        expirationDate__date__lte=in_three_days
    )

    users_products = {}

    for product in products:
        days_left = (product.expirationDate.date() - today).days

        if product.user not in users_products:
            users_products[product.user] = []

        users_products[product.user].append(f"{product.name} - {days_left} days till expire")

    for user, product_list in users_products.items():
        subject = "Reminder of expiring products"
        message = "Here is the list of products that are about to expire in the next days:\n\n"
        message += "\n".join(product_list)
        from_email = settings.EMAIL_HOST_USER
        recipient_list = [user.email]

        send_mail(subject, message, from_email, recipient_list)


def send_test_email():
    subject = 'Test'
    message = 'Test'
    from_email = settings.EMAIL_HOST_USER
    recipient_list = ['mifiszon@gmail.com']

    send_mail(subject, message, from_email, recipient_list)
