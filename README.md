# 🏙️ City Pulse – Smart City News & Alerts

![Expo](https://img.shields.io/badge/Expo-000020?style=for-the-badge&logo=expo&logoColor=white)
![React Native](https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![JavaScript](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E)
![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white)

**City Pulse** is a modern, smart city news application built with **React Native** and **Expo**. It allows users to stay updated with the latest headlines from major global cities, bookmark their favorite articles, and receive critical emergency alerts.

---

## 📱 Features

✅ **City Selector:** Switch between major cities (New York, London, Tokyo, etc.) to get local news.  
✅ **Live News Feed:** Real-time news fetching using the NewsAPI.  
✅ **Article Reader:** Integrated Web View to read full articles within the app.  
✅ **Bookmarks Manager:** Save articles for later reading (persisted locally).  
✅ **Emergency Hub:** Dedicated section for critical city alerts (Weather, Traffic, Health).  
✅ **Modern UI:** Clean, card-based interface with smooth navigation.

---

## 🛠️ Tech Stack

* **Framework:** React Native (via Expo)
* **Navigation:** React Navigation (Stack & Bottom Tabs)
* **Networking:** Axios
* **Storage:** Async Storage (for Bookmarks)
* **Web Integration:** React Native WebView
* **API:** [NewsAPI.org](https://newsapi.org/)

---

## 🚀 Getting Started

Follow these instructions to run the project on your local machine.

### 1. Prerequisites

* [Node.js](https://nodejs.org/) installed.
* **Expo Go** app installed on your physical device (iOS/Android).

### 2. Installation

Clone the repository and install dependencies:


#### Clone the repository
```bash
git clone [https://github.com/your-username/city-pulse.git](https://github.com/your-username/city-pulse.git)
```

#### Navigate to the project folder
```bash
cd city-pulse
```

#### Install dependencies
```bash
npm install
```

### 3. API Configuration

- Get a free API Key from NewsAPI.org.

- Open src/constants/config.js.

- Replace the placeholder with your key:

```bash 
export const API_KEY = 'YOUR_ACTUAL_API_KEY_HERE';
```

### 4. Running the App 

Start the development server
```bash
npx expo start
```

- Scan the QR code with the Expo Go app on your phone.

- Or press a to run on Android Emulator / i to run on iOS Simulator.

