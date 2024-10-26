// import 'package:flutter/material.dart';
// import 'package:mobile_mid/models/booking_request.dart';
// import 'package:mobile_mid/services/api_service.dart';

// class BookingStatusPage extends StatefulWidget {
//   @override
//   _BookingStatusPageState createState() => _BookingStatusPageState();
// }

// class _BookingStatusPageState extends State<BookingStatusPage> {
//   final ApiService _apiService = ApiService();
//   late Future<List<Booking>> _bookings;

//   @override
//   void initState() {
//     super.initState();
//     _bookings = _apiService.fetchBookings(); // ดึงข้อมูลการจองของนักเรียน
//   }

//   @override
//   Widget build(BuildContext context) {
//     return Scaffold(
//       appBar: AppBar(title: Text('Booking Status')),
//       body: FutureBuilder<List<Booking>>(
//         future: _bookings,
//         builder: (context, snapshot) {
//           if (snapshot.connectionState == ConnectionState.waiting) {
//             return Center(child: CircularProgressIndicator());
//           } else if (snapshot.hasError) {
//             return Center(child: Text('Error: ${snapshot.error}'));
//           }

//           final bookings = snapshot.data!;
//           return ListView.builder(
//             itemCount: bookings.length,
//             itemBuilder: (context, index) {
//               return ListTile(
//                 title: Text('Booking ID: ${bookings[index].id}'),
//                 subtitle: Text('Room ID: ${bookings[index].roomId}, Status: ${bookings[index].status}'),
//               );
//             },
//           );
//         },
//       ),
//     );
//   }
// }
