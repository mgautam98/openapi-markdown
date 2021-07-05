# Healthcare Provider Directory 
OpenAPI Schemas 

## API Reference  

### Path: /api/provider/  

#### Get All 

```http 
GET /api/provider/
```

| Parameter | Type | Description |
| :--------  | :--------  | :--------  |
| * skip | integer | Skip | 
| * limit | integer | Limit | 


| Response | Type | Description |
| :--------  | :--------  | :--------  |
| 200 | N/A |  | Successful Response | 
| 422 | HTTPValidationError |  | Validation Error | 


#### Add 

```http 
POST /api/provider/
```

Request Body: HealthcareProviderBase 


| Response | Type | Description |
| :--------  | :--------  | :--------  |
| 201 | HealthcareProvider |  | Successful Response | 
| 422 | HTTPValidationError |  | Validation Error | 


### Path: /api/provider/{providerID}  

#### Get 

```http 
GET /api/provider/{providerID}
```

| Parameter | Type | Description |
| :--------  | :--------  | :--------  |
| * providerID | string | Providerid | 


| Response | Type | Description |
| :--------  | :--------  | :--------  |
| 200 | HealthcareProvider |  | Successful Response | 
| 422 | HTTPValidationError |  | Validation Error | 


#### Update 

```http 
PUT /api/provider/{providerID}
```

| Parameter | Type | Description |
| :--------  | :--------  | :--------  |
| * providerID | string | Providerid | 


Request Body: HealthcareProviderBase 


| Response | Type | Description |
| :--------  | :--------  | :--------  |
| 204 | N/A | Successful Response | 
| 422 | HTTPValidationError |  | Validation Error | 


#### Delete 

```http 
DELETE /api/provider/{providerID}
```

| Parameter | Type | Description |
| :--------  | :--------  | :--------  |
| * providerID | string | Providerid | 


| Response | Type | Description |
| :--------  | :--------  | :--------  |
| 204 | N/A | Successful Response | 
| 422 | HTTPValidationError |  | Validation Error | 


### Path: /  

#### Docs Redirect 

```http 
GET /
```

| Response | Type | Description |
| :--------  | :--------  | :--------  |
| 200 | N/A |  | Successful Response | 


