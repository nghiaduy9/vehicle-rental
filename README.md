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
vehicle-rental$ composer network install --card PeerAdmin@hlfv1 --archiveFile vehicle-rental@0.0.1.bna
vehicle-rental$ composer card import --file networkadmin.card
vehicle-rental$ composer network ping --card admin@vehicle-rental # kiểm tra business network đã được deploy thành công hay chưa
```

6. Chạy REST server:

```bash
vehicle-rental$ npm start
```

7. Chạy Vue app:

```bash
vehicle-rental/frontend$ npm serve
```
