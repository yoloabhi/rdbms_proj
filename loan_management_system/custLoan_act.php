<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css.css">
</head>

    <?PHP
		session_start();
		if(
			!isset($_SESSION) ||
			$_SESSION["username"] != $_POST['custEmail']
		) {
			header("Location: logout.php");
		}
        
        include('connection.php');
        
        $fname = $_POST['fname'];
        $lname = $_POST['lname'];
        
        $age = $_POST['age'];
        $dob = $_POST['dob'];
        
        $mIncome = $_POST['mIncome'];
        $lAmount = $_POST['lAmount'];

        $custEmail = $_POST['custEmail'];
        $purpose = $_POST['purpose'];
        $tenure = $_POST['tenure'];
        $msg = "";
        $msgFlag = "Error";
        $status = "Pending";
        
        
        $query = "SELECT email FROM loan_form where email = '$custEmail'";
        $supportQry = $conn->query($query);
        
        $cntt = mysqli_num_rows($supportQry);
        
            $qry = "INSERT INTO loan_form(email,fname,lname,age,dob,mincome,laneed,purpose,tenure,status) VALUES('$custEmail','$fname','$lname',$age,'$dob',$mIncome,$lAmount,'$purpose','$tenure','$status');";
            
            if(mysqli_query($conn, $qry)){
                $msg = "Form submitted Successfully";
                $msgFlag = "Success";
                
            }else{
                $msg = "Problem in form submission";
                $msgFlag = "Error";
            }
            

        
        $className = "error";
        if ($msgFlag == "Success"){
            
            $className = "sucess";
        }
        
        ?>
     <div class="stat">
        <p class="<?PHP echo $className;?>"> <?PHP echo $msg;?> </p>
    </div>
    
    <button class="registerbtn" onclick="window.location.href='cust_index.php?email=<?PHP echo$custEmail ?>'">Back</button>
     
    <body>
       
    </body> 
</html>
