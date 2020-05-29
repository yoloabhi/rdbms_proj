<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Customer Logged-In Page</title>
	<style>
		*{
			box-sizing: border-box;
		}

		body{
			font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
			margin: 0;
			overflow: hidden;
		}

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
		
		.add-new-loan-proposal {
			position: fixed;
			bottom: 4rem;
			right: 3rem;
			width: 2rem;
			height: 2rem;
			text-decoration: none;
			background-color: #4caf50;
			color: #fff;
			font-size: 2rem;
			padding: 1.3rem;
			border-radius: 50%;
			font-weight: 900;
			cursor: pointer;
			transition: transform .5s ease-in-out;
		}

		.add-new-loan-proposal span{
			width: 100%;
			font-family: serif;
			height: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
			transition: transform .3s ease-in-out;
		}

		.add-new-loan-proposal:hover {
			transform: translateY(-2px);
		}

		.add-new-loan-proposal:hover span {
			transform: rotate(180deg);
		}

		.add-new-loan-proposal::before {
			content: '';
			position: absolute;
			bottom: -20px;
			left: 0;
			border-radius: 50%;
			width: 100%;
			height: 20px;
			background: rgba(0, 0, 0, 0.1);
			filter: blur(5px);
			opacity: 0;
			transform: perspective(100px) rotateX(45deg);
			transform-style: preserve-3d;
			transition: .2s ease-in-out;
		}

		.add-new-loan-proposal:hover::before {
			opacity: 1;
		}

		.container {
			padding: .8rem 0;
			margin: 0 8rem;
		}

		h1 {
			text-align: center;
			margin: 1rem 0 1.2rem;
			letter-spacing: 1.25px;
			
			font-size: 2.2rem;
		}

		.form-list {
			width: 100%;
			border-radius: 5px;
			padding: 1px;
		}

		.table-header {
			display: flex;
			align-items: center;
			justify-content: space-around;
			background-color: #4caf50;
			text-transform: uppercase;
			color: white;
			border-radius: 5px 5px 0 0;
			
			font-size: 1.1rem;
		}

		.header-item {
			width: 100%;
			text-align: center;
			padding: 1rem 0;
		}

		.header-item:not(:last-child) {
			border-right: 2px solid #aaa;
		}

		.table-body {
			width: 100%;
			
			font-size: .9rem;
		}

		.table-body .row {
			position: relative;
			width: 100%;
			display: flex;
			align-items: center;
			justify-content: space-around;
		}

		.table-body .row::before {
			content: '';
			position: absolute;
			right: 0;
			top: 0;
			width: 5px;
			height: 100%;
			background: transparent;
		}

		.table-body .row.reject::before {
			background: red;
		}

		.table-body .row.accept::before {
			background: green;
		}

		.table-body .row.pending::before {
			background: #f0b74e;
		}

		.table-body .row:hover {
			z-index: 100;
			cursor: pointer;
			box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
		}

		.table-body .row:nth-child(2n) {
			background-color: #ddd;
		}
		
		.table-body .row:not(:last-child) {
			border-bottom: 2px solid #aaa;
		}

		.table-body .row:last-child {
			border-bottom: 10px double black;
			border-radius: 0 0 5px 5px;
		}

		.table-body .row .body-item {
			width: 100%;
			text-align: center;
			padding: .6rem 0;
		}

		.table-body .row .body-item:not(:last-child) {
			border-right: 2px solid #aaa;
		}
	</style>
</head>

<body>
	<?PHP
		session_start();
		if(
			!isset($_SESSION) ||
			$_SESSION["username"] != $_REQUEST['email']
		) {
			header("Location: logout.php");
		}

		include('connection.php');

		$uEmail = $_REQUEST['email'];
		$query = "SELECT id, CONCAT(fname, ' ', lname) AS name, email, laneed AS \"loan amount\", purpose, tenure, status FROM loan_form where email = '$uEmail'";

		$supportQry = $conn->query($query);
		$cntt = mysqli_num_rows($supportQry);
	?>

	<a href="logout.php" class="logout-btn">Logout</a>
	<div class="container">
		<h1>Loan Applications</h1>

	<?php
		echo ("<a".
			" href=\"custLoanForm1.php?email={$uEmail}&id=NULL\"".
			" class=\"add-new-loan-proposal\"".
		"><span>+</span></a>");

		if($cntt > 0) {
			$formList = array();
			while($row = mysqli_fetch_array($supportQry))
				array_push($formList, $row);
			
			$keys = array_keys($formList[0]);
			
			echo "<div class=\"form-list\">";

				echo "<div class=\"table-header\">";
					for($i = 1;$i < count($keys);$i+=2)
					{
						if($keys[$i] == 'id')
							continue;
						echo "<div class=\"header-item\"><strong>$keys[$i]</strong></div>";
					}
				echo "</div>";

				echo "<div class=\"table-body\">";
					for($i = 0;$i < count($formList);$i++) {
						$statusClass = strtolower($formList[$i]['status']);
						echo ("<div ".
							"class=\"row $statusClass\" ". 
							"onclick=\"window.location.href = 'custLoanForm1.php?email={$formList[$i]	['email']}&id={$formList[$i]['id']}'\" ".
						">");

							$keys = array_keys($formList[$i]);
							for($j = 0; $j < count($keys); $j+=2){
								if($keys[$j] == 'id')
									continue;
								echo "<div class=\"body-item\">" . $formList[$i][$keys[$j]] . "</div>";
							}

						echo "</div>";
					}
				echo "</div>";

			echo "</div>";
		}
	?>

	</div>
</body>

</html>
