import 'package:flutter/material.dart';

class StudentDashboard extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Student Dashboard')),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Text('Welcome to Student Dashboard!'),
            SizedBox(height: 20),
            ElevatedButton(
              onPressed: () {
                Navigator.pushNamed(context, '/room-list'); // ลิงก์ไปยังหน้าห้อง
              },
              child: Text('Browse Room List'),
            ),
            ElevatedButton(
              onPressed: () {
                Navigator.pushNamed(context, '/booking-status'); // ลิงก์ไปยังหน้าสถานะการจอง
              },
              child: Text('Check Booking Status'),
            ),
            ElevatedButton(
              onPressed: () {
                Navigator.pushNamed(context, '/student-history'); // ลิงก์ไปยังหน้าประวัตินักเรียน
              },
              child: Text('View Booking History'),
            ),
          ],
        ),
      ),
    );
  }
}
