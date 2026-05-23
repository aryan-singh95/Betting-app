# 🎰 Advanced Betting Application - Complete Setup Guide

## Overview
Full-stack modern betting application with real-time gaming, admin control panel, and comprehensive financial management system.

## 🏗️ Architecture

```
betting-app/
├── backend/
│   ├── models/          # Database schemas
│   ├── routes/          # API endpoints
│   ├── middleware/      # Authentication & validation
│   ├── utils/           # Game logic utilities
│   ├── config/          # Game configurations
│   ├── server.js        # Express + Socket.io server
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── games/           # Game components
│   │   │   ├── admin/           # Admin panel
│   │   │   └── auth/            # Login/Register
│   │   ├── hooks/               # Custom hooks
│   │   └── App.js               # Main app
│   └── package.json
│
└── .env                # Configuration file
```

## 📦 Installation

### Backend Setup
```bash
cd betting-app-main/backend
npm install
```

### Frontend Setup
```bash
cd betting-app-main/frontend
npm install
```

## 🔐 Configuration

Create `.env` file in backend root:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/betting-app
JWT_SECRET=your_secret_key_here
ADMIN_USERNAME=Aryan Singh
ADMIN_PASSWORD=Singh@@1122
ADMIN_PASSCODE=922915
```

## 🚀 Running the Application

### Start Backend (Terminal 1)
```bash
cd betting-app-main/backend
npm run dev
```

### Start Frontend (Terminal 2)
```bash
cd betting-app-main/frontend
npm start
```

Server runs on `http://localhost:5000`
Frontend runs on `http://localhost:3000`

## 🎮 Implemented Games

### 1. **Color Trading** 🎨
- Select Green, Red, or Violet
- 30s - 5min rounds
- Payouts: 2x (Green/Red), 4.5x (Violet)
- Min tokens: 15

### 2. **Aviator** ✈️
- Real-time plane multiplier animation
- Auto cash-out feature
- Canvas-based graphics
- Min tokens: 9

### 3. **Admin Panel** 🛡️
- Dashboard with analytics
- User management
- Account actions (freeze, disable, donate/deduct tokens)
- Transaction monitoring
- Withdrawal approvals

## 👤 Test Credentials

### Admin Login
- **Username**: Aryan Singh
- **Password**: Singh@@1122
- **Passcode**: 922915

## 📊 Database Models

### User
- Username, Email, Password (hashed)
- Balance, Total Bets, Winnings
- Account Status (active/frozen/disabled)
- Referral Code & System

### Transaction
- Type (deposit/withdrawal/bet/win)
- Amount & Status
- Game-specific data
- Auto-deleted after 48 hours

### GameHistory
- Game type & Round ID
- Bet & Win amounts
- Player & Result data
- Auto-deleted after 48 hours

### Withdrawal
- User details
- Bank information
- Approval workflow
- Status tracking

## 🔌 WebSocket Events

```javascript
// Client to Server
'join_game'         // Join game room
'place_bet'         // Place bet
'cash_out'          // Cash out in Aviator
'multiplier_update' // Update multiplier

// Server to Client
'user_joined'       // User joined room
'bet_placed'        // Bet placed
'result_announced'  // Game result
'multiplier_changed' // Multiplier update
```

## ⚙️ Game Configuration

All games configured in `backend/config/gameConfig.js`:
- Min tokens required
- Payout multipliers
- Round durations
- Special rules

## 🎯 Admin Actions

- **❄️ Freeze**: Disable account temporarily
- **🔥 Unfreeze**: Re-activate frozen account
- **🚫 Disable**: Permanently disable account
- **✅ Enable**: Re-activate disabled account
- **💔 Deduct**: Remove tokens from balance
- **🎁 Donate**: Add tokens to balance
- **🗑️ Delete**: Permanently delete account

## 📝 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/admin-login` - Admin login

### Games
- `POST /api/games/place-bet` - Place bet
- `POST /api/games/game-result` - Submit game result
- `GET /api/games/history/:gameType` - Get game history
- `POST /api/games/color-trading` - Color trading game

### Admin
- `GET /api/admin/users` - Get all users
- `GET /api/admin/users/:userId` - User details
- `POST /api/admin/users/:userId/action` - Perform action
- `GET /api/admin/withdrawals` - Get withdrawals
- `POST /api/admin/withdrawals/:id/approve` - Approve withdrawal
- `GET /api/admin/analytics` - Get analytics

## 🔒 Security Features

✅ JWT authentication
✅ Password hashing with bcryptjs
✅ Input validation with express-validator
✅ CORS enabled
✅ Role-based access control
✅ Rate limiting ready
✅ Transaction verification

## 📈 Performance Optimizations

✅ Database indexing
✅ Socket.io for real-time updates
✅ Auto-deletion of old records (TTL)
✅ Connection pooling
✅ Efficient queries

## 🐛 Debugging

Check browser console for errors:
```javascript
// Frontend logs
console.log('Game state:', state);
console.log('Socket connected:', socket);
```

Check server logs:
```bash
# Terminal output will show connection info
✅ MongoDB connected
🎰 Betting App Server running on port 5000
```

## 📱 Features Implemented

- ✅ Real-time gaming with WebSocket
- ✅ Multiple games (expandable)
- ✅ Complete payment system
- ✅ Admin control panel
- ✅ User account management
- ✅ Transaction history
- ✅ Referral system
- ✅ Balance management
- ✅ Responsive design
- ✅ Toast notifications
- ✅ Database auto-cleanup

## 🔜 Next Steps

1. Add remaining games (Rummy, Chicken Road, Spin & Win)
2. Implement email notifications
3. Add SMS verification
4. Deploy to cloud (Heroku, AWS, or DigitalOcean)
5. Setup CDN for assets
6. Add payment gateway integration
7. Implement leaderboards
8. Add user statistics

## 📞 Support

For issues or questions, check the error messages in:
- Browser Console (Frontend errors)
- Server Terminal (Backend errors)
- Network tab (API issues)

## 📄 License

All rights reserved. This is a complete betting platform.

---

**Happy Betting! 🎉**
