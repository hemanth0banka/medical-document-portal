# Medical Document Portal

The Medical Document Portal is a simple full-stack application that allows users to upload, download, and delete medical documents in PDF format. The backend provides REST APIs to handle file operations, while the frontend offers a clean interface to interact with these APIs.


---

## Tech Stack

- Frontend    -   React , HTML , CSS
- Backend     -   NodeJs , Express
- DataBase    -   Mysql with Sequelize

---

## Features

### Document Upload

user can upload their all type of medical documents only in pdf format

### Document Download

user can download their uploaded documents at any time

### Document Delete

user can also delete their uploaded documents when they dont need any more

### View Documents

user can view all his uploaded documents in list

---


## How to Run the Project Locally

Clone the repository
```
git clone https://github.com/hemanth0banka/medical-document-portal.git
```

## Backend Setup

1. Navigate to the backend folder:
```
cd server
```

2. Install dependencies:
```
npm install
```

3. Create .env file, Add your environment variables:

- port = port number
- db_name = database name
- db_username = database username
- db_password = database password
- host = '127.0.0.1'
- dialect = 'mysql'

4. Start the backend server:

```
npm start
```


## Frontend Setup

1. Navigate to the frontend folder:

```
cd frontend
```

2. Install dependencies:

```
npm install
```

3. Create .env file, Add your environment variables:

- VITE_apiUrl = url for backend ('http://localhost:1000')

4. Start the frontend development server:

```
npm run dev
```

---


## Example API Calls

#### 1. Upload a Document

```
curl -X POST http://localhost:5000/documents/upload \
  -F "file=@file.pdf"
```

#### 2. List All Documents

```
curl http://localhost:5000/documents
```

#### 3. Download a Document

```
curl -O http://localhost:5000/documents/1
```

#### 4. Delete a Document

```
curl -X DELETE http://localhost:5000/documents/1
```

## Note

* Only PDF files are supported.
* The application assumes a single user.
* Files are stored locally on the server.


