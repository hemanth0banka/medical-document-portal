# Design Document - HealthCare Platform

# 1. Tech Stack Choices

### Q1. What frontend framework did you use and why?

I used React+Vite as a frontend framework. Because React is a popular library used to build user interfaces. It provides a reusable ui components, we can manage component state easily, it works well with form and list like HTML elements, so I used React for file uploading and listing already uploaded documents, and Vite for fast development, it improves development speed and performance.

### Q2. What backend framework did you choose and why? 

I used Nodejs + Express as Backend framework. Because Express is a popular framework , easy to setup and light weight , its makes easy of building sever and rest apis , it also provides additional fetaures such as middlewares, routing and has a large ecosystem support, so i used multer middleware in express for file uploading

### Q3. What database did you choose and why? 

I choose MySQL database. Because MySQL is a relational database, here we are only storing metadata of the file, not actual data inside the file. So I choose SQL instead of NoSQL database. So in those SQL databases, I used MySQL database

### Q4. If you were to support 1,000 users, what changes would you consider? 

I support many users by updating my application with : 
* by adding user authentication and authorization to separate users with accounts
* Instead of storing documents in the upload folder, I will use an AWS S3 bucket to store documents
* pagination if the uploaded documents are more
* also uses clustering if the number of incoming requests is more
* If we want, we can also improve the scaling of the server, like vertical scaling or horizontal scaling. I choose horizontal scaling for this application

---

# 2. Architecture Overview

### 1. Draw or describe the flow between frontend, backend, database, and file storage.

* The user interacts with React ui components on the screen.
* When an upload, download, or delete action is done by the user, the frontend sends a api req to the server
* req passes through the chain of middlewares
* If the request is a download, it passes to the controller of that route and sends a downloadable pdf file
* if the request is a getList of documents, it passes to the controller of that route, fetches metadata from the database
* if the req is upload document, multer middleware processes that req and passes it through to the controller
* file stored in local uploads folder
* metadata of the file is stored in the database
* server sends a response with a status code back to the frontend
* frontened receives the response and displays a success or failure message

### 2. You can use a simple diagram or bullet points.
```
    Frontend -> React Components
        |
        |
    eventListener ( user action ) -> upload,delete,download
        |
        |
    API request -> axios
        |
        |
    Backend Server -> Express
        |
        |
    middleware Chain
        | 
        Multer (if req is upload)
        |
    Controller 
        |
        fetch data from db  Or
        create new metadata of file
        according to req
        |
    response -> statuscode + message / file
        |
        |
    recived by frontend
```
---

# 3. API Specification 

### 1. Upload a Document

    url         :   /documents/upload
    method      :   post
    request     :   axios.post(url,file,headers)
    response    :   { success : true , message : 'File Uploaded scuccessfully'}
    description :   user uploads a pdf file with this request and post method, sever stores the file from incoming req into the uploads folder using multer middleware and meta data in the database.

### 2. List Of All Documents

    url         :   /documents
    method      :   get
    request     :   axios.get(url)
    response    :   { success : true , data : [ {id,filename,size},{id,filename,size},{id,filename,size}] }
    description :   when frontend sends req with this url and get method, server will respond by returning an array of objects , each object is metadata of a file. 

### 3. Download a file

    url         :   /documents/:id
    method      :   get
    request     :   axios.get(url/id)
    description :   when frontend sends req with this url and get method, sever will respond by returing a single object. which is meta data of a particular file matches with the req params id

### 4. Delete a file

    url         :   /documents/:id
    method      :   delete
    request     :   axios.delete(url/id)
    response    :   { success : true , mesage : 'File deleted Successfully'}
    description :   when frontend send req with this url and delete method, server delete file from localstorage and metadata from database ,which file id is matches to the req params id

---

# 4. Data Flow Description 

### Q5. Describe the step-by-step process of what happens when a file is uploaded and when it is downloaded. 

Upload process :

- frontend loads components on screen
- So when the user selects a file in the form component and clicks the upload/submit button, Axios sends a request to the server with the post method containing the file data.
- backend passes the req through middlewares
- When the req is uploaded, multer middleware processes the file data in the req
- backend validates the type of file
- file saved in the uploads folder 
- file metadata saved in the database
- success response is sent back to the frontend

Download process :
 
- frontened loads components on screen
- When the user clicks the download button of any list on the screen. Frontend sends a request with the file id to the server with the GET method
- backend passes the req through middlewares
- When it reaches the download route, the controller fetches the records in the database whose ID matches the request parameters ID
- found record path column value is used to path. Resolve to get the file from localstorage
- matched file will send back to the frontend as downloadable

---

# 5. Assumptions

### Q6. What assumptions did you make while building this?

* This project uses a development setup, where the frontend and backend run as separate services.
* only one user is assumed,so no authention and authorization is implemented
* only pdf files are allowed to upload
* files are stored locally on server, so no aws s3 used
* application runs locally
* no role based access control
* given simple upload, download, and delete buttons, and no additional features are added
