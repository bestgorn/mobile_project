import 'package:flutter/material.dart';
import 'views/auth/login_page.dart';
import 'views/auth/register_page.dart';
import 'views/student/room_list_page.dart';
import 'views/student/booking_form_page.dart'; // นำเข้า BookingFormPage
import 'views/staff/manage_rooms_page.dart';
import 'views/approver/approve_request_page.dart';
import 'views/approver/approver_dashboard.dart';
import 'views/staff/staff_dashboard.dart';
import 'models/room.dart'; // นำเข้า Room model

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Booking App',
      initialRoute: '/',
      routes: {
        '/': (context) => LoginPage(),
        '/register': (context) => RegisterPage(),
        '/room-list': (context) => RoomListPage(),
        // แก้ไขการส่ง Room ไปยัง BookingFormPage และตรวจสอบว่า arguments ไม่เป็น null
        '/booking-form': (context) {
          final arguments = ModalRoute.of(context)?.settings.arguments;
          if (arguments is Room) {
            return BookingFormPage(room: arguments);
          } else {
            return Scaffold(
              body: Center(child: Text('Error: No room information provided')),
            );
          }
        },
        '/manage-rooms': (context) => ManageRoomsPage(),
        '/approve-request': (context) => ApproveRequestPage(),
        '/approver-dashboard': (context) => ApproverDashboard(),
        '/staff-dashboard': (context) => StaffDashboard(),
      },
    );
  }
}
