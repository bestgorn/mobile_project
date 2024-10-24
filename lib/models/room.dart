class Room {
  final String id;
  final String name;
  final String status;

  Room({required this.id, required this.name, required this.status});

  factory Room.fromJson(Map<String, dynamic> json) {
    // ตรวจสอบว่ามีค่าที่ต้องการอยู่ใน JSON หรือไม่
    if (json['id'] == null || json['name'] == null || json['status'] == null) {
      throw Exception('Missing required field in JSON');
    }
    
    return Room(
      id: json['id'] as String,  // ตรวจสอบประเภทข้อมูล
      name: json['name'] as String,
      status: json['status'] as String,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'name': name,
      'status': status,
    };
  }
}
