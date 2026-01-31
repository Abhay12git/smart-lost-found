# 🔍 Smart Digital Lost & Found System

A full-stack MERN application that helps people report and find lost items in their community.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node](https://img.shields.io/badge/node-v16+-green.svg)
![React](https://img.shields.io/badge/react-v18+-blue.svg)

## 📸 Screenshots

<img width="1361" height="638" alt="Screenshot 2026-01-31 225008" src="https://github.com/user-attachments/assets/68eaeadf-94db-4bcf-8ed5-a137726177ae" />

<img width="1363" height="638" alt="Screenshot 2026-01-31 225045" src="https://github.com/user-attachments/assets/bfffe952-86a0-4e3c-9ea9-31fe812855d5" />

<img width="1363" height="637" alt="Screenshot 2026-01-31 201347" src="https://github.com/user-attachments/assets/8c5d9c3f-130d-4beb-adcc-f2f2191e1c01" />

<img width="1360" height="634" alt="Screenshot 2026-01-31 223955" src="https://github.com/user-attachments/assets/3d7d8beb-0d67-4f18-8d09-aae04362b75f" />

<img width="1361" height="635" alt="Screenshot 2026-01-31 225205" src="https://github.com/user-attachments/assets/8f93676f-3f1b-4732-837d-c3bdfa2b2715" />

<img width="1360" height="622" alt="Screenshot 2026-01-31 224152" src="https://github.com/user-attachments/assets/cd61a78c-a0ac-42d3-b7bc-bd1260f64e3d" />

## ✨ Features

- 🔐 **User Authentication** - Secure JWT-based login and registration
- 📝 **Report Items** - Report lost or found items with detailed descriptions
- 🔍 **Smart Search** - Filter by type, category, location, and keywords
- 📸 **Image Upload** - Upload up to 5 images per item using Cloudinary
- 🎯 **Claim Items** - Claim found items and notify owners
- 👤 **User Dashboard** - Manage all your reported items
- ⚡ **Real-time Updates** - Live status updates for items
- 📱 **Responsive Design** - Works perfectly on all devices

## 🛠️ Tech Stack

### Frontend
- React 18
- React Router DOM
- Axios
- Tailwind CSS
- Context API for state management

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- Bcrypt for password hashing

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas)

### Clone Repository
```bash
git clone https://github.com/Abhay12git/smart-lost-found.git
cd smart-lost-found
```

### Backend Setup
```bash
cd server
npm install
```

Create `.env` file in server directory:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/lost-found-db
JWT_SECRET=your_super_secret_jwt_key_change_in_production
NODE_ENV=development
```

Start backend server:
```bash
npm run dev
```

### Frontend Setup
```bash
cd ../client
npm install
npm start
```

The app will open at `http://localhost:3000`

## 🚀 Usage

### Register/Login
1. Create an account or login with existing credentials
2. Access protected features after authentication

### Report Lost Item
1. Click "Report Item" in navigation
2. Select "I Lost Something"
3. Fill in item details (title, description, category, location, date)
4. Upload images (optional)
5. Submit

### Report Found Item
1. Click "Report Item"
2. Select "I Found Something"
3. Fill in details and submit

### Browse Items
1. Click "Browse Items"
2. Use filters to narrow search
3. Click on any item to view details

### Claim an Item
1. Find a matching item
2. Click "Claim This Item" on detail page
3. Owner will be notified

### Manage Your Items
1. Go to "My Items" from navigation
2. View all your reported items
3. Update status (Active/Claimed/Resolved)
4. Delete items if needed

## 📁 Project Structure
```
smart-lost-found/
├── server/                 # Backend
│   ├── config/            # Database & Cloudinary config
│   ├── controllers/       # Route controllers
│   ├── middleware/        # Auth & upload middleware
│   ├── models/           # Mongoose models
│   ├── routes/           # API routes
│   ├── utils/            # Helper functions
│   ├── .env              # Environment variables
│   └── server.js         # Entry point
│
├── client/                # Frontend
│   ├── public/           # Static files
│   ├── src/
│   │   ├── components/   # React components
│   │   ├── context/      # Context API
│   │   ├── pages/        # Page components
│   │   ├── utils/        # API config
│   │   ├── App.js        # Main app component
│   │   └── index.js      # Entry point
│   └── package.json
│
└── README.md
```

## 🔑 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (Protected)

### Items
- `GET /api/items` - Get all items (with filters)
- `GET /api/items/:id` - Get single item
- `POST /api/items` - Create item (Protected)
- `PUT /api/items/:id` - Update item (Protected, Owner only)
- `DELETE /api/items/:id` - Delete item (Protected, Owner only)
- `GET /api/items/user/my-items` - Get user's items (Protected)
- `POST /api/items/:id/claim` - Claim an item (Protected)

## 🎨 Color Palette

- Primary: `#3b82f6` (Blue)
- Success: `#10b981` (Green)
- Warning: `#f59e0b` (Yellow)
- Danger: `#ef4444` (Red)
- Gray: `#6b7280`

## 🔒 Environment Variables

### Backend (.env)
```env
PORT=5001
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret
```

## 🚧 Roadmap

- [ ] Email notifications when items are claimed
- [ ] Admin dashboard for managing all items
- [ ] Location-based search with Google Maps
- [ ] Real-time chat between users
- [ ] Mobile app (React Native)
- [ ] Push notifications
- [ ] Multi-language support

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 👨‍💻 Author

Abhay Kowshik V
- GitHub: https://github.com/Abhay12git
- LinkedIn: www.linkedin.com/in/abhay-kowshik-v-58795326b

## 🙏 Acknowledgments

- MongoDB documentation
- React documentation
- Tailwind CSS
- All open-source contributors

## 📧 Contact

For questions or support, please email: abhaykowshik@gmail.com

---

⭐ **Star this repo if you found it helpful!**
