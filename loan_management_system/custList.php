<!DOCTYPE html>

<html>
    <head>
        <meta charset="UTF-8">
        <title>Title</title>
        <link rel="stylesheet" href="css.css">
        
        <style>
            .logout-btn {
                position: absolute;
                right: 10px;
                top: 10px;
                height: 2.5rem;
                width: 6rem;
                display: flex;
                justify-content: center;
                align-items: center;
                background: white;
                border: 2px solid #333;
                border-color: #ccc;
                font-weight: bold;
                text-decoration: none;
                color: black;
                transition: .3s ease;
            }

            .logout-btn:hover {
                background: #4caf50;
                color: #fff;
                border-color: #ccc;
                cursor: pointer;
			}
			
			.container {
				margin: 0 8rem;
			}
            
            #customers{
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
                border-collapse: collapse;
                width: 100%;
            }
            
            #customers td, #customers th{
                border: 1px solid #ddd;
                padding: 10px;
                cursor: pointer;

                
            }
            
            #customers tr:nth-child(even){background-color: #f2f2f2;}
            
            #customers tr:hover {background-color: #ddd;}
            
            #customers th {
                padding-top: 10px;
                padding-bottom: 10px;
                text-align: center;
                background-color: #4CAF50;
                color: white;
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
         
         include ('connection.php');
         
         $aID = $_REQUEST['aid'];
         $uName = $_REQUEST['uname'];
         $query = "SELECT * FROM loan_form where status='Pending'";

         $supportQry = $conn->query($query);
         $cntt = mysqli_num_rows($supportQry);
         
         ?>
       
    <body>
        <div><a href="adminLogout.php" class="logout-btn">Logout</a></div>
        <div style="margin-top:62px;"><?PHP
          if($cntt > 0){
            ?>
        <table id="customers">
            <tr>
                <th>
                    Name
                </th>
                <th>
                    Email
                </th>
                <th>
                    Purpose
                </th>  
            </tr>
            <?PHP
             $qryForm = $conn->query($query);
             while ($row = mysqli_fetch_array($qryForm)){
                 ?>
            
            <tr onclick="window.location.href='custLFApproval.php?id=<?PHP echo $row['id']; ?>&email=<?PHP echo $row['email']?>&aid=<?PHP echo $aID; ?>&uname=<?PHP echo $uName;?>'">
                    <!--above line maybe error try id small & n small-->
                <td>
                    <?PHP echo $row['fname']." ".$row['lname'];?>
                </td>
                
                <td>
                    <?PHP echo $row['email'];?>
                </td>
                
                <td>
                    <?PHP echo $row['purpose'];?>
                </td>
                
            </tr>
            <?PHP
             }
             ?>
                
        </table>
        
        <?PHP
          }
          else{
              ?>
          
        
        <table id="customers">
            <tr>
                <th align="center">
                    NO PENDING RECORDS FOUND
                </th>
            </tr>
        </table>
             
             <?PHP
          }
          ?>
        
         </div> 
    </body> 
    
</html>
