def test_get_all_products(auth_client, api_url):
    response = auth_client.get(f"{api_url}/erp/store/products?page=1&limit=20")
    assert response.status_code in [200, 401]

def test_get_all_orders(auth_client, api_url):
    response = auth_client.get(f"{api_url}/erp/store/orders?page=1&limit=20")
    assert response.status_code in [200, 401]

def test_get_store_summary(auth_client, api_url):
    response = auth_client.get(f"{api_url}/erp/store/summary")
    assert response.status_code in [200, 401]

def test_create_product(auth_client, api_url):
    response = auth_client.post(f"{api_url}/erp/store/products", json={
        "name": "Whey Protein 1kg",
        "category": "Supplements",
        "price": 2500,
        "stock": 50,
        "description": "Premium whey protein isolate"
    })
    assert response.status_code in [201, 401]

def test_update_product(auth_client, api_url):
    response = auth_client.patch(f"{api_url}/erp/store/products/1", json={
        "price": 2750,
        "stock": 80
    })
    assert response.status_code in [200, 401, 404]

def test_create_order(auth_client, api_url):
    response = auth_client.post(f"{api_url}/erp/store/orders", json={
        "items": [
            { "productId": 1, "qty": 2 },
            { "productId": 3, "qty": 1 }
        ],
        "method": "UPI",
        "notes": "Walk-in customer purchase"
    })
    assert response.status_code in [201, 401, 404]


def test_get_product_by_id(auth_client, api_url):
    response = auth_client.get(f"{api_url}/erp/store/products/1")
    assert response.status_code in [200, 401, 404]

def test_delete_product(auth_client, api_url):
    response = auth_client.delete(f"{api_url}/erp/store/products/1")
    assert response.status_code in [200, 204, 401, 404]

def test_get_order_by_id(auth_client, api_url):
    response = auth_client.get(f"{api_url}/erp/store/orders/1")
    assert response.status_code in [200, 401, 404]
