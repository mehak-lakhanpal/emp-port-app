# Employee Portal App

This app is a employee portal store where employee can apply for available openings.

### Assumptions

1.	Employee can only see available openings i.e. having Open status.
2.	Manager can only see his/her openings i.e. which he has created and also he can see open and closed openings both.
3.	Manager can open closed opening as well.
4.      Authentication check does'nt apply on login and register page. So if a user already logged in and tries to open these pages. He 
	can open and login or register again with different Username. In this case latest username will be authenticated and used.
5.      Both employee and manager have to register first, if he/she uses this portal first time , then he has to select role i.e. employee or manager for registration.On the basis of role, functionality would be different.


### Functionality

For Employee

1.	If an employee uses this portal first time, then he/she has to register himself or herself by selecting role Employee otherwise he/she has to login to use this portal.
2.	After successfully login, he will receive message on the screen , then he/she can see all the available openings on Openings screen.
3.	On Openings screen, employee can check detail of each opening by clicking on See Detail button.
4.	On Details screen , he /she can apply for the opening- If he/she already applied for the opening he/she get proper message and cannot apply for already applied opening else he will get successfully applied message.
5	If an employee applied for the opening, then notification will be displayed on the server console which is managed by custom events.
6.	Employee can Logout from the portal after clicking on logout button.

For Manager

1.	If a manager uses this portal first time, then he/she has to register himself or herself by selecting role Manager otherwise he/she has to login to use this portal.
2.	After successfully login, he will receive message on the screen , then he/she can see all the openings created by himself or herself on Openings screen.
3	On Openings screen, Manager can update particular opening by clicking on Update button.
4.      By clicking on Update button, he will redirect into Update Opening screen where he can update opening and also close or open respective opening.
5.      Upon closing the opening, employee who have shown interest on particular opening will receive notification on console which is managed by custom events.
6.     	On create openings screen , manager can create opening.
7.	Manager can Logout from the portal after clicking on logout button.

# APIs

Currently Server is running on http://localhost:3000
Using cookie to store token , therefore user information retrieved from the token

## Register user 

	 Url - /user/register Method: POST

### Request Body
	
	{
	  username:user
	  password:user
	  role: employee or manager
        }
	
### Response

	HTTP Code 201
	{
	  error:false,
	  message:'user is registered successfully'
	}

## Login user 

	Url - /user/login Method: POST

### Request Body
	
	{
	  username:user
	  password:user
        }
	
### Response

	HTTP Code 200
	{
	  error:false,
	  message:'Login successfully'
	}

## Logout user 

	Url - /user/logout Method: POST
	
### Response

	HTTP Code 200
	{
	  error:false,
	  message:'Logout successfully!'
	}

## Create opening

	 Url - /openings/create Method: POST

### Request Body
	
	{
	  project: project 1
	  client: client 1
	  role: Java Developer
	  technologies: java
	  description: description of the project
        }
	
### Response

	HTTP Code 201
	{
	  error:false,
	  message:'Opening Created Successfully!'
	}

## Update opening

	 Url - /openings/update Method: PUT

### Request Body
	
	{
	  _id: 68898yjbnfgrtr1j7gha
	  project: project 1
	  client: client 1
	  role: Java Developer
	  technologies: java
	  description: description of the project
        }
	
### Response

	HTTP Code 200
	{
	  error:false,
	  message:'Opening Updated Successfully!'
	}

## Get all openings

	 Url - /openings Method: GET

### Response 
 [
	{
	  _id: 68898yjbnfgrtr1j7gha
	  project: project 1
	  client: client 1
	  role: Java Developer
	  technologies: java
	  description: description of the project
        }
 ]

## Get opening by id

	 Url - /openings/id Method: GET

### Response 

	{
	  _id: 68898yjbnfgrtr1j7gha
	  project: project 1
	  client: client 1
	  role: Java Developer
	  technologies: java
	  description: description of the project
        }
	
## Apply for opening 

	 Url - /openings/apply/openingId Method: POST

### Response 

	HTTP Code 200
	{
	  error:false,
	  message:'Successfully Applied for Opening!'
	}
	