# 2025_CSE391_NentangWeb
1. Form nhỏ với một input text, demo update state realtime
Mục đích:
•	Giúp người dùng nhập liệu vào form.
•	Nội dung nhập vào được cập nhật tức thời (realtime) ở phần hiển thị phía dưới (giống như “state” luôn đồng bộ với UI).
Cách thực hiện trong code:
HTML:
<form class="order-form" autocomplete="off" onsubmit="return false;">
  <label class="input-label" for="input">Nhập sản phẩm hoặc tên của bạn:</label>
  <div class="input-wrap">
    <input
      id="input"
      type="text"
      placeholder="Ví dụ: iPhone 15 Pro, Áo thun nam, Nguyễn Văn A..."
      oninput="handleInput(event)"      <!-- Sự kiện giúp cập nhật state realtime -->
      maxlength="40"
      autocomplete="off"
    />
    <button type="button" class="btn-clear" title="Xóa" onclick="clearInput()">×</button>
  </div>
  <div class="input-hint">* Thông tin càng đầy đủ, Shop xử lý đơn càng nhanh!</div>
</form>
•	Giải thích:
o	Thẻ <input> là nơi nhập liệu.
o	oninput="handleInput(event)": mỗi khi gõ, hàm handleInput được gọi để xử lý việc cập nhật giao diện ngay lập tức (realtime).
JS:
const valueBox = document.getElementById("currentValue");

function handleInput(event) {
  valueBox.textContent = event.target.value; // Cập nhật ngay giá trị vừa nhập vào vùng hiển thị
  // ... các dòng khác cho toast hoặc đếm thao tác
}
•	Giải thích:
o	event.target.value: lấy giá trị mới nhất mà người dùng vừa nhập.
o	valueBox.textContent = ...: cập nhật tức thì vào vùng hiển thị “Thông tin bạn vừa nhập”.
HTML hiển thị:
<div class="result-group">
  <div class="result-label">Thông tin bạn vừa nhập:</div>
  <div class="result-value" id="currentValue"></div> <!-- sẽ được cập nhật realtime -->
  <div class="result-desc">Bạn có thể kiểm tra lại trước khi gửi.</div>
</div>
________________________________________
2. Tạo một component focus input tự động bằng useRef
Mục đích:
•	Khi trang web vừa mở, con trỏ (focus) tự động nhảy vào ô nhập liệu.
•	Người dùng không cần phải nhấp chuột vào ô input, chỉ cần mở trang là gõ được luôn.
•	Trong React, việc này dùng useRef kết hợp với useEffect. Ở đây dùng JS thuần.
Cách thực hiện trong code:
JS:
const inputRef = document.getElementById("input"); // Tạo "tham chiếu" tới input (giống useRef)

window.onload = function() {
  inputRef.focus(); // Khi trang tải xong, input được focus tự động
};
•	Giải thích:
o	inputRef là biến đại diện cho ô input (giống ref).
o	window.onload = function() { ... }: Khi trang tải xong, hàm trong onload chạy.
o	inputRef.focus(): Đưa trỏ chuột vào ô input, sẵn sàng cho người dùng gõ.

