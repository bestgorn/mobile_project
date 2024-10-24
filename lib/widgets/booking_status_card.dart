import 'package:flutter/material.dart';

class BookingStatusCard extends StatelessWidget {
  final String status;

  BookingStatusCard({required this.status});

  @override
  Widget build(BuildContext context) {
    return Card(
      child: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Text('Booking Status: $status'),
      ),
    );
  }
}
