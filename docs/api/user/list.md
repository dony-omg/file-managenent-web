# Vehicles List API

Endpoint for retrieving vehicles with search, filter and pagination capabilities.

## GET /api/vehicles/list

Returns a paginated list of vehicles that can be filtered and searched.

### Query Parameters

| Parameter | Type    | Required | Description                                      |
|-----------|---------|----------|--------------------------------------------------|
| search    | string  | No       | Search term for vehicle name and description     |
| filter    | string  | No       | Filter vehicles by type                          |
| page      | number  | No       | Page number (default: 1)                         |
| limit     | number  | No       | Number of items per page (default: 10)           |

### Response

```json
{
  "data": [
    {
      "id": "string",
      "name": "string",
      "description": "string",
      "type": "string",
      "created_at": "timestamp"
    }
  ],
  "metadata": {
    "total": number,
    "page": number,
    "limit": number,
    "totalPages": number
  }
}
