# Hướng dẫn Push Code lên GitHub Cá Nhân

## Các bước thực hiện

### 1. Xóa liên kết với GitHub cũ
```bash
# Di chuyển vào thư mục Coffee-Shop-Admin
cd Coffee-Shop-Admin
# Xóa remote origin cũ
rm -rf .git

# Di chuyển vào thư mục Coffee-Shop-Department
cd ../Coffee-Shop-Department
# Xóa remote origin cũ
rm -rf .git
```

### 2. Khởi tạo Git cho toàn bộ project
```bash
# Di chuyển về thư mục gốc
cd ..
# Khởi tạo Git
git init
```

### 3. Thêm các file vào Git
```bash
# Thêm tất cả các file
git add .

# Commit các thay đổi
git commit -m "Initial commit"
```

### 4. Liên kết với GitHub cá nhân
```bash
# Thêm remote mới (thay YOUR_GITHUB_REPO_URL bằng URL của repository của bạn)
git remote add origin YOUR_GITHUB_REPO_URL

# Push code lên GitHub
git push -u origin main
```

## Lưu ý
- Trước khi thực hiện các bước trên, hãy đảm bảo bạn đã tạo một repository mới trên GitHub cá nhân
- Thay `YOUR_GITHUB_REPO_URL` bằng URL của repository GitHub của bạn
- Nếu branch mặc định là "master" thay vì "main", hãy điều chỉnh lệnh push tương ứng