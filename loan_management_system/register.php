<!DOCTYPE html>

<html>
    <head>
        <meta charset="UTF-8">
        <title>Register</title>
        <link rel="stylesheet" href="css.css">

    </head>
    
    <form action='register_act.php' method="POST">

        <div class="container">
            <h1>
                Register
            </h1>
            <label for="email"><b> Email </b></label><br>
            <input type="text" placeholder="Enter Email" name="email" required>
           <br>
            <label for="psw"><b> Password </b></label><br>
            <input type="password" placeholder="Enter Password" name="psw" required>
            <br>
            <label for="psw_repeat"><b>Repeat Password </b></label><br>
            <input type="password" placeholder="Repeat Password" name="psw_repeat" required>
            
             <p style="margin-left:32px;"> *By creating an account you agree to our <a href="#">Terms & Privacy Policies</a>.</p>
          
            
            <button type="submit" class="registerbtn">Register</button>
            <button type="button" class="signin f"  onclick="window.location.href='index.php'">Log In</button>
                
        </div>   
        
        
    <img src="img1.png" class="img2">
        
        
    </form>

    
    <body>
       
    </body> 
</html>
