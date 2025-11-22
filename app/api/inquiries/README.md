# Product Inquiries API

## POST /api/inquiries

Submit a new product inquiry.

### Request Body

```json
{
  "productId": 1,
  "customerName": "John Doe",
  "email": "john@example.com",
  "phone": "+905551234567",
  "company": "Example Company",
  "quantity": "10 ton",
  "deliveryLocation": "Istanbul, Turkey",
  "message": "I need fish meal for my feed production",
  "language": "tr"
}
```

### Response

```json
{
  "success": true,
  "message": "Inquiry submitted successfully",
  "id": 1
}
```

## GET /api/inquiries

Fetch all product inquiries (admin only in production).

