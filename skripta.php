<?php 

	$data = $_POST;

	

	if(!isset($data['method'])) {
		die(json_encode(["error" => "Method is not set"]));
	}

	$sql = mysqli_connect("localhost", "root", "", "colorpicker");

	switch($data['method']) {

		case "saveColor": { 
			if(!isset($data['red'])) {
				die(json_encode(["error" => "Red color is not set"]));
			}
			if(!isset($data['green'])) {
				die(json_encode(["error" => "Green color is not set"]));
			}
			if(!isset($data['blue'])) {
				die(json_encode(["error" => "Blue color is not set"]));
			}
			if(!isset($data['opacity'])) {
				die(json_encode(["error" => "Opacity is not set"]));
			}
			saveColor(); 
			break; 
		}
		case "getColors": { getColors(); break; }
		default: { die(json_encode(["error" => "Invalid method"])); }
	}

	function getColors() {
		global $sql;
		global $data;
		$limit = (isset($data['limit'])) ? $data['limit'] : 100;
		$limit = $sql->real_escape_string($limit);
		$result = $sql->query("SELECT * FROM saved_colors LIMIT $limit");
		$return = null;

		if($result->num_rows >= 1) {
			while($row = $result->fetch_assoc()) 
			{
				$return[] = [
					"red" => $row['red'],
					"green" => $row['green'],
					"blue" => $row['blue'],
					"opacity" => $row['opacity']
				];
			}
			die(json_encode(["results" => $return]));
		}
		die(json_encode(["error" => "Error getting colors. No colors in the DB"]));
	}


	function saveColor() {
		global $sql;
		global $data;
		$red = $sql->real_escape_string($data['red']);
		$green = $sql->real_escape_string($data['green']);
		$blue = $sql->real_escape_string($data['blue']);
		$opacity = $sql->real_escape_string($data['opacity']);

		$sql->query("INSERT INTO saved_colors (red, green, blue, opacity) VALUES ({$red}, {$green}, {$blue}, {$opacity})");
		die("Color was successfully added to the database");
	}

	
