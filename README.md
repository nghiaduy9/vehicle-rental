# vehicle-rental

Vehicle rental

## INSTALLATION

### Instructions

1. Cài đặt [NVM](https://github.com/creationix/nvm)
2. Cài đặt và chạy Docker service
3. Dùng NVM để cài đặt và kích hoạt Node.js 8.x.x
4. Để cài đặt CLI tools và Hyperledger Fabric, làm theo hướng dẫn tại [đây](https://hyperledger.github.io/composer/latest/installing/development-tools). _Lưu ý không sử dụng `sudo`, như trong hướng dẫn_.
5. Deploying the business network:

```bash
vehicle-rental$ composer network install -c PeerAdmin@hlfv1 -a vehicle-rental.bna
vehicle-rental$ composer network start -n vehicle-rental -V 0.0.8 -A admin -S adminpw -c PeerAdmin@hlfv1 -f networkadmin.card
vehicle-rental$ composer card import -f networkadmin.card
vehicle-rental$ composer network ping -c admin@vehicle-rental # kiểm tra business network đã được deploy thành công hay chưa
```

6. Chạy REST server:

```bash
vehicle-rental$ npm start
```

7. Chạy Vue app:

```bash
vehicle-rental/frontend$ npm run serve
```
