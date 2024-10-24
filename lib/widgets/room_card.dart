import 'package:flutter/material.dart';
import '../models/room.dart'; // เปลี่ยนเป็นชื่อไฟล์ของคุณ

class RoomCard extends StatelessWidget {
  final Room room;

  RoomCard({required this.room});

  @override
  Widget build(BuildContext context) {
    return Card(
      child: ListTile(
        title: Text(room.name),
        subtitle: Text('Status: ${room.status}'),
        onTap: () {
          Navigator.pushNamed(context, '/booking-form', arguments: room);
        },
      ),
    );
  }
}
