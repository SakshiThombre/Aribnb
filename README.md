<h1>Airbnb Clone (Direct Contact Edition)</h1>
<br>
<br>
<p>A simplified property rental platform built with Node.js where users can browse listings and contact owners directly via phone or messaging to book, bypassing automated payment gateways.</p>
<br>
<b>🚀 Features</b>
<ul>
  <li>User Authentication: Secure signup/login for guests and hosts using JWT.</li>
  <li>Property Management: Hosts can create, edit, and delete property listings with images and descriptions.</li>
  <li>Direct Booking: No checkout flow. Listings prominently display owner contact details (Phone/WhatsApp) for direct negotiation.</li>
  <li>Search & Filter: Find properties by location, price range, and amenities.</li>
</ul>
<br>
<b>🛠 Tech Stack</b>
<ul>
  <li>Backend: Node.js, Express.js</li>
  <li>Authentication: Passport.js or JSON Web Tokens (JWT)</li>
  <li>File Storage: Cloudinary (for property images)</li>
  <li>Frontend:EJS</li>
</ul>
<br>
<b>📋 Prerequisites</b>
<ol>
  <li>Node.js installed (v18+ recommended)</li>
  <li>MongoDB Atlas account or local MongoDB instance</li>
  <li>Cloudinary account for image hosting</li>
</ol>
<br>
<b>🔧 Installation & Setup</b>
<ol>
  <li>Clone the repository:<br> bash <br>git clone github.com<br>
cd airbnb-clone</li>
  <br>
  <li>Install dependencies:<br>
    bash<br>
npm install
  </li>
  <br>
  <li>Environment Variables: 
    <p>Create a .env file in the root directory and add the following:</p>
    PORT=3000
MONGO_URI=your_mongodb_connection_string<br>
JWT_SECRET=your_random_secret_key<br>
CLOUDINARY_CLOUD_NAME=your_name<br>
CLOUDINARY_KEY=your_key<br>
CLOUDINARY_SECRET=your_secret<br>
  </li>
  <br>
  <li>Run the application:<br>
    bash<br>
# For development<br>
npm run dev<br> <br>
#For Production <br>
npm start
  </li>
  <br>
</ol>
<br>
<b>📂 Project Structure</b> <br>
├── models/         # Database schemas (User, Listing)<br>
├── routes/         # Express routes (Auth, Listings, Users)<br>
├── controllers/    # Logic for handling requests<br>
├── middleware/     # Auth checks and image upload handling<br>
├── public/         # Static files (CSS, JS, Images)<br>
├── views/          # Templates (if using EJS/Handlebars)<br>
└── app.js          # Entry point<br>
