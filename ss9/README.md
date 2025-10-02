# Ứng dụng Danh bạ (Phone Book App)

## Tổng quan

Ứng dụng danh bạ được xây dựng với React Native và Expo, cho phép người dùng quản lý danh sách liên hệ với đầy đủ chức năng CRUD (Create, Read, Update, Delete).

## Tính năng chính

### 1. Xem danh sách liên hệ

- Hiển thị tất cả liên hệ đã lưu trong danh sách
- Sử dụng FlatList để tối ưu hiệu suất với danh sách lớn
- Hiển thị trạng thái trống khi chưa có liên hệ nào

### 2. Thêm liên hệ mới

- Form nhập liệu với validation đầy đủ
- Các trường: Tên (bắt buộc), Số điện thoại (bắt buộc), Email (tùy chọn)
- Validation real-time với thông báo lỗi rõ ràng

### 3. Chỉnh sửa liên hệ

- Click vào nút "Sửa" trên mỗi liên hệ
- Form sẽ tự động điền thông tin hiện tại
- Cập nhật thông tin và lưu vào AsyncStorage

### 4. Xóa liên hệ

- Nút "Xóa" trên mỗi liên hệ
- Alert xác nhận trước khi xóa
- Xóa khỏi danh sách và AsyncStorage

### 5. Lưu trữ dữ liệu bền bỉ

- Sử dụng AsyncStorage để lưu trữ dữ liệu trên thiết bị
- Tự động load dữ liệu khi khởi động ứng dụng
- Tự động lưu mỗi khi có thay đổi

## Cấu trúc dữ liệu

### Contact Interface

```typescript
interface Contact {
  id: string; // ID duy nhất
  name: string; // Tên liên hệ (bắt buộc)
  phone: string; // Số điện thoại (bắt buộc)
  email?: string; // Email (tùy chọn)
}
```

## Kiến trúc ứng dụng

### 1. Context API (PhoneBookContext)

- **Quản lý state toàn cục**: Danh sách liên hệ, trạng thái form, liên hệ đang chỉnh sửa
- **AsyncStorage integration**: Tự động load/save dữ liệu
- **CRUD operations**: addContact, updateContact, deleteContact
- **Form management**: showForm, setShowForm, editingContact, setEditingContact

### 2. Components

#### Header Component

- Hiển thị tiêu đề "Danh bạ"
- Hiển thị số lượng liên hệ hiện tại
- Nút "Thêm" để mở form tạo mới

#### ListPhoneBook Component

- Sử dụng FlatList để render danh sách
- Empty state khi chưa có liên hệ
- Truyền dữ liệu xuống PhoneBookItem

#### PhoneBookItem Component

- Hiển thị thông tin liên hệ (tên, số điện thoại, email)
- Nút "Sửa" để chỉnh sửa
- Nút "Xóa" với Alert xác nhận
- Giao diện đẹp với shadow và border radius

#### Form Component

- Modal overlay với form nhập liệu
- Validation real-time cho tất cả trường
- Hỗ trợ cả thêm mới và chỉnh sửa
- Nút "Xóa" chỉ hiển thị khi đang chỉnh sửa
- Keyboard types phù hợp cho từng trường

## Validation Rules

### Tên (Name)

- **Required**: Không được để trống
- **Trim**: Loại bỏ khoảng trắng thừa

### Số điện thoại (Phone)

- **Required**: Không được để trống
- **Format**: Chỉ cho phép số, dấu +, -, khoảng trắng, dấu ngoặc
- **Regex**: `/^[0-9+\-\s()]+$/`

### Email (Email)

- **Optional**: Có thể để trống
- **Format**: Phải đúng định dạng email nếu có nhập
- **Regex**: `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`

## AsyncStorage Integration

### Storage Key

```typescript
const STORAGE_KEY = "phonebook_contacts";
```

### Operations

- **Load**: `loadContacts()` - Đọc dữ liệu khi app khởi động
- **Save**: `saveContacts()` - Tự động lưu mỗi khi contacts thay đổi
- **Format**: JSON string của mảng contacts

## State Management

### Context State

```typescript
interface PhoneBookContextType {
  contacts: Contact[]; // Danh sách liên hệ
  addContact: (contact) => void; // Thêm liên hệ
  updateContact: (id, contact) => void; // Cập nhật liên hệ
  deleteContact: (id) => void; // Xóa liên hệ
  showForm: boolean; // Hiển thị form
  setShowForm: (show) => void; // Toggle form
  editingContact: Contact | null; // Liên hệ đang chỉnh sửa
  setEditingContact: (contact) => void; // Set liên hệ chỉnh sửa
}
```

### Form State

```typescript
const [formData, setFormData] = useState({
  name: "",
  phone: "",
  email: "",
});

const [errors, setErrors] = useState({
  name: "",
  phone: "",
  email: "",
});
```

## UI/UX Features

### Design System

- **Colors**: Primary (#007AFF), Danger (#ff4444), Text (#333, #666, #999)
- **Spacing**: Consistent padding và margin
- **Shadows**: Subtle shadows cho depth
- **Border Radius**: 8px cho buttons, 12px cho cards

### Responsive Design

- Form responsive với maxWidth
- FlatList tối ưu cho performance
- SafeAreaView cho notch devices

### User Experience

- **Loading states**: Smooth transitions
- **Error handling**: Clear error messages
- **Confirmation dialogs**: Alert cho delete actions
- **Keyboard handling**: Appropriate keyboard types
- **Empty states**: Helpful messages khi chưa có data

## Cách sử dụng

### 1. Thêm liên hệ mới

1. Nhấn nút "+ Thêm" ở header
2. Điền thông tin vào form
3. Nhấn "Thêm" để lưu

### 2. Chỉnh sửa liên hệ

1. Nhấn nút "Sửa" trên liên hệ muốn chỉnh sửa
2. Chỉnh sửa thông tin trong form
3. Nhấn "Cập nhật" để lưu

### 3. Xóa liên hệ

1. Nhấn nút "Xóa" trên liên hệ muốn xóa
2. Xác nhận trong Alert dialog
3. Liên hệ sẽ bị xóa khỏi danh sách

## Technical Stack

- **React Native**: 0.81.4
- **Expo**: ~54.0.12
- **TypeScript**: ~5.9.2
- **AsyncStorage**: @react-native-async-storage/async-storage
- **Context API**: State management
- **FlatList**: Performance optimization

## File Structure

```
ss9/
├── app/
│   └── index.tsx              # Main app component
├── components/
│   ├── Form.tsx               # Form component
│   ├── Header.tsx             # Header component
│   ├── ListPhoneBook.tsx      # List component
│   └── PhoneBookItem.tsx      # Item component
├── src/
│   └── PhoneBookContext.tsx   # Context & State management
└── package.json
```

## Performance Optimizations

1. **FlatList**: Efficient rendering cho large lists
2. **Context optimization**: Chỉ re-render khi cần thiết
3. **AsyncStorage**: Batch operations để tránh blocking
4. **Memory management**: Proper cleanup của event listeners

## Error Handling

1. **AsyncStorage errors**: Try-catch với console.error
2. **Validation errors**: Real-time feedback
3. **User confirmation**: Alert dialogs cho destructive actions
4. **Graceful degradation**: App vẫn hoạt động nếu storage fail

Ứng dụng đã được thiết kế với architecture rõ ràng, UX tốt và performance tối ưu, đáp ứng đầy đủ các yêu cầu kỹ thuật đã đề ra.
