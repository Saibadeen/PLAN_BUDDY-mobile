# PlanBuddy

PlanBuddy is a minimal React Native Expo app that generates structured, checkable plans from your goals using OpenAI.

## Structure

- `mobile/`: React Native Expo application.
- `backend/`: Node.js Express server acting as a proxy to OpenAI.

## Getting Started

### Prerequisites

- Node.js installed.
- OpenAI API Key.
- Expo Go app on your phone or a simulator.

### 1. Backend Setup

The backend handles secure communication with OpenAI.

1.  Navigate to the backend directory:
    ```bash
    cd backend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Create a `.env` file (or copy `.env.example` if available) and add your OpenAI API Key:
    ```
    OPENAI_API_KEY=sk-...
    PORT=3000
    ```
4.  Start the server:
    ```bash
    npm start
    ```
    The server will run on `http://localhost:3000`.

### 2. Mobile App Setup

1.  Navigate to the mobile directory:
    ```bash
    cd mobile
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Configure the API URL:
    - By default, the app looks for `EXPO_PUBLIC_API_BASE_URL`.
    - Create a `.env` file in `mobile/` or just rely on the default fallback in `src/services/api.ts` (which is `http://localhost:3000`).
    - **Note for Android Emulator**: Use `http://10.0.2.2:3000`.
    - **Note for Physical Device**: Use your computer's local IP, e.g., `http://192.168.1.X:3000`.
4.  Start the app:
    ```bash
    npx expo start
    ```
5.  Scan the QR code with Expo Go or press `i` for iOS Simulator / `a` for Android Emulator.

## Architecture & Trade-offs

### Tech Stack
- **Frontend**: React Native (Expo), TypeScript.
- **Backend**: Node.js, Express, OpenAI SDK.
- **Persistence**: AsyncStorage.

### Key Decisions
- **State Management**: Used React's built-in `useState` and `useEffect` combined with `AsyncStorage` for persistence. This avoids the complexity of Redux/Zustand for a simple two-screen app.
- **Navigation**: `react-navigation` (Native Stack) for standard native feel.
- **Styling**: `StyleSheet` for performance and zero-dependency styling.
- **Backend Proxy**: A simple Express server is used to keep the OpenAI API key secure (never shipping it in the app binary) and to enforce the structured output format.
- **AI Integration**: Used `gpt-4o` with "Structured Outputs" to ensure the returned JSON always matches the app's expected schema, preventing parsing errors.

### Future Improvements
- **Dark Mode**: Support system theme.
- **Push Notifications**: Reminders for due dates.
- **Better Error Handling**: More granular error messages for API failures.
