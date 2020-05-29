<!DOCTYPE html>

<html>
    <head>
        <meta charset="UTF-8">
        <title>Title</title>
        <link rel="stylesheet" href="css.css">

    </head>
    
    <body>
        <?PHP
            session_start();

            include('connection.php');
            $email = $_POST['email'];
            $uPwd = md5($_POST['psw']);
            
            $msg = "";
            $msgFlag = "Error";
            
            $sql = "select * from login where email='$email'";
            $result = $conn->query($sql);
            
            if($result->num_rows > 0 ){
                
                while ($row1 = $result->fetch_assoc()){
                    $id = $row1['id'];
                    $uname = $row1['email'];
                    $pwd = $row1['password'];
                }
                
                if($pwd == $uPwd){
                    $_SESSION["username"] = $uname;
                    $_SESSION["password"] = md5($pwd);

                    header("Location: cust_index.php?email=$uname");
                } else {
                    if(session_id() != "") {
                        session_destroy();
                        $_SESSION = NULL;
                    }
                    
                    $msg = "Login Failed! Invalid Password";
                    $msgFlag = "Error";
                }
                    
            
            }else{
                $msg = "Login Failed! Invalid username ";
                $msgFlag = "Error";
            }
            
            $className = "error";
            if($msgFlag == "Success"){
                $className = "success";  
            }              
        ?>
            
        
    <div class="stat">
        <p class="<?PHP echo $className;?>"> <?PHP echo $msg;?> </p>
    </div>
    
    <button class="registerbtn" onclick="window.location.href='index.php'">Back</button>
       
    </body> 
</html>
