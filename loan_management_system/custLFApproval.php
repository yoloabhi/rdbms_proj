<!DOCTYPE html>

<html>
    <head>
        <meta charset="UTF-8">
        <title>Title</title>
        <link rel="stylesheet" href="css.css">
        <style>
            .container {
                position: static;
            }

            form {
                display: flex;
                justify-content: center;
                margin: 20px auto;
            }

            .btn {
                width: 25.45%;
                outline: none;
                border-radius: 5px;
                background-color: rgb(75, 202, 92);
                height: 40px;
                font-weight: bold;
                font-size: 20px;
                cursor: pointer;
                margin: 0 10px;
            }

            .btn.reject {
                background-color: indianred;
            }
            .btn.reject:hover {
                background-color: rgba(204, 113, 113, 0.952);
            }
            .btn.accept {
                background-color: rgb(70, 123, 202);
            }
            .btn.accept:hover {
                background-color: rgb(101, 140, 197);
            }
            .btn.back:hover {
                opacity: .8;
            }
        </style>
    </head>


     <?PHP
		session_start();
        if(
            !isset($_SESSION) ||
            $_SESSION["username"] != $_REQUEST['uname']
        ) {
            header("Location: adminLogout.php");
        }
        
        include('connection.php');
       
        $uID = $_REQUEST['id']; 
        $uEmail = $_REQUEST['email'];
            
            
        $aID = $_REQUEST['aid'];
        $uName =$_REQUEST['uname'];
        $flagCK = "YES"; 
        $query= "SELECT * FROM loan_form where email = '$uEmail' and id = '$uID'";

        $supportQry = $conn->query($query);
        $cntt = mysqli_num_rows($supportQry);

        
        $dfname = "";
        $dlname = "";
        $dage = "";
        $ddob = "";
        $dmincome = ""; 
        $dlaneed = ""; 
        $dpurpose = "";
        $dtenure = ""; 
        $dstatus = "";
        
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

    <body>
        <div class="container l">
            <fieldset >
                <h1> Application Form </h1>
                <p class="stat"> <?PHP echo $statMsg; ?> </p>
            
            
                <label for="fname"><b>First Name</b></label> <br>
                <input type="text" placeholder="Enter First Name" name="fname" value="<?PHP echo $dfname; ?>" required>
                <br>
                <label for="lname"><b>Last Name</b></label> <br>
                <input type="text" placeholder="Enter Last Name" name="lname" value="<?PHP echo $dlname; ?>" required>
                <br>
                <label for="email"><b>Email</b></label> <br>
                <input type="text" placeholder="Enter Email ID" name="email" value="<?PHP echo $uEmail; ?>" disabled required>
            
                <br>
                <label for="age"><b>Age</b></label> <br>
                <input type="text" placeholder="Enter Age" name="age" value="<?PHP echo $dage; ?>"  required>
                <br>
            
                <label for="dob"><b>DOB</b></label> <br>
                <input type="text" placeholder="Enter DOB" name="dob" value="<?PHP echo $ddob; ?>"  required>
                <br>
            
                <label for="mIncome"><b>Monthly Income</b></label> <br>
                <input type="text" placeholder="Enter Monthly Income" name="mIncome" value="<?PHP echo $dmincome; ?>"  required>
                <br>
            
                <label for="lAmount"><b>Loan Amount Needed</b></label> <br>
                <input type="text" placeholder="Enter Loan Amount" name="lAmount" value="<?PHP echo $dlaneed; ?>"  required>
                <br>            
                <label for="purpose"><b> Purpose </b></label> <br>
            
                <select id="purpose" name="purpose">
                    <option value="" <?PHP if($dpurpose == ""){echo "Please select";}?>> --- Select --- </option>
                    <option value="Housing Loan" <?PHP if($dpurpose == "Housing Loan"){echo "selected";}?>>Housing Loan</option>
                    <option value="Car Loan" <?PHP if($dpurpose == "Car Loan"){echo "selected";}?>>Car Loan</option>
                    <option value="Personal Loan" <?PHP if($dpurpose == "Personal Loan"){echo "selected";}?>>Personal Loan</option>
                </select>
            
                <br>
                <label for="tenure"><b>Tenure </b></label> <br>
            
                <input type="radio" class="y" name="tenure" value="6 months" <?PHP if($dtenure == "6 months"){echo "checked";}?>><p class="z"> 6 months</p> <br>
                <input type="radio"class="y" name="tenure" value="12 months" <?PHP if($dtenure == "12 months"){echo "checked";}?>><p class="z"> 12 months</p> <br>
                <input type="radio" class="y" name="tenure" value="24 months" <?PHP if($dtenure == "24 months"){echo "checked";}?>><p class="z"> 24 months</p> <br>
                <input type="radio" class="y" name="tenure" value="32 months" <?PHP if($dtenure == "32 months"){echo "checked";}?>><p class="z"> 32 months</p>

                <br>
            </fieldset>
        </div>

        <form action= "custLFApp_act.php" method="POST">
            <button 
                class="btn accept" 
                type="submit" 
                style="width: 26.5%" 
                name="statusAct" 
                value="Accept"
            >
                Accept
            </button>
            <button 
                class="btn reject" 
                type="submit" 
                style="width: 26.5%" 
                name="statusAct" 
                value="Reject"
            >
                Reject
            </button>
            <button 
                class="btn back" 
                type="button" 
                style="width: 26.5%" 
                onclick="window.location.href='custList.php?aid=<?PHP echo $aID; ?>&uname=<?PHP echo $uName; ?>'"
            >
                Back
            </button>

            
            <input type="hidden" name="custID" value="<?PHP echo $uID; ?>"> 
            <input type="hidden" name="custEmail" value="<?PHP echo $uEmail; ?>"> 
            <input type="hidden" name="aid" value="<?PHP echo $aID; ?>">
            <input type="hidden" name="uname" value="<?PHP echo $uName; ?>">
        </form>
       
    </body> 
</html>
