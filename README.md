# CRM_Application

<br>To run this appliction:
<br>1. Install MongoDB and start MongoDB Server at 127.0.0.1:27017
```bash
sudo apt-get update
sudo apt-get install -y mongodb-org
```
```bash
sudo service mongod start
```

<br>2. Make Database and Collections
```bash
mongo
> use CRMDatabase
> db.CRMUser.insert({"UID":0,"Name":"Admin","Email":"admin@crm.com","Phone":7945612309,"Password":"12345"})
> db.CRMCustomer.insert({"CID":0,"Name":"Test Customer","Email":"testCus@crm.com","Phone":8974561239,"Address":"Test Address, Test City, Test State, Test PinCode","Status":"Paid"})
> db.CRMActivities.insert({"UID":0,"CID":0,"Type":"Call","Time":"04012020 18:00:00","Desc":"Call for information","Next Act Desc":null,"Next Act Time":null})
```

<br>3. Install NodeJS
```bash
cd CRM_Application
sudo apt-get update
sudo apt-get install nodejs
```
Install dependencies from package.json
```bash
npm install 
```
<br>4. Run the Application at:
```bash
> node nodeServer.js
```
```bash
http://127.0.0.1:8080/startUser
```
<br/>

# Contributing
Please refer to each project's style and contribution guidelines for submitting patches and additions. In general, we follow the "fork-and-pull" Git workflow.

- Fork the repo on GitHub
- Clone the project to your own machine
- Commit changes to your own branch
- Push your work back up to your fork
- Submit a Pull request so that we can review your changes
