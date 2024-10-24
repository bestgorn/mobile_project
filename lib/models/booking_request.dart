class Booking {
  final String id;
  final String roomId;
  final String status;

  Booking({required this.id, required this.roomId, required this.status});

  factory Booking.fromJson(Map<String, dynamic> json) {
    return Booking(
      id: json['id'],
      roomId: json['roomId'],
      status: json['status'],
    );
  }
}
