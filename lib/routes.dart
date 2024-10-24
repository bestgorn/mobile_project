import 'package:flutter/material.dart';
import 'views/auth/login_page.dart';
import 'views/auth/register_page.dart';
import 'views/student/room_list_page.dart';
import 'views/student/booking_form_page.dart';
import 'views/staff/manage_rooms_page.dart';
import 'views/approver/approve_request_page.dart';
import 'views/approver/approver_dashboard.dart';
import 'views/staff/staff_dashboard.dart';
import 'models/room.dart';

final Map<String, WidgetBuilder> routes = {
  '/': (context) => LoginPage(),
  '/register': (context) => RegisterPage(),
  '/room-list': (context) => RoomListPage(),
  '/manage-rooms': (context) => ManageRoomsPage(),
  '/approve-request': (context) => ApproveRequestPage(),
  '/approver-dashboard': (context) => ApproverDashboard(),
  '/staff-dashboard': (context) => StaffDashboard(),
};

// ฟังก์ชัน onGenerateRoute เพื่อจัดการการส่ง arguments ให้กับ BookingFormPage
Route<dynamic> onGenerateRoute(RouteSettings settings) {
  if (settings.name == '/booking-form') {
    final Room room = settings.arguments as Room; // รับ arguments จากการนำทาง
    return MaterialPageRoute(
      builder: (context) {
        return BookingFormPage(room: room); // ส่ง Room เป็น arguments ไปที่ BookingFormPage
      },
    );
  }
  // กรณีที่เส้นทางไม่ถูกต้อง
  return MaterialPageRoute(builder: (context) => LoginPage());
}
