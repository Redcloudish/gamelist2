<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: DELETE");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Methods, Authorization");

include_once "db.php";

$data = json_decode(file_get_contents("php://input"), true);
$id = $data['id'];

$sql = "DELETE FROM games WHERE id=$id";
if ($conn->query($sql)) {
    echo json_encode(["message" => "Game deleted successfully"]);
} else {
    echo json_encode(["message" => "Error deleting game: " . $conn->error]);
}

$conn->close();
?>
