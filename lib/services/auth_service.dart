import 'package:http/http.dart' as http;
import 'dart:convert';
//connect Api with backend
class AuthService {
  final String baseUrl = 'http://localhost:5000'; 
//------------------------------------------------------------------------------//
  Future<String> login(String email, String password) async {
    final response = await http.post(
      Uri.parse(
          '$baseUrl/api/auth/login'), 
      headers: {'Content-Type': 'application/json'},
      body: json.encode({'email': email, 'password': password}),
    );

    if (response.statusCode == 200) {
      final data = json.decode(response.body);
      return data['token'];
    } else {
      throw Exception('Login failed');
    }
  }
//------------------------------------------------------------------------------//
  Future<void> register(String username, String email, String password) async {
    final response = await http.post(
      Uri.parse(
          '$baseUrl/api/auth/register'), 
      headers: {'Content-Type': 'application/json'},
      body: json
          .encode({'username': username, 'email': email, 'password': password}),
    );

    if (response.statusCode != 200) {
      throw Exception('Registration failed');
    }
  }
}
