<!DOCTYPE html>

<html>
    <head>
        <meta charset="UTF-8">
        <title>Admin</title>
        <link rel="stylesheet" href="css.css">

    </head>

    
     <?PHP
        session_start();
        
        include('connection.php');
        $uname = $_POST['Uname'];
        $uPwd = ($_POST['psw']);
        
        $msg = "";
        $msgFlag = "Error";
        
        $sql = "select * from admin where username='$uname'";
        $result = $conn->query($sql);
        
        if($result->num_rows > 0 ){
            
            while ($row1 = $result->fetch_assoc()){
                
                $id = $row1['id'];
                $uname = $row1['username'];
                $pwd = $row1['password'];
                
            }
            
            if($pwd == $uPwd){
                $_SESSION["username"] = $uname;
                // echo $_SESSION["username"];
                header("Location: custList.php?aid=$id&uname=$uname");
            } else {
                if(session_id() != "") {
                    session_destroy();
                    $_SESSION = NULL;
                }

                $msg = "Login Failed! Invalid Password";
                $msgFlag = "Error";
            }
                
          
        }else{
            $msg = "Login Failed! Invalid username";
            $msgFlag = "Error";
        }
        
        $className = "error";
        if($msgFlag == "Success"){
            $className = "success";  
        }              
        ?>
       
    <body>
    <div class="stat">
        <p class="<?PHP echo $className;?>"> <?PHP echo $msg;?> </p>
    </div>
    <button class="registerbtn" onclick="window.location.href='admin.php'">Back</button>

    </body> 
</html>
