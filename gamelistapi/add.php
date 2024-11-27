<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");

include_once "db.php";

$data = json_decode(file_get_contents("php://input"), true);

$title = $data['title'] ?? '';
$genre = $data['genre'] ?? '';
$release_year = $data['release_year'] ?? 0;

$sql = "INSERT INTO games (title, genre, release_year) VALUES ('$title', '$genre', $release_year)";
if ($conn->query($sql)) {
    echo json_encode(["message" => "Game added successfully"]);
} else {
    echo json_encode(["message" => "Error: " . $conn->error]);
}

$conn->close();
?>
