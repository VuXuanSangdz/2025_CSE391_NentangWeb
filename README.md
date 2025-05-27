
# 📘 React Hooks: useState, useRef, useLayoutEffect

## 1. `useState`

### 1.1 Giới thiệu
`useState` là một React Hook (từ React 16.8) cho phép bạn sử dụng state trong Function Component.

- Trước đây, chỉ có Class Component mới có state.
- Khi state thay đổi, component sẽ **re-render** để cập nhật giao diện.

### 1.2 Nguyên lý hoạt động

- Mỗi lần gọi `useState(initialValue)`, React tạo vùng lưu trữ riêng cho state trong từng lần render.
- React giữ danh sách state riêng biệt cho từng component.

### 1.3 Cú pháp

```jsx
const [state, setState] = useState(initialValue);
```

- `state`: Biến chứa giá trị hiện tại.
- `setState`: Hàm cập nhật giá trị `state` (gây re-render).
- `initialValue`: Giá trị khởi tạo.

#### 📌 Ví dụ

```jsx
const [name, setName] = useState('ChatGPT');
```

### 1.4 Cập nhật state

#### a. Trực tiếp

```js
setState(newValue);
```

#### b. Dựa trên giá trị trước đó

```js
setState(prevState => newValueBasedOnPrevState);
```

Ví dụ:

```js
setCount(prevCount => prevCount + 1);
```

> ✅ Tránh lỗi khi cập nhật liên tục hoặc trong nhiều sự kiện.

### 1.5 Tính chất và lưu ý

- `setState` **bất đồng bộ** – không cập nhật ngay lập tức.
- State **cục bộ** trong component – không ảnh hưởng đến component khác.
- Có thể khai báo **nhiều biến state**:

```js
const [name, setName] = useState('');
const [age, setAge] = useState(0);
```

- Khi làm việc với **object hoặc array**, cần tạo bản sao mới:

```js
setUser(prev => ({ ...prev, name: 'New Name' }));
```

### 1.6 Quy tắc sử dụng

- Chỉ gọi `useState` ở **đầu** function component.
- Không gọi trong vòng lặp, điều kiện hoặc hàm con.
- Thứ tự gọi hook phải **ổn định** giữa các lần render.

---

## 2. `useRef`

### 2.1 Khái niệm

`useRef` dùng để:

- Lưu trữ giá trị giữa các lần render mà không gây re-render.
- Truy cập trực tiếp DOM element.

### 2.2 Cú pháp

```js
const myRef = useRef(initialValue);
```

- `myRef.current` chứa giá trị lưu trữ.

### 2.3 Tính chất

- Thay đổi `.current` **không gây re-render**.
- Phù hợp để:
  - Đếm render
  - Lưu giá trị trước đó
  - Truy cập DOM

### 2.4 Ứng dụng

#### ✅ Focus input

```jsx
const inputRef = useRef(null);
<input ref={inputRef} />;
inputRef.current.focus();
```

#### ✅ Đếm số lần render

```jsx
const renderCount = useRef(1);
useEffect(() => {
  renderCount.current += 1;
});
```

#### ✅ Lưu giá trị trước đó

```js
const prevValue = useRef(value);
useEffect(() => {
  prevValue.current = value;
}, [value]);
```

#### ✅ Lưu timer ID

```js
const timer = useRef(null);
timer.current = setTimeout(...);
```

---

## 3. `useLayoutEffect`

### 3.1 Giới thiệu

`useLayoutEffect` giống `useEffect` nhưng chạy **đồng bộ ngay sau khi DOM cập nhật** và **trước khi browser vẽ lại giao diện**.

> ⚠️ Tránh "giật hình" (layout shift) khi thao tác với DOM.

### 3.2 Cú pháp

```js
useLayoutEffect(() => {
  // Logic
  return () => {
    // Cleanup (nếu cần)
  };
}, [deps]);
```

### 3.3 Ứng dụng thực tiễn

#### ✅ Đo kích thước phần tử

```jsx
const divRef = useRef(null);
const [width, setWidth] = useState(0);

useLayoutEffect(() => {
  if (divRef.current) {
    setWidth(divRef.current.offsetWidth);
  }
}, []);
```

#### ✅ Scroll đến phần tử

```jsx
divRef.current.scrollIntoView({ behavior: 'smooth' });
```

#### ✅ Cập nhật style dựa trên DOM

```js
const height = divRef.current.offsetHeight;
element.style.height = `${height}px`;
```

---

## 4. Nguyên tắc cập nhật state bất đồng bộ

### 4.1 React không cập nhật state ngay lập tức

```js
const handleClick = () => {
  setCount(count + 1);
  console.log(count); // vẫn là giá trị cũ
};
```

### 4.2 React dùng "hàng đợi" (queue)

- Gom nhiều cập nhật lại rồi render 1 lần → tối ưu hiệu suất.
- Để tránh lỗi, dùng callback dựa trên giá trị trước:

```js
setCount(prev => prev + 1);
setCount(prev => prev + 1); // tăng 2 đơn vị
```

---

## 5. Tổng kết

| Hook              | Chức năng chính                                                       | Gây re-render |
|-------------------|------------------------------------------------------------------------|---------------|
| `useState`        | Quản lý state trong component                                          | ✅            |
| `useRef`          | Lưu giá trị hoặc truy cập DOM, không gây re-render                     | ❌            |
| `useLayoutEffect` | Chạy sau DOM cập nhật, dùng cho đo đạc, scroll, chỉnh layout          | ✅            |

---

## 📎 Tài liệu tham khảo

- [React Docs – Hooks](https://reactjs.org/docs/hooks-intro.html)
- [useState](https://reactjs.org/docs/hooks-state.html)
- [useRef](https://reactjs.org/docs/hooks-reference.html#useref)
- [useLayoutEffect](https://reactjs.org/docs/hooks-reference.html#uselayouteffect)
