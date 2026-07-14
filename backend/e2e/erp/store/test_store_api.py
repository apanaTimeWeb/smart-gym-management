import uuid

def test_store_lifecycle(auth_client, api_url):
    # Create Product
    create_prod = auth_client.post(f"{api_url}/erp/store/products", json={
        "name": "Whey Protein 1kg", "category": "Supplements", "price": 2500,
        "stock": 50, "description": "Premium whey protein isolate"
    })
    assert create_prod.status_code == 201
    prod_id = create_prod.json()["data"]["id"]

    # Create Order
    create_ord = auth_client.post(f"{api_url}/erp/store/orders", json={
        "items": [
            { "productId": prod_id, "qty": 2 }
        ],
        "method": "UPI", "notes": "Walk-in customer purchase"
    })
    assert create_ord.status_code == 201
    ord_id = create_ord.json()["data"]["id"]

    # Update Product
    update_prod = auth_client.patch(f"{api_url}/erp/store/products/{prod_id}", json={
        "stock": 48
    })
    assert update_prod.status_code == 200


    # Delete Product
    del_prod = auth_client.delete(f"{api_url}/erp/store/products/{prod_id}")
    assert del_prod.status_code in [200, 204]
