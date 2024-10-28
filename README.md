# real_time_chat_app
a simple real time chat application using Django for backend and react for frontend and sqlite3 as data base

# Installation Process
To install this app please follow this below steps:
### Run Backend
```
1. Create a virtual environment `pyhton -m venv venvname`
2. And activate it `source venv/bin/activate`(for ubuntu) `venv\Scripts\activate`(for windows)
3. Then change the directory to server/ and install dependencies `pip install -r requirements.txt`
4. Migrate to database `python manage.py migrate`
5. Now run the server `python manage.py runserver`
```
### Run Front-end
```
1. Change the directory to clients/
2. Install dependencies `npm install`
3. Now start the server `npm start`
```

Now you'll be redirected to `localhost:3000` Then open two browser window and do the signup with name, email, profile image and start chatting from two different window. 


### High level features view
```
Login Process: Checks if the user exists; if not, prompts sign-up.
Home Page:
Profile: Enables self-chat.
Chat Contacts: Users interact with contacts.
Add Users Logic:
Check in SQLite: Finds users who exist in SQLite but aren’t in the user’s contact list and adds them to the "Add Users" tab.
Messaging System:
Chat Room: Users can communicate with each other in real-time.
Message Storage: Stores the last 50 messages per room in SQLite.
Chat History: Displays stored chat history for easy access.
```
