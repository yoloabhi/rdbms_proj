<!DOCTYPE html>

<html>
    <head>
        <meta charset="UTF-8">
        <title>Title</title>
        <link rel="stylesheet" href="css.css">

    </head>

    
    
    
     <?PHP
        
        include('connection.php');
        $email = $_POST['email'];
        $uPwd = md5($_POST['psw']);
        $upwd = md5($_POST['psw_repeat']);
        
        
        $msg = "";
        $msgFlag = "Error";
        
        if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
            $query = "SELECT * FROM login where email = '$email'";
         
         $supportQry = $conn->query($query);
         $cntt = mysqli_num_rows($supportQry);
         if($cntt == 0 ){
        if($upwd != $uPwd){
                $msg = "Registration Failed! Passwords do not match";
                $msgFlag = "Error";
                
            }
        else{
        $sql = "INSERT INTO login(email,password) VALUES ('$email' , '$uPwd')";
        if (mysqli_query($conn, $sql)){
            
           $msg = "Registration Successful!";
           
        }
            }
        }
        else{$msgFlag="Error";
         $msg = "Account already exists with this email";
        }
        }
        else{
            $msgFlag = "Error";
            $msg = "Enter a valid email format   i.e. abc@xyz.in";
        }

        
        $className = "error";
        if($msgFlag == "Success"){
            $msg = "Registration Successful!";
            $className = "success";  
        }
        mysqli_close($conn);
        
        ?>
       
        
        
        
        
        
        
        
        
     
    <div class="stat">
        <p class="<?PHP echo $className;?>"> <?PHP echo $msg;?> </p>
    </div>
    
    <button class="registerbtn" onclick="window.location.href='register.php'">Register</button>
     <button class="registerbtn" onclick="window.location.href='index.php'">Login</button>
    <body>
       
    </body> 
</html>
