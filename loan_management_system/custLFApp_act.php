<!DOCTYPE html>

<html>
    <head>
        <meta charset="UTF-8">
        <title>Title</title>
        <link rel="stylesheet" href="css.css">
    </head>
            

        
     <?php
		session_start();
        if(
            !isset($_SESSION) ||
            $_SESSION["username"] != $_REQUEST['uname']
        ) {
            header("Location: adminLogout.php");
        }

       include ('connection.php');
       
     $custID = $_POST['custID'];
     $custEmail = $_POST['custEmail'];
     $aid = $_POST['aid'];
     $uname = $_POST['uname'];
     $statusAct = $_POST['statusAct'];
     
     
     $msg = "";
     $msgFlag = "Error";
     $status = "Pending";
     
     
     $queryUpd = "UPDATE loan_form set status =  '$statusAct' where id = '$custID'";
     $queryUpdd = $conn->query($queryUpd);
     if($queryUpdd){
         $msg = "Form Updated";
         $msgFlag = "Success";
     }else{
         $msg = "Problem in form updation";
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
    
    <button class="registerbtn" onclick="window.location.href='custList.php?aid=<?PHP echo $aid; ?>&uname=<?PHP echo $uname; ?>'">Back</button>
    
    
    <body>
       
    </body> 
</html>
