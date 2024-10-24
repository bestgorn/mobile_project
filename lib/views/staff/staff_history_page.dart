import 'package:flutter/material.dart';
import 'package:mobile_mid/models/booking_request.dart';
import 'package:mobile_mid/services/api_service.dart';

class StaffHistoryPage extends StatefulWidget {
  @override
  _StaffHistoryPageState createState() => _StaffHistoryPageState();
}

class _StaffHistoryPageState extends State<StaffHistoryPage> {
  final ApiService _apiService = ApiService();
  late Future<List<Booking>> _history;

  @override
  void initState() {
    super.initState();
    _history = _apiService.fetchBookings(); // ปรับฟังก์ชันให้ดึงข้อมูลประวัติ
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Staff History')),
      body: FutureBuilder<List<Booking>>(
        future: _history,
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) {
            return Center(child: CircularProgressIndicator());
          } else if (snapshot.hasError) {
            return Center(child: Text('Error: ${snapshot.error}'));
          }

          final bookings = snapshot.data!;
          return ListView.builder(
            itemCount: bookings.length,
            itemBuilder: (context, index) {
              return ListTile(
                title: Text('Booking ID: ${bookings[index].id}'),
                subtitle: Text('Room ID: ${bookings[index].roomId}, Status: ${bookings[index].status}'),
              );
            },
          );
        },
      ),
    );
  }
}
