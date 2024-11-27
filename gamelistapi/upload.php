<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: PUT");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Methods, Authorization");

include_once "db.php";

$data = json_decode(file_get_contents("php://input"), true);
$id = $data['id'];
$title = $data['title'];
$genre = $data['genre'];
$release_year = $data['release_year'];
$image_path = $data['image_path'] ?? 'placeholder.jpg';

$sql = "UPDATE games SET title='$title', genre='$genre', release_year=$release_year, image_path='$image_path' WHERE id=$id";
if ($conn->query($sql)) {
    echo json_encode(["message" => "Game updated successfully"]);
} else {
    echo json_encode(["message" => "Error updating game: " . $conn->error]);
}

$conn->close();
?>

