<!DOCTYPE html>

<html>
    <head>
        <meta charset="UTF-8">
        <title>Login</title>
        <link rel="stylesheet" href="css.css">

    </head>
    
    <form action='login_act.php' method="POST">
        
        <div class="container">
            <h1>
                Login
            </h1>
            <label for="email"><b> Email</b></label><br> 
            <input type="text" placeholder="Enter Email" name="email" required>
           <br>
            <label for="psw"><b> Password </b></label><br>
            <input type="password" placeholder="Enter Password" name="psw"  required>
            <br>
           
            
            <button type="submit" class="registerbtn">Login</button>
              <button type="button" class="signin f"  onclick="window.location.href='register.php'">Sign Up</button>
            
        </div>   
        
       <img src="img1.png" class="img1">
    </form>
   

    <body>
       
    </body> 
</html>
