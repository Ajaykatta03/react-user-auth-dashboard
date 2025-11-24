
## Project Features & API Integration

### Login
Login page is shown initially, centered on the screen.
Integrates with the Login API:
  - **POST** https://lobster-app-ddwng.ondigitalocean.app/user/login
  - **Headers:**
    - api_key: Z9Q7WKEY7ORGBUFGN3EG1QS5Y7FG8DU29GHKKSZH
  - **Payload:**
    ```json
    {
      "login_id": "developer@gmail.com",
      "password": "123123"
    }
    ```
On success, navigates to Dashboard and displays user data.
Includes a link to Register page for new users.

### Register
Register page is accessible via the Login page link.
Integrates with the Register API:
  - **POST** https://lobster-app-ddwng.ondigitalocean.app/user/register
  - **Headers:**
    - api_key: Z9Q7WKEY7ORGBUFGN3EG1QS5Y7FG8DU29GHKKSZH
  - **Payload:**
    ```json
    {
      "full_name": "jhon",
      "username": "jhon",
      "referral_id": "developer",
      "email_id": "jhon@tgmail.com",
      "country_row_id": "101",
      "mobile_number": "8798568912",
      "password": "123123"
    }
    ```
On success, navigates to Login page.

### Dashboard
After successful login, user data is displayed in a table with the following fields:
  - Fullname
  - Username
  - Country
  - Email id
  - Mobile number
  - Referral id

### Routing
Uses React Router for navigation between Login, Register, and Dashboard pages.
Forms are centered for better user experience.