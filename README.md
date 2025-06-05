# 🧊 Pocket Fridge

**Pocket Fridge** is a web application designed to **track food expiration dates** and **raise awareness about food waste**. With a modern interface and reminder features, the app helps users manage their household supplies more consciously.

## 🧩 Feature

- ✅ User registration and login with JWT authentication
- 📋 Product list with expiration date, category, quantity, and open status
- 📬 Email and desktop notifications for upcoming expirations
- 📈 Waste statistics displayed on the user profile
- 💡 Daily tips to reduce food waste
- 📷 Product addition using FormData (supporting file uploads)
- 🔐 Auth system using `AuthContext`
- 🌐 HTTP requests handled with `useAxios` (auto token injection)

## 🛠️ Technologies Used

- **Frontend:** React + Context API
- **Backend:** Django REST Framework
- **Database:** PostgreSQL
- **Styling:** CSS / Bootstrap / Custom styles
- **Others:** JWT, Axios, FormData

## 📦 Local Setup

### Backend (Django)

```bash
cd backend
python manage.py migrate
python manage.py runserver

cd frontend
npm install
npm start
```

## Future Plans
- Mobile app (Android/iOS)
- User profile customization (avatar, display name)
- Product scanning via barcode or image recognition
- Recipe suggestions based on near-expiring products
- Integration with tools like Google Calendar for expiration reminders

## Author
Michał Ogiba - 2025

Bechelor Degree Project
