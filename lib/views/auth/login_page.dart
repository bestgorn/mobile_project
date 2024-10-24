import 'package:flutter/material.dart';
import 'package:mobile_mid/services/auth_service.dart';
import 'package:shared_preferences/shared_preferences.dart'; // นำเข้า SharedPreferences

class LoginPage extends StatefulWidget {
  @override
  _LoginPageState createState() => _LoginPageState();
}

class _LoginPageState extends State<LoginPage> {
  final _emailController = TextEditingController();
  final _passwordController = TextEditingController();
  final AuthService _authService = AuthService();

  void _login() async {
    try {
      // ดึง token จาก AuthService
      String token = await _authService.login(_emailController.text, _passwordController.text);
      
      // เก็บ token ใน SharedPreferences
      SharedPreferences prefs = await SharedPreferences.getInstance();
      await prefs.setString('token', token);  // เก็บ token

      // ตรวจสอบสิทธิ์ตามอีเมล
      String email = _emailController.text;
      if (email == 'student@gmail.com') {
        Navigator.pushReplacementNamed(context, '/booking-form');
      } else if (email == 'staff@gmail.com') {
        Navigator.pushReplacementNamed(context, '/manage-rooms');
      } else if (email == 'approver@gmail.com') {
        Navigator.pushReplacementNamed(context, '/approve-request');
      } else {
        // กรณีอื่น ๆ สามารถนำไปที่หน้าอื่น
        ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text('Unauthorized access')));
      }
    } catch (e) {
      // แสดงข้อผิดพลาดเมื่อ login ไม่สำเร็จ
      ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text(e.toString())));
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Login')),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          children: [
            TextField(
              controller: _emailController,
              decoration: InputDecoration(labelText: 'Email'),
            ),
            TextField(
              controller: _passwordController,
              decoration: InputDecoration(labelText: 'Password'),
              obscureText: true,
            ),
            SizedBox(height: 20),
            ElevatedButton(
              onPressed: _login,
              child: Text('Login'),
            ),
            TextButton(
              onPressed: () {
                Navigator.pushNamed(context, '/register');
              },
              child: Text('Register'),
            ),
          ],
        ),
      ),
    );
  }
}
