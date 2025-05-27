# React Hooks: `useState`, `useRef`, và `useLayoutEffect`

React Hooks là một tính năng mạnh mẽ được giới thiệu từ React 16.8, cho phép bạn sử dụng state và các tính năng khác của React trong functional components mà không cần viết class. Bài viết này sẽ đi sâu vào ba Hook cơ bản và quan trọng: `useState`, `useRef`, và `useLayoutEffect`.

---

## 1. `useState`

`useState` là một React Hook cho phép bạn thêm biến trạng thái (state) vào Function Component. Khi state thay đổi, component sẽ re-render (vẽ lại giao diện) để cập nhật giá trị mới.

### 1.1 Nguyên lý hoạt động

Khi bạn gọi `useState(giá_trị_khởi_tạo)`, React sẽ tạo ra một biến để lưu trữ giá trị state cho mỗi lần render của component. React duy trì một "danh sách state riêng biệt" cho mỗi component, đảm bảo đúng state được sử dụng ở đúng component.

### 1.2 Cách khai báo

Bạn khai báo `useState` bằng cú pháp array destructuring:

```jsx
const [state, setState] = useState(initialValue);
