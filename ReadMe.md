# GigFlow – README
## Deployments
Frontend Live: https://gig-flow-rouge-nine.vercel.app
Backend Live API: https://gigflow-g43e.onrender.com
Swagger Docs: https://gigflow-g43e.onrender.com/api-docs
---
##  Installation & Setup

### n Backend Setup
```
cd backend
npm install
npm start
```
### Frontend Setup
```
cd frontend
npm install
npm run dev
```
---
## Environment Variables
Create `.env` in backend:
```
MONGO_URI=your_mongo_url
JWT_SECRET=your_secret
PORT=5000
```
---
## Project Structure
backend/
controllers/
routes/
models/
middleware/
utils/
frontend/
src/
components/
pages/
redux/
services/
---

## Key Features
- User Auth (JWT)
- Gig Posting
- Gig Bidding System
- Hire Workflow
- Assigned Status
- Protected Routes
- Swagger API Docs
---
## Swagger Usage
Open in browser:
https://gigflow-g43e.onrender.com/api-docs