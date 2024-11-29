[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/Ey-oxgvO)
# Social Media Back-end App using Express
## Objective
Create an equivalent Express App (with the same routes and operations) as your Flask App and upload it on this repository.
* Do **NOT** upload the `package-lock.json` file.
* Do **NOT** upload the `node_modules` folder.
* You do **NOT** need to use `migrations` in this project.

Also, add the details to this **README.md** file as mentioned below.

## Instructions to setup your project
### Step 1: Download Repository
- Go to `https://github.com/MOHDZUHAIBKAMAL/express_app_for_social_media_app`
- Click on "Code" button
- Select "Download ZIP"

### Step 2: Extract and Open Project
**Windows:**
```bash
# Extract the ZIP file
Right-click > Extract All

# Open in VS Code
```

**Mac:**
```bash
# Extract the ZIP file
unzip express_app_for_social_media_app.zip

# Open in VS Code
```

### Step 3: Install Requirements
```bash
npm install package.json
```
### (optional) : Change database name
-in each app's app.js file you will get a url to mongodb, that connects it to a database, here we have used social_media_app_mongo but you can change that name to something you want
-also maybe for some users you have to create a .env file containing your local mongodb url as 
```bash
MONGO_URI=mongodb://localhost:27017/social_media_app_mongo
```



### Step 4: Run the Application
```bash
node app_runner.js
```

The server will start at url and you can use the endpoints listed below.


## List of Routes

##User routes
router.get('/users', UserController.getAllUsers);

router.get('/users/:username', UserController.getUser);

router.post('/users/follow', UserController.followUser);

router.post('/users', UserController.createUser);

router.post('/users/login', UserController.loginUser);

##Post routes
router.get('/posts', PostController.getAllPosts);

router.post('/posts/explore', PostController.explore);

router.get('/posts/:post_id', PostController.getPost);

router.post('/posts', PostController.createPost);

router.put('/posts/:post_id', PostController.updatePost);

router.delete('/posts/:post_id', PostController.deletePost);
