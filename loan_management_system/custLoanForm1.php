<!DOCTYPE html>

<html>
    <head>
        <meta charset="UTF-8">
        <title>Loan Form</title>
        <link rel="stylesheet" href="css.css">
    </head>

    <?PHP
		session_start();
		if(
			!isset($_SESSION) ||
			$_SESSION["username"] != $_REQUEST['email']
		) {
			header("Location: logout.php");
		}
        
         include ('connection.php');
         
         $uEmail = $_REQUEST['email'];
         $formId = $_REQUEST['id'];
         
         $flagCK = "NO";
        //  if($formId == 'NULL') {
            $dfname = "";
            $dlname = "";
            $dage = "";
            $ddob = "";
            $dmincome = "";
            $dlaneed = "";
            $dpurpose = "";
            $dtenure = "";
            $dstatus = "";
        //  }
        //  else{
            $query = "SELECT * FROM loan_form WHERE email = '$uEmail' AND id = $formId";
         
            $supportQry = $conn->query($query);
            $cntt = mysqli_num_rows($supportQry);
            
            if($cntt > 0){
                $flagCK = "YES";
                
                $qryForm = $conn->query($query);
                while ($row = mysqli_fetch_array($qryForm)){
                    $dfname = $row['fname'];
                    $dlname = $row['lname'];
                    $dage = $row['age'];
                    $ddob = $row['dob'];
                    $dmincome = $row['mincome'];
                    $dlaneed = $row['laneed'];
                    $dpurpose = $row['purpose'];
                    $dtenure = $row['tenure'];
                    $dstatus = $row['status'];
                }
            }
        // }
         
         $statMsg = "Please fill in this Loan Application form.";
         if($dstatus == "Pending"){
             $statMsg = "Loan Application form is Pending.";
         }elseif($dstatus == "Accept"){
             $statMsg = "Loan Application form is Accepted.";
         }elseif($dstatus == "Reject"){
             $statMsg = "Loan Application form is Rejected.";
         }else{
            $statMsg = "Please fill in this Loan Application form.";
         }

    ?>
    
    <form action= "custLoan_act.php" method="POST" style="font-size: smaller;">
       <?PHP if($flagCK=="YES"){echo "<fieldset disabled>";} ?>
        <div class="container d">
            <h1> Application Form </h1>
            <p class="stat"> <?PHP echo $statMsg; ?> </p>
            
            
            
            <label for="fname"><b>First Name</b></label><br>
            <input type="text" placeholder="Enter First Name" name="fname" value="<?PHP echo $dfname; ?>" required><br>            
            <label for="lname"><b>Last Name</b></label><br>
           <input type="text" placeholder="Enter Last Name" name="lname" value="<?PHP echo $dlname; ?>" required>
            <br>
             <label for="email"><b>Email</b></label><br>
           <input type="text" placeholder="Enter Email ID" name="email" value="<?PHP echo $uEmail; ?>" disabled required>
            
                <br>
             <label for="age"><b>Age</b></label><br>
            <input type="text" placeholder="Enter Age" name="age" value="<?PHP echo $dage; ?>"  required>
           <br>
            
             <label for="dob"><b>DOB</b></label><br>
            <input type="text" placeholder="DD/MM/YYYY" name="dob" value="<?PHP echo $ddob; ?>"  required>
            <br>
            
             <label for="mIncome"><b>Monthly Income</b></label><br>
            <input type="text" placeholder="Enter Monthly Income" name="mIncome" value="<?PHP echo $dmincome; ?>"  required>
            <br>
            
             <label for="lAmount"><b>Loan Amount Needed</b></label><br>
            <input type="text" placeholder="Enter Loan Amount" name="lAmount" value="<?PHP echo $dlaneed; ?>"  required>
          <br>
            
            <label for="purpose"><b> Purpose </b></label>
            <br>
            <select id="purpose" name="purpose">
                 <option value="" <?PHP if($dpurpose == ""){echo "Please select";}?>> --- Select --- </option>
                 <option value="Housing Loan" <?PHP if($dpurpose == "Housing Loan"){echo "selected";}?>>Housing Loan</option>
                 <option value="Car Loan" <?PHP if($dpurpose == "Car Loan"){echo "selected";}?>>Car Loan</option>
                 <option value="Personal Loan" <?PHP if($dpurpose == "Personal Loan"){echo "selected";}?>>Personal Loan</option>
            </select>
            
           <br>
           <label for="tenure"><b>Please select the Tenure </b></label> <br>
            
            <input class="y" type="radio" name="tenure" value="6 months" <?PHP if($dtenure == "6 months"){echo "checked";}?>> <p class="z">6 months </p><br>
            <input class="y" type="radio" name="tenure" value="12 months" <?PHP if($dtenure == "12 months"){echo "checked";}?>> <p class="z">12 months</p> <br>
            <input  class="y" type="radio" name="tenure" value="24 months" 
            <?PHP if($dtenure == "24 months"){echo "checked";}?>> <p class="z">24 months </p><br>
            <input  class="y" type="radio" name="tenure" value="32 months" <?PHP if($dtenure == "32 months"){echo "checked";}?>> <p class="z">32 months</p> 
             
            <input type="hidden" name="custEmail" value="<?PHP echo $uEmail; ?>">
             
           <br>
             
     
             
             
             <button type="Submit" class="registerbtn" <?PHP if($flagCK == "YES"){ ?> disabled <?PHP } ?>>Submit</button>
        
             <br><br>
             <p class="term"> *By clicking SUBMIT you accept our <a href="#"> Terms & Privacy Policies</a>.</p>
             <br>
             <br>
        </div>

    </form>

    <body>
        
    </body>
</html>


