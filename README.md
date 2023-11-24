# Dumbo-Supermarket

Developing a web-based user management system for Dumbo Supermercados Ltda. Features include user authentication and CRUD operations for administrators.

## System Requirements

- Node.js 20.9.0
- npm 10.2.1
- Composer 2.6.5

## Project Setup

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/Pablo-RoVi/Dumbo-Supermarket.git
   cd Dumbo-Supermarket
   ```

2. **Install Frontend Dependencies:**
   ```bash
   cd frontend
   npm install
   ```

3. **Configure Frontend Environment Variables:**
   - Copy the `.env.example` file and rename it to `.env`.
   - Modify the environment variables as necessary; it is recommended to set REACT_APP_API_URL=http://127.0.0.1:8000/api/.

4. **Compile the Frontend:**
   ```bash
   npm run build
   ```

5. **Install Backend Dependencies:**
   ```bash
   cd ../backend
   composer install
   ```

6. **Configure Backend Environment Variables:**
   - Copy the `.env.example` file and rename it to `.env`.
   - Configure the environment variables, especially the database connection.
   ```bash
    DB_CONNECTION=mysql
    DB_HOST=your_host
    DB_PORT=your_port
    DB_DATABASE=schema_name
    DB_USERNAME=your_username
    DB_PASSWORD=your_password
   ```

7. **Generate Laravel Application Key:**
   ```bash
   php artisan key:generate
   ```

8. **Migrate the Database:**
   ```bash
   php artisan migrate
   ```

## Running the Project

- **Start the Laravel Server:**
  ```bash
  php artisan serve
  ```

- **Access the Frontend:**
  Open your browser and visit `http://localhost:3000`.
