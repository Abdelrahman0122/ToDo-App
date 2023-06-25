# Todo App

A simple web application for managing todos.

## Features
- Registration and log in
- Add a new todo
- Mark a todo as complete
- Delete a todo

## Technologies Used

- Front-end: React Native
- Back-end: Node.js, Express, Prisma, mysql

## Installation

1. Clone the repository:
 ```
git clone https://github.com/Abdelrahman0122/ToDo-App.git
```
2. Install the dependencies:

```
cd todo-app
npm install
```
3. Create a .env file in the root directory of the project and set the following environment variables:
```
DATABASE_URL=<your-database-url>
```
4. Run the database migration:
```
npx prisma migrate dev
```
5. Start the server
```
npm start
```
6. Open the app in your browser at http://localhost:3000

## Usage

To add a new todo, enter a title and description in the input fields at the top of the page and click the "Add" button.

To mark a todo as complete, click the checkbox next to the todo.

To delete a todo, click the "Delete" button next to the todo.  


# Prototype
![image](https://github.com/Abdelrahman0122/ToDo-App/assets/106041930/f33e3923-0efb-45c0-bb77-b47201644cba)
