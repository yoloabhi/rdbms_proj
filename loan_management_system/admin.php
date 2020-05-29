<!DOCTYPE html>

<html>
    <head>
        <meta charset="UTF-8">
        <title>Admin Login</title>
        <link rel="stylesheet" href="css.css">
    </head>
            
    <form action="admin_act.php" method="POST">
        
        <div class="container">
            <h1>
               Admin Login
            </h1>
            <label for="Uname"><b> Username </b></label><br>
            <input type="text" placeholder="Enter Username" name="Uname" required>
           <br>
            <label for="psw"><b> Password </b></label><br>
            <input type="password" placeholder="Enter Password" name="psw" required>
            
            <br>
            
            <button type="submit" class="registerbtn">Login</button>
               <button class="signin" onclick="window.location.href='index.php'"> Customer Login</button>  
        </div> 
        
        
        
        
    </form>
    
    <body>
       
    </body> 
</html>
